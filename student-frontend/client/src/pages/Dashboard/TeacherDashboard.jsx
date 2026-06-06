import {
  Users,
  CheckCircle,
  XCircle,
  ClipboardCheck,
} from "lucide-react";

import { useEffect } from "react";

import useStudentStore from "../../store/studentStore";

import Loader from "../../components/common/Loader";

function TeacherDashboard() {

  const {
    students,
    fetchStudents,
    loading,
  } = useStudentStore();

  useEffect(() => {

    fetchStudents();

  }, []);

  if (loading) {

    return <Loader />;

  }

  const totalStudents =
    students.length;

  const presentToday =
    Math.floor(
      totalStudents * 0.75
    );

  const absentToday =
    totalStudents -
    presentToday;

  const attendancePercentage =
    totalStudents > 0
      ? (
          (presentToday /
            totalStudents) *
          100
        ).toFixed(1)
      : 0;

  return (

    <div className="space-y-6">

      <div>

        <h1
          className="
          text-5xl
          font-bold
        "
        >
          Teacher Dashboard
        </h1>

        <p className="text-gray-400 mt-2">

          Manage attendance and monitor students

        </p>

      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-5
      "
      >

        {/* STUDENTS */}

        <div
          className="
          bg-[#0F172A]
          p-6
          rounded-3xl
          border
          border-gray-800
        "
        >

          <div className="flex justify-between">

            <div>

              <p className="text-gray-400">
                Assigned Students
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {totalStudents}
              </h2>

            </div>

            <Users size={32} />

          </div>

        </div>

        {/* PRESENT */}

        <div
          className="
          bg-[#0F172A]
          p-6
          rounded-3xl
          border
          border-gray-800
        "
        >

          <div className="flex justify-between">

            <div>

              <p className="text-gray-400">
                Present Today
              </p>

              <h2 className="text-4xl font-bold mt-2 text-green-400">
                {presentToday}
              </h2>

            </div>

            <CheckCircle
              size={32}
              className="text-green-500"
            />

          </div>

        </div>

        {/* ABSENT */}

        <div
          className="
          bg-[#0F172A]
          p-6
          rounded-3xl
          border
          border-gray-800
        "
        >

          <div className="flex justify-between">

            <div>

              <p className="text-gray-400">
                Absent Today
              </p>

              <h2 className="text-4xl font-bold mt-2 text-red-400">
                {absentToday}
              </h2>

            </div>

            <XCircle
              size={32}
              className="text-red-500"
            />

          </div>

        </div>

        {/* ATTENDANCE */}

        <div
          className="
          bg-[#0F172A]
          p-6
          rounded-3xl
          border
          border-gray-800
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

            <ClipboardCheck
              size={32}
              className="text-blue-500"
            />

          </div>

        </div>

      </div>

    </div>

  );

}

export default TeacherDashboard;