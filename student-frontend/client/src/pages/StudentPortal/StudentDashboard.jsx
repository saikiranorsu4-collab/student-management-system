import {
  User,
  Calendar,
  CreditCard,
  BookOpen,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  getMyProfile,
} from "../../services/studentService";

import {
  getStudentAttendance,
} from "../../services/attendanceService";

import {
  getStudentFees,
} from "../../services/feeService";

import Loader from "../../components/common/Loader";

function StudentDashboard() {

  const [student, setStudent] =
    useState(null);

  const [attendance, setAttendance] =
    useState([]);

  const [fees, setFees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadStudentData();

  }, []);

  const loadStudentData =
    async () => {

      try {

        const profileResponse =
          await getMyProfile();

        const profile =
          profileResponse.student;

        setStudent(profile);

        const attendanceData =
          await getStudentAttendance(
            profile._id
          );

        setAttendance(
          attendanceData
        );

        const feeData =
          await getStudentFees(
            profile.name
          );

        setFees(
          feeData
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return <Loader />;

  }

  const totalAttendance =
    attendance.length;

  const presentDays =
    attendance.filter(
      (item) =>
        item.status ===
        "Present"
    ).length;

  const attendancePercentage =
    totalAttendance
      ? (
          (presentDays /
            totalAttendance) *
          100
        ).toFixed(1)
      : 0;

  const totalFees =
    fees.reduce(
      (sum, fee) =>
        sum + fee.amount,
      0
    );

  const paidFees =
    fees
      .filter(
        (fee) =>
          fee.status ===
          "Paid"
      )
      .reduce(
        (sum, fee) =>
          sum + fee.amount,
        0
      );

  const pendingFees =
    totalFees - paidFees;

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1
          className="
          text-4xl
          md:text-5xl
          font-bold
          text-white
        "
        >
          Welcome,
          {" "}
          {student?.name}
        </h1>

        <p className="text-gray-400 mt-2">

          {student?.course}
          {" • "}
          {student?.department}

        </p>

      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
      >

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

          <Calendar
            size={34}
            className="
            text-green-500
            mb-4
          "
          />

          <h2 className="text-3xl font-bold">

            {attendancePercentage}%

          </h2>

          <p className="text-gray-400">

            Attendance

          </p>

        </div>

        {/* FEES */}

        <div
          className="
          bg-[#0F172A]
          p-6
          rounded-3xl
          border
          border-gray-800
        "
        >

          <CreditCard
            size={34}
            className="
            text-yellow-500
            mb-4
          "
          />

          <h2 className="text-3xl font-bold">

            ₹{pendingFees}

          </h2>

          <p className="text-gray-400">

            Pending Fees

          </p>

        </div>

        {/* YEAR */}

        <div
          className="
          bg-[#0F172A]
          p-6
          rounded-3xl
          border
          border-gray-800
        "
        >

          <BookOpen
            size={34}
            className="
            text-blue-500
            mb-4
          "
          />

          <h2 className="text-3xl font-bold">

            {student?.year}

          </h2>

          <p className="text-gray-400">

            Academic Year

          </p>

        </div>

        {/* STATUS */}

        <div
          className="
          bg-[#0F172A]
          p-6
          rounded-3xl
          border
          border-gray-800
        "
        >

          <User
            size={34}
            className="
            text-purple-500
            mb-4
          "
          />

          <h2 className="text-3xl font-bold">

            {student?.status}

          </h2>

          <p className="text-gray-400">

            Student Status

          </p>

        </div>

      </div>

      {/* PROFILE CARD */}

      <div
        className="
        bg-[#0F172A]
        border
        border-gray-800
        rounded-3xl
        p-8
      "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-6
        "
        >
          My Profile
        </h2>

        <div
          className="
          grid
          md:grid-cols-2
          gap-5
        "
        >

          <div>

            <p className="text-gray-400">
              Roll Number
            </p>

            <h3 className="text-xl">
              {student?.rollNumber}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Email
            </p>

            <h3 className="text-xl">
              {student?.email}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Department
            </p>

            <h3 className="text-xl">
              {student?.department}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Section
            </p>

            <h3 className="text-xl">
              {student?.section}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Parent Name
            </p>

            <h3 className="text-xl">
              {student?.parentName}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Parent Phone
            </p>

            <h3 className="text-xl">
              {student?.parentPhone}
            </h3>

          </div>

        </div>

      </div>

    </div>

  );

}

export default StudentDashboard;