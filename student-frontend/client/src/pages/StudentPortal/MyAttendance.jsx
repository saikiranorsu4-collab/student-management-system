import {
  useEffect,
  useState,
} from "react";

import {
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  getStudentAttendance,
} from "../../services/attendanceService";

import {
  getMyProfile,
} from "../../services/studentService";

import Loader from "../../components/common/Loader";

function MyAttendance() {

  const [records, setRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadAttendance();

  }, []);

  const loadAttendance =
    async () => {

      try {

        const profileResponse =
          await getMyProfile();

        console.log(
          "PROFILE:",
          profileResponse
        );

        const studentId =
          profileResponse.student._id;

        console.log(
          "STUDENT ID:",
          studentId
        );

        const attendanceData =
          await getStudentAttendance(
            studentId
          );

        console.log(
          "ATTENDANCE:",
          attendanceData
        );

        setRecords(
          attendanceData
        );

      } catch (error) {

        console.log(
          "Attendance Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return <Loader />;

  }

  const presentCount =
    records.filter(
      (item) =>
        item.status ===
        "Present"
    ).length;

  const absentCount =
    records.filter(
      (item) =>
        item.status ===
        "Absent"
    ).length;

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          My Attendance
        </h1>

        <p className="text-gray-400 mt-2">
          View your attendance history
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-[#0F172A] p-6 rounded-3xl">

          <CheckCircle
            size={32}
            className="text-green-500 mb-3"
          />

          <h2 className="text-3xl font-bold">
            {presentCount}
          </h2>

          <p className="text-gray-400">
            Present Days
          </p>

        </div>

        <div className="bg-[#0F172A] p-6 rounded-3xl">

          <XCircle
            size={32}
            className="text-red-500 mb-3"
          />

          <h2 className="text-3xl font-bold">
            {absentCount}
          </h2>

          <p className="text-gray-400">
            Absent Days
          </p>

        </div>

      </div>

      <div className="bg-[#0F172A] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10">

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {records.length > 0 ? (

              records.map(
                (item) => (

                  <tr
                    key={item._id}
                    className="border-b border-white/5"
                  >

                    <td className="p-4">
                      {item.date}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-lg ${
                          item.status ===
                          "Present"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="2"
                  className="p-8 text-center text-gray-400"
                >
                  No attendance records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default MyAttendance;