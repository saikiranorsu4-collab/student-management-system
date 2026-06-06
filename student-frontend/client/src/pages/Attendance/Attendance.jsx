import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  Users,
  UserCheck,
  UserX,
  Percent,
} from "lucide-react";

import useStudentStore from "../../store/studentStore";

import {
  saveAttendance,
  getTodayAttendance,
} from "../../services/attendanceService";


function Attendance() {
 
  const {
    students,
    fetchStudents,
  } = useStudentStore();

  const [attendance, setAttendance] =
    useState({});

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      try {
        await fetchStudents();

        const records =
          await getTodayAttendance();

        const attendanceMap =
          {};

        records.forEach(
          (record) => {
            attendanceMap[
              record.studentId
            ] = record.status;
          }
        );

        setAttendance(
          attendanceMap
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load attendance"
        );
      }
    };

  // ===================================
  // SEARCH FILTER
  // ===================================

  const filteredStudents =
  students;
  // ===================================
  // CHANGE STATUS
  // ===================================

  const handleStatusChange =
    (
      studentId,
      status
    ) => {
      setAttendance(
        (prev) => ({
          ...prev,
          [studentId]:
            status,
        })
      );
    };

  // ===================================
  // SAVE ATTENDANCE
  // ===================================

  const handleSaveAttendance =
    async () => {
      try {
        setSaving(true);

        const records =
          Object.entries(
            attendance
          );

        for (const [
          studentId,
          status,
        ] of records) {
          await saveAttendance({
            studentId,
            status,
          });
        }

        toast.success(
          "Attendance Saved Successfully"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to save attendance"
        );
      } finally {
        setSaving(false);
      }
    };

  // ===================================
  // STATS
  // ===================================

  const totalStudents =
    students.length;

  const presentStudents =
    Object.values(
      attendance
    ).filter(
      (status) =>
        status ===
        "Present"
    ).length;

  const absentStudents =
    Object.values(
      attendance
    ).filter(
      (status) =>
        status ===
        "Absent"
    ).length;

  const attendancePercentage =
    totalStudents > 0
      ? Math.round(
          (presentStudents /
            totalStudents) *
            100
        )
      : 0;

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-5xl font-bold">
          Attendance
        </h1>

        <p className="text-gray-400 mt-2">
          Manage daily attendance
        </p>
      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
      >
        <div
          className="
          bg-[#0F172A]
          border border-gray-800
          rounded-3xl
          p-6
        "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400">
                Total Students
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {totalStudents}
              </h2>
            </div>

            <Users
              size={36}
              className="text-purple-500"
            />
          </div>
        </div>

        <div
          className="
          bg-[#0F172A]
          border border-gray-800
          rounded-3xl
          p-6
        "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400">
                Present
              </p>

              <h2 className="text-4xl font-bold mt-2 text-green-400">
                {presentStudents}
              </h2>
            </div>

            <UserCheck
              size={36}
              className="text-green-400"
            />
          </div>
        </div>

        <div
          className="
          bg-[#0F172A]
          border border-gray-800
          rounded-3xl
          p-6
        "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400">
                Absent
              </p>

              <h2 className="text-4xl font-bold mt-2 text-red-400">
                {absentStudents}
              </h2>
            </div>

            <UserX
              size={36}
              className="text-red-400"
            />
          </div>
        </div>

        <div
          className="
          bg-[#0F172A]
          border border-gray-800
          rounded-3xl
          p-6
        "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400">
                Attendance %
              </p>

              <h2 className="text-4xl font-bold mt-2 text-blue-400">
                {attendancePercentage}%
              </h2>
            </div>

            <Percent
              size={36}
              className="text-blue-400"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div
        className="
        bg-[#0F172A]
        border border-gray-800
        rounded-3xl
        overflow-hidden
      "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#172554]">
                <th className="p-5 text-left">
                  Student
                </th>

                <th className="p-5 text-left">
                  Department
                </th>

                <th className="p-5 text-center">
                  Attendance Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map(
                (student) => {
                  const status =
                    attendance[
                      student._id
                    ];

                  return (
                    <tr
                      key={
                        student._id
                      }
                      className="
                      border-b
                      border-gray-800
                      hover:bg-[#111827]
                    "
                    >
                      <td className="p-5">
                        {student.name}
                      </td>

                      <td className="p-5 text-gray-400">
                        {
                          student.department
                        }
                      </td>

                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() =>
                              handleStatusChange(
                                student._id,
                                "Present"
                              )
                            }
                            className={`
                              px-5 py-2
                              rounded-xl
                              font-medium
                              transition-all
                              ${
                                status ===
                                "Present"
                                  ? "bg-green-500 text-white"
                                  : "bg-[#1E293B] text-gray-400"
                              }
                            `}
                          >
                            ✓ Present
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(
                                student._id,
                                "Absent"
                              )
                            }
                            className={`
                              px-5 py-2
                              rounded-xl
                              font-medium
                              transition-all
                              ${
                                status ===
                                "Absent"
                                  ? "bg-red-500 text-white"
                                  : "bg-[#1E293B] text-gray-400"
                              }
                            `}
                          >
                            ✕ Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}

              {filteredStudents.length ===
                0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="
                    text-center
                    py-10
                    text-gray-400
                  "
                  >
                    No Students Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SAVE BUTTON */}

      <div className="flex justify-end">
        <button
          onClick={
            handleSaveAttendance
          }
          disabled={saving}
          className="
          px-8
          py-3
          rounded-2xl
          bg-gradient-to-r
          from-purple-600
          to-pink-500
          text-white
          font-semibold
          shadow-lg
          hover:opacity-90
        "
        >
          {saving
            ? "Saving..."
            : "Save Attendance"}
        </button>
      </div>
    </div>
  );
}

export default Attendance;