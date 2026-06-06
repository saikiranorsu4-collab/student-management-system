import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    month: "Jan",
    students: 40,
  },
  {
    month: "Feb",
    students: 80,
  },
  {
    month: "Mar",
    students: 65,
  },
  {
    month: "Apr",
    students: 120,
  },
  {
    month: "May",
    students: 90,
  },
  {
    month: "Jun",
    students: 160,
  },
];

function GrowthChart() {

  return (

    <div
      className="
        bg-[#0F172A]
        border border-gray-800
        rounded-3xl
        p-6
      "
    >

      {/* HEADER */}

      <div className="mb-6">

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          Student Growth
        </h2>

        <p
          className="
            text-gray-400
            text-sm
            mt-1
          "
        >
          Monthly student registrations
        </p>

      </div>

      {/* CHART */}

      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="colorStudents"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#8B5CF6"
                  stopOpacity={0.7}
                />

                <stop
                  offset="95%"
                  stopColor="#8B5CF6"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1E293B"
            />

            <XAxis
              dataKey="month"
              stroke="#94A3B8"
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="students"
              stroke="#8B5CF6"
              fillOpacity={1}
              fill="url(#colorStudents)"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default GrowthChart;