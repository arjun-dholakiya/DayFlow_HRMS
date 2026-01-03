import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ProtectedRoute from './auth/ProtectedRoute';

import EmployeeDashboard from './pages/employee/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

// Temporary placeholders (will be replaced in next steps)
const Attendance = () => <h3 style={{ padding: 40 }}>Attendance Page</h3>;
const Leave = () => <h3 style={{ padding: 40 }}>Leave Page</h3>;
const Employees = () => <h3 style={{ padding: 40 }}>Employees Page</h3>;
const AdminAttendance = () => <h3 style={{ padding: 40 }}>Admin Attendance</h3>;
const LeaveApproval = () => <h3 style={{ padding: 40 }}>Leave Approval</h3>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Employee */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/leave"
          element={
            <ProtectedRoute>
              <Leave />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute>
              <AdminAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/leave"
          element={
            <ProtectedRoute>
              <LeaveApproval />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
