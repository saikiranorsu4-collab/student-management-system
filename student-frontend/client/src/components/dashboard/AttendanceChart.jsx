import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    day: "Mon",
    attendance: 70,
  },
  {
    day: "Tue",
    attendance: 75,
  },
  {
    day: "Wed",
    attendance: 68,
  },
  {
    day: "Thu",
    attendance: 80,
  },
  {
    day: "Fri",
    attendance: 92,
  },
  {
    day: "Sat",
    attendance: 60,
  },
  {
    day: "Sun",
    attendance: 76,
  },
];

function AttendanceChart() {

  return (

    <div
      className="
        bg-[#0F172A]
        border border-gray-800
        rounded-2xl
        p-5
      "
    >

      {/* TOP */}

      <div
        className="
          flex items-center
          justify-between
          mb-6
        "
      >

        <div>

          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Attendance Overview
          </h2>

          <p
            className="
              text-gray-400
              text-sm
              mt-1
            "
          >
            Weekly attendance analytics
          </p>

        </div>

        <button
          className="
            bg-[#1E293B]
            text-sm
            px-4 py-2
            rounded-xl
            border border-gray-700
          "
        >
          This Week
        </button>

      </div>

      {/* CHART */}

      <div className="h-[300px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1E293B"
            />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default AttendanceChart;