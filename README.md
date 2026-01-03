# 🧑‍💼 DayFlow – Human Resource Management System (HRMS)

DayFlow is a modern, role-based HRMS designed to streamline employee attendance and leave workflows. It features a secure, scalable architecture with a polished UI, built to handle real-world HR operations.

## 🚀 Tech Stack

### Frontend
* **Framework:** React + Vite
* **Styling:** React-Bootstrap
* **Routing:** React Router DOM
* **API Client:** Axios
* **Security:** JWT-based Auth Handling

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **ORM:** Sequelize
* **Validation:** Joi
* **Database:** MySQL / PostgreSQL

---

## 🌟 Key Features

### 🔐 Authentication & Authorization
* Secure Signup & Login with JWT.
* Role-Based Access Control (RBAC): **ADMIN** vs **EMPLOYEE**.
* Protected frontend routes and backend middleware.

### 👤 Employee Module
* **Dashboard:** High-level summary of work status.
* **Attendance:** One-click Daily Check-In/Check-Out and history tracking.
* **Leave Management:** Apply for leaves and track status (Pending/Approved/Rejected).



### 🧑‍💼 Admin Module
* **Management Dashboard:** Overview of all organization activities.
* **Approval System:** Review, approve, or reject employee leave requests.
* **Employee Directory:** Full visibility into employee profiles and records.

---

## 🔌 API Endpoints (v1)

### 🔐 Authentication
* **POST** `/api/v1/auth/register` - Register a new account.
* **POST** `/api/v1/auth/login` - Authenticate and receive a JWT.

### 🕒 Attendance Module
* **POST** `/api/v1/attendence/check-in` - Record start of work day.
* **PUT** `/api/v1/attendence/check-out` - Record end of work day.
* **GET** `/api/v1/attendence/view-attendence` - Fetch personal attendance history.
* **GET** `/api/v1/attendence/admin-viewAll-attendence` - `Admin Only` View logs for all employees.

### 🌴 Leave Management
* **POST** `/api/v1/leave/apply-leave` - Submit a new leave application.
* **GET** `/api/v1/leave/view-leave` - Track personal leave status.
* **GET** `/api/v1/leave/admin-viewAll-leave` - `Admin Only` List all leave requests in the system.
* **PUT** `/api/v1/leave/:leaveId/admin-approve-leave` - `Admin Only` Approve a request.
* **PUT** `/api/v1/leave/:leaveId/admin-reject-leave` - `Admin Only` Reject a request.

### 🧑‍💼 Admin Operations
* **GET** `/api/v1/admin/viewAll-employees` - Retrieve a list of all users.
* **GET** `/api/v1/admin/viewSingle-employee/:userId` - View detailed profile of a specific employee.
  

🎯 Project Status

- Backend completed (Auth, Attendance, Leave, Admin)

-  Frontend completed (Employee & Admin flows)

-  Role-based access control implemented

-  UI polished and responsive

-  Ready for hackathon submission & interviews

💡 Final Thought :  "Good HR software is like a good team — organized, reliable, and built on trust."
