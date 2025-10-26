# Admin Dashboard Documentation

## Overview
The Admin Dashboard is a comprehensive management system for the Architectural Drawings website, providing full control over plans, analytics, and system settings.

## Features

### 🏠 Dashboard Tab
- **Statistics Cards**: Display total plans, plans by type (2D, 3D, Elevation, Structural)
- **Recent Plans**: Quick overview of the latest 5 plans with edit/delete actions
- **Real-time Data**: Automatically refreshes when data changes

### 📋 Plans Management Tab
- **Add/Edit Plans**: Complete form with all plan details
  - Type selection (2D Plans, 3D Plans, Elevation, Structural Designs)
  - Title, Price, Description, Area, Features
  - Image upload support
- **Advanced Search & Filter**: Search by title/description, filter by type
- **Bulk Operations**: Select multiple plans for bulk deletion
- **Image Preview**: Thumbnail display in the plans table
- **Responsive Table**: Clean, minimal design with hover effects

### 📈 Analytics Tab
- **Plans by Type**: Visual breakdown of plan distribution
- **Quick Actions**: 
  - Refresh data
  - Add new plan
  - Export to CSV
- **System Information**: Database status and statistics

### ⚙️ Settings Tab
- **System Settings**: 
  - Site title configuration
  - Contact email and phone
  - Real-time updates
- **Database Management**:
  - Export complete database to CSV
  - Refresh data from server
  - Backup functionality

## Technical Features

### Backend Enhancements
- **Enhanced Database Schema**: Added area, features, timestamps
- **Bulk Operations**: Efficient bulk delete endpoint
- **Settings Management**: Dynamic configuration system
- **Analytics API**: Comprehensive statistics and reporting
- **File Management**: Secure image upload and storage

### Frontend Features
- **Modern UI**: Minimalist design following the site's aesthetic
- **Tab Navigation**: Clean tab-based interface
- **Loading States**: User feedback during operations
- **Error Handling**: Graceful error management
- **Responsive Design**: Works on all device sizes

## API Endpoints

### Plans Management
- `GET /api/plans` - Retrieve all plans with pagination
- `POST /api/plans` - Add new plan
- `PUT /api/plans/<id>` - Update existing plan
- `DELETE /api/plans/<id>` - Delete single plan
- `POST /api/plans/bulk-delete` - Delete multiple plans

### Analytics
- `GET /api/analytics` - Get plan statistics by type
- `GET /api/dashboard-stats` - Comprehensive dashboard metrics

### Settings
- `GET /api/settings` - Retrieve system settings
- `PUT /api/settings` - Update system settings

## Authentication
- JWT-based authentication
- Secure admin-only access
- Automatic token validation
- Logout functionality

## Usage

### Accessing the Dashboard
1. Navigate to `/admin` in your browser
2. Login with admin credentials (admin/admin123)
3. Access all dashboard features

### Managing Plans
1. Go to the "Plans" tab
2. Use the form to add new plans or edit existing ones
3. Use search and filters to find specific plans
4. Select multiple plans for bulk operations

### Viewing Analytics
1. Navigate to the "Analytics" tab
2. View plan distribution and statistics
3. Use quick actions for common tasks
4. Export data for external analysis

### Configuring Settings
1. Go to the "Settings" tab
2. Update site information
3. Save changes to apply globally
4. Use database management tools for maintenance

## Security Features
- JWT token authentication
- Admin-only access control
- Secure file upload handling
- Input validation and sanitization
- CSRF protection

## Performance Optimizations
- Efficient database queries
- Pagination for large datasets
- Bulk operations for better performance
- Optimized image handling
- Minimal API calls with parallel requests

## Future Enhancements
- User role management
- Advanced reporting
- Email notifications
- Audit logging
- Multi-language support
- Advanced file management
