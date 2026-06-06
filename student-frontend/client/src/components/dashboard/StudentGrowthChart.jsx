import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";



const data = [
  { month: "Jan", students: 30 },
  { month: "Feb", students: 45 },
  { month: "Mar", students: 40 },
  { month: "Apr", students: 60 },
  { month: "May", students: 52 },
  { month: "Jun", students: 70 },
  { month: "Jul", students: 65 },
];



const StudentGrowthChart = () => {

  return (

    <div className="bg-[#081028] border border-white/5 rounded-3xl p-6 h-[450px]">

      <h2 className="text-3xl font-bold text-white mb-2">

        Student Growth

      </h2>

      <p className="text-gray-400 mb-6">

        Monthly student registrations

      </p>



      <div className="w-full h-[320px]">

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
                  stopColor="#A855F7"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#A855F7"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>



            <XAxis
              dataKey="month"
              stroke="#94A3B8"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="students"
              stroke="#A855F7"
              fillOpacity={1}
              fill="url(#colorStudents)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};



export default StudentGrowthChart;