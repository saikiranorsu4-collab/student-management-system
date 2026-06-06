import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#10B981",
  "#EF4444",
];

function FeeChart({
  reportData,
}) {
  const fees =
    reportData?.fees?.fees || [];

  const paid =
    fees.filter(
      (fee) =>
        fee.status === "Paid"
    ).length;

  const pending =
    fees.filter(
      (fee) =>
        fee.status !== "Paid"
    ).length;

  const data = [
    {
      name: "Paid",
      value: paid,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];

  return (
    <div className="bg-[#0F172A] p-6 rounded-3xl border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">
        Fee Collection
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map(
              (
                entry,
                index
              ) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FeeChart;