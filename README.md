# 🌻 Sunflower Preschool Management System

A modern full-stack application for managing preschool schedules and activities, built with Spring Boot and React.

## 🎯 Project Overview

This project is designed for **SBA301 Assignment 1** - demonstrating CRUD operations with authentication in a preschool management context.

### 🏗️ Architecture
- **Backend**: Spring Boot with REST APIs
- **Frontend**: React with Material-UI
- **Database**: H2 (in-memory for demo)
- **Authentication**: Basic HTTP Authentication

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16+ (for frontend development)
- Git

### 🔧 Backend Setup (Spring Boot)

1. **Navigate to backend directory:**
   ```bash
   cd pes/server/pes_be
   ```

2. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

3. **Backend will be available at:** `http://localhost:8080`

### 🎨 Frontend Setup (React + MUI)

1. **Navigate to frontend directory:**
   ```bash
   cd pes/client/ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Frontend will be available at:** `http://localhost:5173`

## 👥 Demo Accounts

The system comes with pre-configured accounts for testing:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Director** | director@sunflowerpreschool.com | director123 | Full administrative access |
| **Head Teacher** | ms.emily@sunflowerpreschool.com | teacher123 | Schedule and activity management |
| **Teacher** | mr.david@sunflowerpreschool.com | teacher123 | Limited management access |
| **Parent** | parent@example.com | parent123 | View-only access |

## 📋 Features

### 🔐 Authentication System
- ✅ Basic HTTP Authentication
- ✅ Role-based access control
- ✅ Session management
- ✅ Quick login presets for demo

### 📅 Schedule Management (CRUD)
- ✅ **Create** schedules with date, time, class, and lesson
- ✅ **Read** all schedules with filtering and status
- ✅ **Update** existing schedules
- ✅ **Delete** schedules with confirmation

### 🎨 Activity Management (CRUD)
- ✅ **Create** activities with types, dates, and descriptions
- ✅ **Read** activities with status tracking
- ✅ **Update** activity details
- ✅ **Delete** activities
- ✅ **Assign** activities to classes

### 🏫 Supporting Data
- ✅ **Classes**: Sunflower Seeds (3yo), Buds (4yo), Blooms (5yo)
- ✅ **Lessons**: Age-appropriate topics (Numbers, Letters, Arts, etc.)
- ✅ **User Accounts**: Realistic preschool staff and parent accounts

## 🎨 UI Features

### 🌈 Modern Design
- **Preschool-themed colors**: Warm sunflower yellows and oranges
- **Responsive design**: Works on desktop, tablet, and mobile
- **Material-UI components**: Professional and accessible interface
- **Child-friendly aesthetics**: Rounded corners, emojis, and warm colors

### 📱 User Experience
- **Dashboard**: Statistics, recent items, and quick actions
- **Navigation**: Drawer-based sidebar with role-based menu items
- **Forms**: Date/time pickers, dropdowns, and validation
- **Feedback**: Success/error notifications and loading states

### 🔄 Interactive Elements
- **Data tables**: Sortable, searchable, with actions
- **Dialogs**: Modal forms for create/edit operations
- **Cards**: Hover effects and click interactions
- **FAB**: Floating action button for mobile

## 🛠️ API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login

### Schedules
- `GET /api/v1/schedules` - Get all schedules
- `POST /api/v1/schedules` - Create schedule
- `PUT /api/v1/schedules/{id}` - Update schedule
- `DELETE /api/v1/schedules/{id}` - Delete schedule

### Activities
- `GET /api/v1/activities` - Get all activities
- `POST /api/v1/activities` - Create activity
- `PUT /api/v1/activities/{id}` - Update activity
- `DELETE /api/v1/activities/{id}` - Delete activity
- `POST /api/v1/activities/assign-to-class` - Assign activity to class

### Supporting Data
- `GET /api/v1/classes` - Get all classes
- `GET /api/v1/lessons` - Get all lessons

## 📁 Project Structure

```
pes/
├── server/pes_be/                 # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/sba301/group1/pes_be/
│   │       ├── controllers/       # REST Controllers
│   │       ├── services/          # Business Logic
│   │       ├── models/            # JPA Entities
│   │       ├── repositories/      # Data Access
│   │       ├── requests/          # DTOs
│   │       ├── config/            # Configuration & Data Initializer
│   │       └── enums/             # Enumerations
│   └── src/main/resources/
│       └── application.properties # Spring Boot Configuration
│
├── client/ui/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/              # Authentication Components
│   │   │   └── dashboard/         # Dashboard Components
│   │   ├── contexts/              # React Contexts
│   │   ├── App.jsx                # Main App Component
│   │   └── main.jsx               # Entry Point
│   ├── package.json               # Dependencies
│   └── vite.config.js             # Vite Configuration
│
└── README.md                      # This file
```

## 🔧 Development Notes

### Backend Configuration
- **Port**: 8080
- **Database**: H2 in-memory (data resets on restart)
- **CORS**: Enabled for frontend at localhost:5173
- **Security**: Basic HTTP Authentication

### Frontend Configuration
- **Port**: 5173 (Vite default)
- **Proxy**: API calls proxied to localhost:8080
- **Theme**: Custom Material-UI theme with preschool colors

### Data Initialization
- **Automatic**: Sample data loads on application startup
- **Reset**: Restart backend to reset to initial state
- **Accounts**: Pre-configured with encrypted passwords

## 🎓 Assignment Compliance

### ✅ Required Features Implemented:
1. **Authentication System** - Basic HTTP authentication with role management
2. **CRUD Operations** - Complete Create, Read, Update, Delete for:
   - Schedules (with date, time, class, lesson relationships)
   - Activities (with types, dates, status, class assignments)
3. **Modern UI** - React with Material-UI providing professional interface
4. **API Integration** - REST APIs connecting frontend to backend
5. **Data Relationships** - Proper entity relationships between Classes, Lessons, Schedules, Activities

### 🎯 Bonus Features:
- Responsive mobile design
- Role-based access control
- Real-time form validation
- Statistics dashboard
- Professional preschool theming
- Demo data for immediate testing

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd pes/client/ui
npm run build

# Backend
cd pes/server/pes_be
./mvnw clean package
java -jar target/pes_be-0.0.1-SNAPSHOT.jar
```

### Environment Variables
```properties
# Backend (application.properties)
server.port=8080
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true

# Frontend (for production)
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## 🐛 Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure backend is running on port 8080
2. **Login Issues**: Use the provided demo accounts
3. **Data Missing**: Restart backend to reload sample data
4. **Port Conflicts**: Change ports in respective config files

### Getting Help:
- Check browser console for frontend errors
- Check backend logs for API errors
- Verify both servers are running on correct ports

---

**Made with ❤️ for SBA301 Assignment 1 - Demonstrating modern full-stack development with Spring Boot and React**