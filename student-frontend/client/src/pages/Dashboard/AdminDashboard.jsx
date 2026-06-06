import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";

import {
  Users,
  ClipboardCheck,
  IndianRupee,
  AlertCircle,
} from "lucide-react";

import RecentActivity from "../../components/dashboard/RecentActivity";
import StatsCard from "../../components/dashboard/StatsCard";
import AttendanceChart from "../../components/dashboard/AttendanceChart";
import Loader from "../../components/common/Loader";

import useStudentStore from "../../store/studentStore";

function AdminDashboard() {

  const {
    students,
    fetchStudents,
    loading,
  } = useStudentStore();

  const [
    dashboardStats,
    setDashboardStats,
  ] = useState({

    totalStudents: 0,

    totalTeachers: 0,

    totalFees: 0,

    todayAttendance: 0,

    paidFees: 0,

    pendingFees: 0,

  });

  const [
    statsLoading,
    setStatsLoading,
  ] = useState(true);

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await fetchStudents();

        const response =
          await axios.get(

            "http://localhost:5000/api/dashboard/stats",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }

          );

        setDashboardStats(
          response.data
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load dashboard"
        );

      } finally {

        setStatsLoading(
          false
        );

      }

    };

  if (
    loading ||
    statsLoading
  ) {

    return <Loader />;

  }

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div>

        <h1
          className="
          text-4xl
          md:text-5xl
          font-bold
        "
        >
          Admin Dashboard
        </h1>

        <p
          className="
          text-gray-400
          mt-2
        "
        >
          Manage students, teachers,
          attendance and fees.
        </p>

      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
      "
      >

        <StatsCard
          title="Total Students"
          value={
            dashboardStats.totalStudents
          }
          icon={
            <Users size={26} />
          }
          color="from-purple-600 to-pink-500"
        />

        <StatsCard
          title="Attendance Today"
          value={
            dashboardStats.todayAttendance
          }
          icon={
            <ClipboardCheck
              size={26}
            />
          }
          color="from-green-500 to-emerald-600"
        />

        <StatsCard
          title="Paid Fees"
          value={
            dashboardStats.paidFees
          }
          icon={
            <IndianRupee
              size={26}
            />
          }
          color="from-blue-500 to-cyan-500"
        />

        <StatsCard
          title="Pending Fees"
          value={
            dashboardStats.pendingFees
          }
          icon={
            <AlertCircle
              size={26}
            />
          }
          color="from-red-500 to-pink-500"
        />

      </div>

      {/* CHART */}

      <AttendanceChart />

      {/* ACTIVITY */}

      <RecentActivity />

      {/* RECENT STUDENTS */}

      <div
        className="
        bg-[#0F172A]
        border
        border-gray-800
        rounded-3xl
        p-6
      "
      >

        <div
          className="
          flex
          items-center
          justify-between
          mb-6
        "
        >

          <div>

            <h2
              className="
              text-2xl
              font-bold
            "
            >
              Recent Students
            </h2>

            <p
              className="
              text-gray-400
              text-sm
              mt-1
            "
            >
              Latest registered students
            </p>

          </div>

          <Link
            to="/students"
            className="
            bg-gradient-to-r
            from-purple-600
            to-pink-500
            px-5
            py-2
            rounded-xl
          "
          >
            View All
          </Link>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr
                className="
                border-b
                border-gray-800
              "
              >

                <th className="py-4 text-left">
                  Name
                </th>

                <th className="py-4 text-left">
                  Email
                </th>

                <th className="py-4 text-left">
                  Course
                </th>

                <th className="py-4 text-left">
                  Age
                </th>

              </tr>

            </thead>

            <tbody>

              {students
                .slice(0, 5)
                .map(
                  (
                    student
                  ) => (

                    <tr
                      key={
                        student._id
                      }
                      className="
                      border-b
                      border-gray-800
                    "
                    >

                      <td className="py-4">
                        {
                          student.name
                        }
                      </td>

                      <td>
                        {
                          student.email
                        }
                      </td>

                      <td>
                        {
                          student.course
                        }
                      </td>

                      <td>
                        {
                          student.age
                        }
                      </td>

                    </tr>

                  )
                )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;