import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Grade 1-4", value: 35 },
  { name: "Grade 5-8", value: 30 },
  { name: "Grade 9-12", value: 25 },
  { name: "Others", value: 10 },
];

const COLORS = [
  "#7C3AED",
  "#2563EB",
  "#06B6D4",
  "#F43F5E",
];

function StudentChart() {
  return (
    <div
      className="
        bg-[#111827]
        border border-gray-800
        rounded-2xl
        p-5
      "
    >

      <h2 className="text-xl font-semibold mb-5">
        Students by Grade
      </h2>

      <div className="h-[300px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default StudentChart;