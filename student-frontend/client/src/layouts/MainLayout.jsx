import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div
      className="
      flex
      min-h-screen
      bg-[#020817]
      text-white
      overflow-x-hidden
    "
    >
      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="
          fixed
          inset-0
          bg-black/50
          z-40
          lg:hidden
        "
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}

      <div
        className="
        flex-1
        min-w-0
        lg:ml-[220px]
      "
      >
        <Navbar
          setSidebarOpen={
            setSidebarOpen
          }
        />

        <main
          className="
          p-4
          md:p-6
          overflow-x-hidden
        "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;