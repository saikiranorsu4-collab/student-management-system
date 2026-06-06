import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  FileBarChart,
  Settings,
  IndianRupee,
  GraduationCap,
  User,
  Wallet,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { user } = useAuth();

  // ==========================
  // ADMIN MENU
  // ==========================

  const adminNavItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Teachers",
      icon: GraduationCap,
      path: "/teachers",
    },
    {
      name: "Students",
      icon: Users,
      path: "/students",
    },
    {
      name: "Attendance",
      icon: ClipboardCheck,
      path: "/attendance",
    },
    {
      name: "Fees",
      icon: IndianRupee,
      path: "/fees",
    },
    {
      name: "Reports",
      icon: FileBarChart,
      path: "/reports",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  // ==========================
  // TEACHER MENU
  // ==========================

  const teacherNavItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Students",
      icon: Users,
      path: "/students",
    },
    {
      name: "Attendance",
      icon: ClipboardCheck,
      path: "/attendance",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  // ==========================
  // STUDENT MENU
  // ==========================

  const studentNavItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/student-dashboard",
    },
    {
      name: "Attendance",
      icon: ClipboardCheck,
      path: "/my-attendance",
    },
    {
      name: "My Fees",
      icon: IndianRupee,
      path: "/my-fees",
    },
    {
      name: "Payment History",
      icon: Wallet,
      path: "/payment-history",
    },
    {
      name: "Profile",
      icon: User,
      path: "/my-profile",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const navItems =
    user?.role === "admin"
      ? adminNavItems
      : user?.role === "teacher"
      ? teacherNavItems
      : studentNavItems;

  return (
    <aside
      className={`
        fixed
        top-0
        left-0
        z-50
        h-screen
        w-[220px]
        bg-[#081028]
        border-r
        border-white/5
        transition-transform
        duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0
      `}
    >
      {/* MOBILE HEADER */}

      <div
        className="
        flex
        items-center
        justify-between
        p-5
        lg:hidden
      "
      >
        <h1
          className="
          text-2xl
          font-bold
          bg-gradient-to-r
          from-purple-400
          to-pink-500
          bg-clip-text
          text-transparent
        "
        >
          EduManage
        </h1>

        <button
          onClick={() =>
            setSidebarOpen(false)
          }
        >
          <X size={24} />
        </button>
      </div>

      {/* LOGO */}

      <div
        className="
        hidden
        lg:block
        p-5
        border-b
        border-white/5
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          bg-gradient-to-r
          from-purple-400
          to-pink-500
          bg-clip-text
          text-transparent
        "
        >
          EduManage
        </h1>

        <p
          className="
          text-gray-400
          text-sm
          mt-2
        "
        >
          {user?.role === "admin"
            ? "Admin Panel"
            : user?.role === "teacher"
            ? "Teacher Panel"
            : "Student Portal"}
        </p>
      </div>

      {/* USER INFO */}

      <div
        className="
        px-5
        py-4
        border-b
        border-white/5
      "
      >
        <h3
          className="
          text-white
          font-semibold
        "
        >
          {user?.name}
        </h3>

        <p
          className="
          text-xs
          uppercase
          text-purple-400
          mt-1
        "
        >
          {user?.role}
        </p>
      </div>

      {/* MENU */}

      <nav
        className="
        p-3
        space-y-2
      "
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() =>
                setSidebarOpen(false)
              }
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                    : "text-gray-300 hover:bg-white/5"
                }
              `
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;