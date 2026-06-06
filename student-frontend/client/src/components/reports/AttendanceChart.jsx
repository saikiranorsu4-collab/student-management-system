import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AttendanceChart({
  reportData,
}) {
  const attendance =
    reportData?.attendance || [];

  const data = attendance.map(
    (record, index) => ({
      day: `#${index + 1}`,
      attendance:
        record.status ===
        "Present"
          ? 100
          : 0,
    })
  );

  return (
    <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">
        Attendance Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <CartesianGrid stroke="#1F2937" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#8B5CF6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;