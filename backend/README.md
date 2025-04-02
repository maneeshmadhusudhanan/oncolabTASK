# ONCOLAB Backend

This is the backend API for the ONCOLAB medical diagnostics system built with Node.js, Express, and MongoDB.

## Features

- User Authentication and Authorization
- Patient Management
- Medical Checkup Management
- Billing System
- RESTful API Endpoints

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/oncolab
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

3. Start MongoDB server

4. Start the backend server:
```bash
npm run dev  # For development with nodemon
npm start    # For production
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user

### Patients
- GET `/api/patients` - Get all patients
- GET `/api/patients/:id` - Get patient by ID
- POST `/api/patients` - Create new patient
- PUT `/api/patients/:id` - Update patient
- DELETE `/api/patients/:id` - Delete patient

### Checkups
- GET `/api/checkups` - Get all checkups
- GET `/api/checkups/:id` - Get checkup by ID
- POST `/api/checkups` - Create new checkup
- PUT `/api/checkups/:id` - Update checkup
- DELETE `/api/checkups/:id` - Delete checkup

### Billing
- GET `/api/billing` - Get all bills
- GET `/api/billing/:id` - Get bill by ID
- POST `/api/billing` - Create new bill
- PUT `/api/billing/:id` - Update bill
- DELETE `/api/billing/:id` - Delete bill
- GET `/api/billing/reports` - Get billing reports

## Database Schema

The application uses MongoDB with the following collections:
- Users: For authentication
- Patients: For patient information
- Checkups: For medical checkup records
- Bills: For billing records

## Security

- JWT-based authentication
- Input validation
- MongoDB injection prevention
- XSS protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
