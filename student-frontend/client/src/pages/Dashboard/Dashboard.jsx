import { useAuth } from "../../context/AuthContext";

import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";

function Dashboard() {

  const { user } =
    useAuth();

  if (
    user?.role ===
    "admin"
  ) {

    return (
      <AdminDashboard />
    );

  }

  if (
    user?.role ===
    "teacher"
  ) {

    return (
      <TeacherDashboard />
    );

  }

  return null;

}

export default Dashboard;