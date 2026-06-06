import {
  Users,
  GraduationCap,
  IndianRupee,
  ClipboardCheck,
} from "lucide-react";

function ReportsCards({ reportData }) {
  const students =
    reportData?.students || [];

  const teachers =
    reportData?.teachers || [];

  const attendance =
    reportData?.attendance || [];

  const fees =
    reportData?.fees?.fees || [];

  const attendancePercentage =
    attendance.length > 0
      ? Math.round(
          (attendance.filter(
            (a) =>
              a.status ===
              "Present"
          ).length /
            attendance.length) *
            100
        )
      : 0;

  const totalCollected =
    fees.reduce(
      (sum, fee) =>
        sum +
        (fee.paidAmount || 0),
      0
    );

  return (
    <div className="grid md:grid-cols-4 gap-5">
      <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">
        <Users
          size={30}
          className="text-purple-500 mb-3"
        />
        <h2 className="text-3xl font-bold">
          {students.length}
        </h2>
        <p className="text-gray-400">
          Students
        </p>
      </div>

      <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">
        <GraduationCap
          size={30}
          className="text-green-500 mb-3"
        />
        <h2 className="text-3xl font-bold">
          {teachers.length}
        </h2>
        <p className="text-gray-400">
          Teachers
        </p>
      </div>

      <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">
        <ClipboardCheck
          size={30}
          className="text-blue-500 mb-3"
        />
        <h2 className="text-3xl font-bold">
          {attendancePercentage}%
        </h2>
        <p className="text-gray-400">
          Attendance
        </p>
      </div>

      <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">
        <IndianRupee
          size={30}
          className="text-yellow-500 mb-3"
        />
        <h2 className="text-3xl font-bold">
          ₹{totalCollected}
        </h2>
        <p className="text-gray-400">
          Fees Collected
        </p>
      </div>
    </div>
  );
}

export default ReportsCards;