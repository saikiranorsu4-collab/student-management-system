import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import Teachers from "./pages/Teachers/Teachers";
import Attendance from "./pages/Attendance/Attendance";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";
import Fees from "./pages/Fees/Fees";

import Login from "./pages/Auth/Login";

import StudentDashboard from "./pages/StudentPortal/StudentDashboard";
import MyAttendance from "./pages/StudentPortal/MyAttendance";
import MyFees from "./pages/StudentPortal/MyFees";
import MyProfile from "./pages/StudentPortal/MyProfile";
import PaymentHistory from "./pages/StudentPortal/PaymentHistory";

import MainLayout from "./layouts/MainLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtected from "./components/RoleProtected";

function App() {
  return (
    <Routes>
      {/* LOGIN */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* PROTECTED ROUTES */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* DEFAULT */}

        <Route
          index
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* ADMIN / TEACHER DASHBOARD */}

        <Route
          path="dashboard"
          element={
            <RoleProtected
              allowedRoles={[
                "admin",
                "teacher",
              ]}
            >
              <Dashboard />
            </RoleProtected>
          }
        />

        {/* TEACHERS */}

        <Route
          path="teachers"
          element={
            <RoleProtected
              allowedRoles={[
                "admin",
              ]}
            >
              <Teachers />
            </RoleProtected>
          }
        />

        {/* STUDENTS */}

        <Route
          path="students"
          element={
            <RoleProtected
              allowedRoles={[
                "admin",
                "teacher",
              ]}
            >
              <Students />
            </RoleProtected>
          }
        />

        {/* ATTENDANCE */}

        <Route
          path="attendance"
          element={
            <RoleProtected
              allowedRoles={[
                "admin",
                "teacher",
              ]}
            >
              <Attendance />
            </RoleProtected>
          }
        />

        {/* FEES */}

        <Route
          path="fees"
          element={
            <RoleProtected
              allowedRoles={[
                "admin",
              ]}
            >
              <Fees />
            </RoleProtected>
          }
        />

        {/* REPORTS */}

        <Route
          path="reports"
          element={
            <RoleProtected
              allowedRoles={[
                "admin",
              ]}
            >
              <Reports />
            </RoleProtected>
          }
        />

        {/* SETTINGS */}

        <Route
          path="settings"
          element={
            <RoleProtected
              allowedRoles={[
                "admin",
                "teacher",
                "student",
              ]}
            >
              <Settings />
            </RoleProtected>
          }
        />

        {/* STUDENT DASHBOARD */}

        <Route
          path="student-dashboard"
          element={
            <RoleProtected
              allowedRoles={[
                "student",
              ]}
            >
              <StudentDashboard />
            </RoleProtected>
          }
        />

        {/* STUDENT ATTENDANCE */}

        <Route
          path="my-attendance"
          element={
            <RoleProtected
              allowedRoles={[
                "student",
              ]}
            >
              <MyAttendance />
            </RoleProtected>
          }
        />

        {/* STUDENT FEES */}

        <Route
          path="my-fees"
          element={
            <RoleProtected
              allowedRoles={[
                "student",
              ]}
            >
              <MyFees />
            </RoleProtected>
          }
        />

        {/* STUDENT PAYMENT HISTORY */}

        <Route
          path="payment-history"
          element={
            <RoleProtected
              allowedRoles={[
                "student",
              ]}
            >
              <PaymentHistory />
            </RoleProtected>
          }
        />

        {/* STUDENT PROFILE */}

        <Route
          path="my-profile"
          element={
            <RoleProtected
              allowedRoles={[
                "student",
              ]}
            >
              <MyProfile />
            </RoleProtected>
          }
        />
      </Route>

      {/* FALLBACK */}

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;