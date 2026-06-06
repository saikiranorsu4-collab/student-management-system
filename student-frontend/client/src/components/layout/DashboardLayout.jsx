import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex bg-[#070B1A] min-h-screen text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;