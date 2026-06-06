import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";



const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6200 },
  { month: "Jun", revenue: 7200 },
];



const RevenueChart = () => {

  return (

    <div className="bg-[#081028] border border-white/5 rounded-3xl p-6 h-[420px]">

      <h2 className="text-3xl font-bold text-white mb-2">

        Revenue Analytics

      </h2>

      <p className="text-gray-400 mb-6">

        Monthly revenue overview

      </p>



      <div className="w-full h-[280px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <XAxis
              dataKey="month"
              stroke="#94A3B8"
            />

            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="#A855F7"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};



export default RevenueChart;