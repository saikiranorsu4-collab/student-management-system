import {
  Trash2,
  UserCircle,
} from "lucide-react";

import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportPDF";
import { exportToCSV } from "../../utils/exportCSV";

function TeacherTable({
  teachers,
  onDelete,
}) {

  const handleExportExcel = () => {

    const data = teachers.map(
      (teacher) => ({
        Name: teacher.name,
        Email: teacher.email,
        Phone: teacher.phone,
        Subject: teacher.subject,
        Qualification:
          teacher.qualification,
        Experience:
          teacher.experience,
        Status: teacher.status,
      })
    );

    exportToExcel(
      data,
      "Teachers_Report"
    );

  };

  const handleExportCSV = () => {

    const data = teachers.map(
      (teacher) => ({
        Name: teacher.name,
        Email: teacher.email,
        Phone: teacher.phone,
        Subject: teacher.subject,
        Qualification:
          teacher.qualification,
        Experience:
          teacher.experience,
        Status: teacher.status,
      })
    );

    exportToCSV(
      data,
      "Teachers_Report"
    );

  };

  const handleExportPDF = () => {

    const columns = [
      "Name",
      "Email",
      "Phone",
      "Subject",
      "Qualification",
      "Experience",
      "Status",
    ];

    const data =
      teachers.map(
        (teacher) => [
          teacher.name,
          teacher.email,
          teacher.phone,
          teacher.subject,
          teacher.qualification,
          teacher.experience,
          teacher.status,
        ]
      );

    exportToPDF(
      columns,
      data,
      "Teachers Report"
    );

  };

  if (
    !teachers ||
    teachers.length === 0
  ) {

    return (

      <div
        className="
        bg-[#0F172A]
        border
        border-gray-800
        rounded-3xl
        p-10
        text-center
      "
      >

        <h2
          className="
          text-2xl
          font-semibold
        "
        >
          No Teachers Found
        </h2>

        <p className="text-gray-400 mt-2">
          Add your first teacher.
        </p>

      </div>

    );

  }

  return (

    <div
      className="
      bg-[#0F172A]
      border
      border-gray-800
      rounded-3xl
      overflow-hidden
    "
    >

      {/* EXPORT BUTTONS */}

      <div
        className="
        flex
        gap-3
        p-5
        border-b
        border-gray-800
      "
      >

        <button
          onClick={handleExportExcel}
          className="
          px-4 py-2
          rounded-xl
          bg-green-600
          hover:bg-green-700
        "
        >
          Export Excel
        </button>

        <button
          onClick={handleExportPDF}
          className="
          px-4 py-2
          rounded-xl
          bg-red-600
          hover:bg-red-700
        "
        >
          Export PDF
        </button>

        <button
          onClick={handleExportCSV}
          className="
          px-4 py-2
          rounded-xl
          bg-blue-600
          hover:bg-blue-700
        "
        >
          Export CSV
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
              border-b
              border-gray-800
              bg-[#111827]
            "
            >

              <th className="p-4 text-left">
                Teacher
              </th>

              <th className="p-4 text-left">
                Subject
              </th>

              <th className="p-4 text-left">
                Qualification
              </th>

              <th className="p-4 text-left">
                Experience
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {teachers.map(
              (teacher) => (

                <tr
                  key={teacher._id}
                  className="
                  border-b
                  border-gray-800
                  hover:bg-[#111827]
                "
                >

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <UserCircle
                        size={36}
                        className="text-purple-500"
                      />

                      <div>

                        <h3 className="font-medium">
                          {teacher.name}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {teacher.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">
                    {teacher.subject}
                  </td>

                  <td className="p-4">
                    {teacher.qualification}
                  </td>

                  <td className="p-4">
                    {teacher.experience} Years
                  </td>

                  <td className="p-4">

                    <span
                      className={`
                      px-3 py-1 rounded-full text-sm
                      ${
                        teacher.status ===
                        "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    `}
                    >
                      {teacher.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        onDelete(
                          teacher._id
                        )
                      }
                      className="
                      flex
                      items-center
                      gap-2
                      px-3
                      py-2
                      bg-red-600
                      hover:bg-red-700
                      rounded-lg
                    "
                    >

                      <Trash2
                        size={16}
                      />

                      Delete

                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default TeacherTable;