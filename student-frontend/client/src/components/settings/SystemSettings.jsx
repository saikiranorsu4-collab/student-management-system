import { Settings } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function SystemSettings() {

  const [system, setSystem] =
    useState({
      instituteName:
        "EduManage",
      academicYear:
        "2025-26",
      email:
        "admin@college.com",
    });

  const handleChange = (e) => {
    setSystem({
      ...system,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSave = () => {
    toast.success(
      "System Settings Saved"
    );
  };

  return (
    <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">

      <div className="flex items-center gap-3 mb-6">
        <Settings className="text-blue-500" />
        <h2 className="text-2xl font-bold">
          System Settings
        </h2>
      </div>

      <div className="space-y-4">

        <input
          type="text"
          name="instituteName"
          value={system.instituteName}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#111827]"
        />

        <input
          type="email"
          name="email"
          value={system.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#111827]"
        />

        <input
          type="text"
          name="academicYear"
          value={system.academicYear}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#111827]"
        />

        <button
          onClick={handleSave}
          className="px-5 py-3 rounded-xl bg-blue-600"
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}

export default SystemSettings;