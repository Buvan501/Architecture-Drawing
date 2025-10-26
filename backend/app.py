from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
import sqlite3
import hashlib
import secrets
import bcrypt
from werkzeug.utils import secure_filename
import uuid
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS Configuration
cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173').split(',')
CORS(app, origins=cors_origins, supports_credentials=True)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # Tokens don't expire for simplicity
jwt = JWTManager(app)

# Rate Limiting
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"]
)

# Helper functions
def hash_password(password):
    """Hash password using bcrypt with salt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Database setup
def init_db():
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS plans (
        id INTEGER PRIMARY KEY,
        type TEXT,
        title TEXT,
        image_path TEXT,
        price TEXT,
        description TEXT,
        area TEXT,
        features TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    
    # Create users table for both admin and regular users
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password_hash TEXT,
        role TEXT DEFAULT 'user',
        first_name TEXT,
        last_name TEXT,
        phone TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    
    # Create settings table
    c.execute('''CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY,
        key TEXT UNIQUE,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    
    # Insert default settings
    c.execute('''INSERT OR IGNORE INTO settings (key, value) VALUES 
        ('site_title', 'Architectural Drawings'),
        ('contact_email', 'info@archplans.com'),
        ('contact_phone', '+91 98765 43210')
    ''')
    
    # Create indexes for better performance
    c.execute('CREATE INDEX IF NOT EXISTS idx_plans_type ON plans(type)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_plans_created_at ON plans(created_at)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)')
    
    # Insert default admin user
    admin_password = hash_password('admin123')
    c.execute('''INSERT OR IGNORE INTO users (username, email, password_hash, role, first_name, last_name) 
                 VALUES ('admin', 'admin@archplans.com', ?, 'admin', 'Admin', 'User')''', 
                 (admin_password,))
    
    conn.commit()
    conn.close()

init_db()

UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
MAX_FILE_SIZE = int(os.getenv('MAX_FILE_SIZE', 16 * 1024 * 1024))  # 16MB
ALLOWED_EXTENSIONS = set(os.getenv('ALLOWED_EXTENSIONS', 'png,jpg,jpeg,gif,webp').split(','))

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def secure_filename_with_uuid(filename):
    """Generate secure filename with UUID to prevent conflicts"""
    if not filename:
        return None
    name, ext = os.path.splitext(secure_filename(filename))
    unique_name = f"{name}_{uuid.uuid4().hex[:8]}{ext}"
    return unique_name

def validate_email(email):
    """Basic email validation"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Password validation"""
    if len(password) < 6:
        return False, "Password must be at least 6 characters long"
    return True, ""

def sanitize_input(text):
    """Basic input sanitization"""
    if not text:
        return ""
    return text.strip()[:500]  # Limit length

@app.route('/api/admin/login', methods=['POST'])
@limiter.limit("5 per minute")
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE username = ? AND role = ?', (username, 'admin'))
    user = c.fetchone()
    conn.close()
    
    if user and verify_password(password, user[3]):
        access_token = create_access_token(identity={'id': user[0], 'username': user[1], 'role': user[4]})
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user[0],
                'username': user[1],
                'email': user[2],
                'role': user[4],
                'first_name': user[5],
                'last_name': user[6]
            }
        })
    return jsonify({'error': 'Invalid admin credentials'}), 401

@app.route('/api/user/login', methods=['POST'])
@limiter.limit("10 per minute")
def user_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE (username = ? OR email = ?) AND role = ?', (username, username, 'user'))
    user = c.fetchone()
    conn.close()
    
    if user and verify_password(password, user[3]):
        access_token = create_access_token(identity={'id': user[0], 'username': user[1], 'role': user[4]})
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user[0],
                'username': user[1],
                'email': user[2],
                'role': user[4],
                'first_name': user[5],
                'last_name': user[6],
                'phone': user[7]
            }
        })
    return jsonify({'error': 'Invalid user credentials'}), 401

@app.route('/api/user/register', methods=['POST'])
@limiter.limit("3 per minute")
def user_register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    phone = data.get('phone')
    
    if not all([username, email, password, first_name, last_name]):
        return jsonify({'error': 'All fields are required'}), 400
    
    # Validate email format
    if not validate_email(email):
        return jsonify({'error': 'Invalid email format'}), 400
    
    # Validate password strength
    is_valid, password_error = validate_password(password)
    if not is_valid:
        return jsonify({'error': password_error}), 400
    
    # Sanitize inputs
    username = sanitize_input(username)
    email = sanitize_input(email)
    first_name = sanitize_input(first_name)
    last_name = sanitize_input(last_name)
    phone = sanitize_input(phone) if phone else ""
    
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    
    # Check if user already exists
    c.execute('SELECT id FROM users WHERE username = ? OR email = ?', (username, email))
    if c.fetchone():
        conn.close()
        return jsonify({'error': 'Username or email already exists'}), 400
    
    # Create new user
    password_hash = hash_password(password)
    c.execute('''INSERT INTO users (username, email, password_hash, role, first_name, last_name, phone) 
                  VALUES (?, ?, ?, 'user', ?, ?, ?)''', 
                  (username, email, password_hash, first_name, last_name, phone))
    
    user_id = c.lastrowid
    conn.commit()
    conn.close()
    
    # Create token for new user
    access_token = create_access_token(identity={'id': user_id, 'username': username, 'role': 'user'})
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user_id,
            'username': username,
            'email': email,
            'role': 'user',
            'first_name': first_name,
            'last_name': last_name,
            'phone': phone
        }
    }), 201

@app.route('/api/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user = get_jwt_identity()
    if current_user['role'] != 'user':
        return jsonify({'error': 'Access denied'}), 403
    
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE id = ?', (current_user['id'],))
    user = c.fetchone()
    conn.close()
    
    if user:
        return jsonify({
            'id': user[0],
            'username': user[1],
            'email': user[2],
            'role': user[4],
            'first_name': user[5],
            'last_name': user[6],
            'phone': user[7],
            'created_at': user[8]
        })
    return jsonify({'error': 'User not found'}), 404

@app.route('/api/user/profile', methods=['PUT'])
@jwt_required()
def update_user_profile():
    current_user = get_jwt_identity()
    if current_user['role'] != 'user':
        return jsonify({'error': 'Access denied'}), 403
    
    data = request.get_json()
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    
    # Update user profile
    c.execute('''UPDATE users SET first_name = ?, last_name = ?, phone = ?, email = ? 
                  WHERE id = ?''', 
                  (data.get('first_name'), data.get('last_name'), data.get('phone'), 
                   data.get('email'), current_user['id']))
    
    conn.commit()
    conn.close()
    return jsonify({'message': 'Profile updated successfully'})

# Legacy login endpoint for backward compatibility
@app.route('/api/login', methods=['POST'])
def legacy_login():
    data = request.get_json()
    if data.get('username') == 'admin' and data.get('password') == 'admin123':
        access_token = create_access_token(identity={'id': 1, 'username': 'admin', 'role': 'admin'})
        return jsonify(access_token=access_token)
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/api/plans', methods=['GET'])
def get_plans():
    # Added pagination and filtering support
    type_filter = request.args.get('type')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 12))
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    search = request.args.get('search')

    conn = sqlite3.connect('plans.db')
    c = conn.cursor()

    base_query = "SELECT * FROM plans"
    filters = []
    params = []

    if type_filter:
        filters.append("type = ?")
        params.append(type_filter)
    if min_price:
        filters.append("price >= ?")
        params.append(min_price)
    if max_price:
        filters.append("price <= ?")
        params.append(max_price)
    if search:
        filters.append("(title LIKE ? OR description LIKE ?)")
        params.append(f"%{search}%")
        params.append(f"%{search}%")

    if filters:
        base_query += " WHERE " + " AND ".join(filters)

    # Count total
    count_query = base_query.replace("SELECT *", "SELECT COUNT(*)")
    c.execute(count_query, tuple(params))
    total = c.fetchone()[0]

    # Pagination
    offset = (page - 1) * per_page
    base_query += " ORDER BY id DESC LIMIT ? OFFSET ?"
    params.extend([per_page, offset])

    c.execute(base_query, tuple(params))
    plans = c.fetchall()
    conn.close()

    data = [{'id': p[0], 'type': p[1], 'title': p[2], 'image_path': p[3], 'price': p[4], 'description': p[5], 'area': p[6], 'features': p[7], 'created_at': p[8], 'updated_at': p[9]} for p in plans]
    return jsonify({'data': data, 'total': total, 'page': page, 'per_page': per_page})

@app.route('/api/plans', methods=['POST'])
@jwt_required()
def add_plan():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
    data = request.form
    file = request.files.get('image')
    image_path = ''
    
    if file and file.filename:
        # Validate file
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PNG, JPG, JPEG, GIF, and WebP are allowed.'}), 400
        
        # Check file size
        file.seek(0, 2)  # Seek to end
        file_size = file.tell()
        file.seek(0)  # Reset to beginning
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({'error': 'File too large. Maximum size is 16MB.'}), 400
        
        # Generate secure filename
        filename = secure_filename_with_uuid(file.filename)
        if filename:
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)
            image_path = f'/uploads/{filename}'  # Use relative URL
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    c.execute("INSERT INTO plans (type, title, image_path, price, description, area, features) VALUES (?, ?, ?, ?, ?, ?, ?)",
              (data['type'], data['title'], image_path, data['price'], data['description'], 
               data.get('area', ''), data.get('features', '')))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Plan added'})


@app.route('/api/plans/recent', methods=['GET'])
def recent_plans():
    # return latest N plans
    limit = int(request.args.get('limit', 6))
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    c.execute("SELECT * FROM plans ORDER BY id DESC LIMIT ?", (limit,))
    plans = c.fetchall()
    conn.close()
    data = [{'id': p[0], 'type': p[1], 'title': p[2], 'image_path': p[3], 'price': p[4], 'description': p[5], 'area': p[6], 'features': p[7], 'created_at': p[8], 'updated_at': p[9]} for p in plans]
    return jsonify(data)


@app.route('/api/analytics', methods=['GET'])
def analytics():
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    
    # Get counts by type
    c.execute("SELECT type, COUNT(*) FROM plans GROUP BY type")
    type_counts = dict(c.fetchall())
    
    # Get total plans
    c.execute("SELECT COUNT(*) FROM plans")
    total_plans = c.fetchone()[0]
    
    # Get recent activity (plans added in last 30 days)
    c.execute("SELECT COUNT(*) FROM plans WHERE created_at >= datetime('now', '-30 days')")
    recent_plans = c.fetchone()[0]
    
    conn.close()
    
    return jsonify({
        'total_plans': total_plans,
        'recent_plans': recent_plans,
        'by_type': type_counts
    })

@app.route('/api/plans/<int:id>', methods=['PUT'])
@jwt_required()
def update_plan(id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
    data = request.form
    file = request.files.get('image')
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    
    if file and file.filename:
        # Validate file
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PNG, JPG, JPEG, GIF, and WebP are allowed.'}), 400
        
        # Check file size
        file.seek(0, 2)  # Seek to end
        file_size = file.tell()
        file.seek(0)  # Reset to beginning
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({'error': 'File too large. Maximum size is 16MB.'}), 400
        
        # Generate secure filename
        filename = secure_filename_with_uuid(file.filename)
        if filename:
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)
            image_path = f'/uploads/{filename}'  # Use relative URL
            c.execute("UPDATE plans SET type=?, title=?, image_path=?, price=?, description=?, area=?, features=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
                      (data['type'], data['title'], image_path, data['price'], data['description'], 
                       data.get('area', ''), data.get('features', ''), id))
        else:
            return jsonify({'error': 'Invalid filename'}), 400
    else:
        c.execute("UPDATE plans SET type=?, title=?, price=?, description=?, area=?, features=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
                  (data['type'], data['title'], data['price'], data['description'], 
                   data.get('area', ''), data.get('features', ''), id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Plan updated'})

@app.route('/api/plans/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_plan(id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    c.execute("DELETE FROM plans WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Plan deleted'})

@app.route('/api/plans/bulk-delete', methods=['POST'])
@jwt_required()
def bulk_delete_plans():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
    data = request.get_json()
    plan_ids = data.get('ids', [])
    
    if not plan_ids:
        return jsonify({'error': 'No plans selected'}), 400
    
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    
    placeholders = ','.join(['?' for _ in plan_ids])
    c.execute(f"DELETE FROM plans WHERE id IN ({placeholders})", plan_ids)
    
    deleted_count = c.rowcount
    conn.commit()
    conn.close()
    
    return jsonify({'message': f'{deleted_count} plans deleted'})

@app.route('/api/settings', methods=['GET'])
@jwt_required()
def get_settings():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    c.execute("SELECT key, value FROM settings")
    settings = dict(c.fetchall())
    conn.close()
    return jsonify(settings)

@app.route('/api/settings', methods=['PUT'])
@jwt_required()
def update_settings():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
    data = request.get_json()
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    
    for key, value in data.items():
        c.execute("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)",
                  (key, value))
    
    conn.commit()
    conn.close()
    return jsonify({'message': 'Settings updated'})

@app.route('/api/dashboard-stats', methods=['GET'])
@jwt_required()
def dashboard_stats():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
    conn = sqlite3.connect('plans.db')
    c = conn.cursor()
    
    # Total plans
    c.execute("SELECT COUNT(*) FROM plans")
    total_plans = c.fetchone()[0]
    
    # Plans by type
    c.execute("SELECT type, COUNT(*) FROM plans GROUP BY type")
    plans_by_type = dict(c.fetchall())
    
    # Recent plans (last 7 days)
    c.execute("SELECT COUNT(*) FROM plans WHERE created_at >= datetime('now', '-7 days')")
    recent_plans = c.fetchone()[0]
    
    # Most popular plan type
    c.execute("SELECT type, COUNT(*) as count FROM plans GROUP BY type ORDER BY count DESC LIMIT 1")
    popular_type = c.fetchone()
    
    conn.close()
    
    return jsonify({
        'total_plans': total_plans,
        'plans_by_type': plans_by_type,
        'recent_plans': recent_plans,
        'popular_type': popular_type[0] if popular_type else None,
        'popular_type_count': popular_type[1] if popular_type else 0
    })

if __name__ == '__main__':
    app.run(debug=True)