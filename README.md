# Architectural Drawings Website

A full-stack web application for showcasing 2D, 3D, and VR architectural plans with an admin panel for management.

## Features

- **Frontend**: React.js with TailwindCSS
- **Backend**: Flask with JWT authentication
- **Database**: SQLite
- **Image Storage**: Local uploads
- **Admin Panel**: Secure login with CRUD operations
- **User Features**: Browse plans by type, search, modal views

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd architectural-website/backend
   ```

2. Create and activate virtual environment:
   ```
   python -m venv venv
   .\venv\Scripts\Activate.ps1  # On Windows
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```
   python app.py
   ```
   Server will start on `http://127.0.0.1:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd architectural-website/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## Usage

- **Home Page**: Overview with hero, services, and trending plans
- **Plan Pages**: /plans/2d, /plans/3d, /plans/vr - Browse plans by type with search
 - **Explore Page**: /explore - Quick links to categories and filters
 - **VR Experience**: /vr-experience - Preview VR/360 plans
- **Admin Login**: /login - Username: admin, Password: admin123
- **Admin Dashboard**: /admin - Add, edit, delete plans
- **Contact**: /contact - Contact form

## API Endpoints

- `GET /api/plans` - Get all plans
 - `GET /api/plans` - Get all plans (supports pagination: `?page=1&per_page=12`, filtering: `?type=2D&min_price=1000&max_price=5000&search=bedroom`)
- `GET /api/plans?type=2D` - Get plans by type
- `POST /api/plans` - Add plan (admin only)
- `PUT /api/plans/<id>` - Update plan (admin only)
- `DELETE /api/plans/<id>` - Delete plan (admin only)
- `POST /api/login` - Admin login

Additional endpoints:
- `GET /api/plans/recent` - Get recent uploads
- `GET /api/analytics` - Get counts by plan type (2D/3D/VR)

## Tech Stack

- **Frontend**: React, TailwindCSS, Axios, React Router
- **Backend**: Flask, Flask-JWT-Extended, Flask-CORS
- **Database**: SQLite
- **Authentication**: JWT tokens