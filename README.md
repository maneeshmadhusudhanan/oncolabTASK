# 🏥 ONCOLAB Medical Diagnostics System



## 🌟 Core Features ✨

| 🏥 Feature | 🚀 Description |
|-----------|------------|
| 📌 Patient Management | Manage patient records seamlessly! |
| 🔬 Medical Checkup Management | Track all checkups with ease! |
| 💳 Billing System|
| 🔐 Secure Authentication | JWT-based authentication for safety! |
| 📊 Reports & Insights | Generate detailed reports instantly! |

---

## 🚀 Tech Stack & Architecture

**Frontend:** ⚛️ React.js + Tailwind CSS (Beautiful UI)

**Backend:** 🖥️ Node.js + Express.js (Robust API)

**Database:** 🗄️ MongoDB (Efficient Data Storage)

**Authentication:** 🔑 JWT (Secure & Token-based Auth)

---

## 🎯 Key Features & Modules

### 1️⃣ Patient Management 🏥
✔ Register & update patient details
✔ Maintain detailed health records
✔ Quick & easy patient search

### 2️⃣ Medical Checkups 🔬
✔ Record test results & reports
✔ Doctor’s final notes on health status
✔ Digital access to all reports

### 3️⃣ Billing System 💳
✔ Online payment support
✔ Transaction history tracking

### 4️⃣ Secure Authentication 🔐
✔ User roles: Admin, Doctor, Patient
✔ JWT-based authentication
✔ Session management & security

---

## 🛠️ Installation & Setup

### ⚡ Clone & Install Dependencies
```bash
git clone https://github.com/your-username/oncolab-diagnostics.git
cd oncolab-diagnostics
npm install
```

### ⚡ Setup Backend (Node.js + Express)
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` and add:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/oncolab
JWT_SECRET=your-secret-key
```

### ⚡ Start Backend Server
```bash
npm run dev  # Development mode
npm start    # Production mode
```
API runs at `http://localhost:5000`

### ⚡ Setup Frontend (React.js + Tailwind CSS)
```bash
cd frontend
npm install
npm start
```
Frontend runs at `http://localhost:3000`

---

## 🔗 API Endpoints

### 🔐 Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### 🏥 Patients
- GET `/api/patients` - Get all patients
- GET `/api/patients/:id` - Get patient by ID
- POST `/api/patients` - Add new patient
- PUT `/api/patients/:id` - Update patient details
- DELETE `/api/patients/:id` - Delete patient record

### 🔬 Checkups
- GET `/api/checkups` - Get all checkups
- POST `/api/checkups` - Create new checkup
- GET `/api/checkups/:id` - Get checkup details
- PUT `/api/checkups/:id` - Update checkup info

### 💳 Billing
- GET `/api/billing` - Get all bills
- POST `/api/billing` - Generate new bill
- GET `/api/billing/:id` - Get bill details
- PUT `/api/billing/:id` - Update bill
- DELETE `/api/billing/:id` - Remove bill

---

## 📊 Database Schema

The application uses **MongoDB** with the following collections:
- **Users** - Authentication & roles
- **Patients** - Patient health records
- **Checkups** - Medical checkup history
- **Bills** - Billing transactions

---

## 🔐 Security Features
✔ JWT Authentication
✔ Input Validation
✔ XSS & SQL Injection Protection
✔ MongoDB Injection Prevention

---

## 🏗️ Contributing
Want to contribute? Follow these steps:

1️⃣ Fork the repository
2️⃣ Create a feature branch (`git checkout -b feature-xyz`)
3️⃣ Commit your changes (`git commit -m 'Added feature XYZ'`)
4️⃣ Push to GitHub & open a PR 🚀

---

## 📩 Contact & Support
📧 **Email:** maneeshroks@gmail.com  
🔗 **GitHub Issues:** [Report a Bug](https://github.com/your-username/oncolab-diagnostics/issues)

---

## 📜 License
MIT License – Free to use, modify & distribute.
