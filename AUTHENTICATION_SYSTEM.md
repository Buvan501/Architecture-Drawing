# User Authentication System

This architectural website now supports separate login systems for different user types.

## User Types

### 1. Admin Users
- **Access**: Full admin dashboard with plan management, analytics, and settings
- **Login URL**: `/admin-login`
- **Dashboard URL**: `/admin`
- **Default Credentials**: 
  - Username: `admin`
  - Password: `admin123`

### 2. Regular Users
- **Access**: User dashboard with profile management and plan browsing
- **Login URL**: `/user-login`
- **Dashboard URL**: `/user-dashboard`
- **Registration**: Available on the user login page

## Features

### Admin Features
- Plan management (CRUD operations)
- Analytics dashboard
- Settings management
- Bulk operations
- User management (future enhancement)

### User Features
- Profile management
- Plan browsing and downloading
- Download history tracking
- Custom plan requests

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/user/login` - User login
- `POST /api/user/register` - User registration
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Admin Protected Endpoints
All admin endpoints require admin role authentication:
- `POST /api/plans` - Add new plan
- `PUT /api/plans/:id` - Update plan
- `DELETE /api/plans/:id` - Delete plan
- `POST /api/plans/bulk-delete` - Bulk delete plans
- `GET /api/analytics` - Get analytics
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings
- `GET /api/dashboard-stats` - Get dashboard statistics

### Public Endpoints
- `GET /api/plans` - Get all plans (public access)

## Security Features

- Password hashing using SHA-256
- JWT token-based authentication
- Role-based access control
- Protected admin endpoints
- Session management with localStorage

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password_hash TEXT,
    role TEXT DEFAULT 'user',
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

### For Admins
1. Navigate to `/admin-login`
2. Enter admin credentials
3. Access full admin dashboard at `/admin`

### For Users
1. Navigate to `/user-login`
2. Either login with existing credentials or register new account
3. Access user dashboard at `/user-dashboard`

### Header Navigation
The header automatically shows appropriate links based on user authentication status:
- **Not logged in**: Shows "Login" and "Admin" links
- **Logged in as user**: Shows welcome message, "Dashboard" and "Logout" links
- **Logged in as admin**: Shows welcome message, "Admin Panel" and "Logout" links

## Future Enhancements

- Password reset functionality
- Email verification for new users
- User role management for admins
- Advanced user permissions
- Social login integration
- Two-factor authentication
