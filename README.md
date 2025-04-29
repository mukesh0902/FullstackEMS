# Employee Management System

A comprehensive MERN stack application for managing employees, departments, leaves, and salaries in an organization.

## Features

- Authentication (Login)
- Admin Dashboard
- Employee Dashboard
- Employee Management (Add, View, Edit)
- Department Management
- Leave Management
- Salary Management
- Settings

## Tech Stack

### Frontend
- React with Vite
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Axios for API requests
- React Icons
- React Data Table Component

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens for authentication
- Bcrypt for password hashing
- Multer for file uploads

## Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context providers
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── vite.config.js     # Vite configuration
│   └── tailwind.config.js # Tailwind CSS configuration
│
└── server/                # Backend Node.js application
    ├── config/            # Configuration files
    ├── controllers/       # Request handlers
    ├── middlewares/       # Custom middlewares
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    └── index.js           # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd employee-management-system
```

2. Install server dependencies:
```
cd server
npm install
```

3. Install client dependencies:
```
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following content:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee_ms
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

### Running the application

1. Start the server:
```
cd server
npm run dev
```

2. Start the client:
```
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Default Admin Login

- Email: admin@example.com
- Password: admin123

## License

This project is licensed under the MIT License - see the LICENSE file for details. 