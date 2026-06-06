import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DepartmentChart({
  reportData,
}) {
  const departmentMap = {};

  reportData.students.forEach(
    (student) => {
      const dept =
        student.department ||
        "Unknown";

      departmentMap[dept] =
        (departmentMap[dept] || 0) + 1;
    }
  );

  const chartData =
    Object.keys(
      departmentMap
    ).map((dept) => ({
      department: dept,
      students:
        departmentMap[dept],
    }));

  return (
    <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">
        Department Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart
          data={chartData}
        >
          <XAxis
            dataKey="department"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="students"
            fill="#3B82F6"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DepartmentChart;