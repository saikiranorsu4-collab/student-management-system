import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";



const data = [
  { name: "AI", value: 35 },
  { name: "CSE", value: 25 },
  { name: "DS", value: 20 },
  { name: "MERN", value: 30 },
];



const COLORS = [
  "#A855F7",
  "#10B981",
  "#F59E0B",
  "#3B82F6",
];



const StudentsPieChart = () => {

  return (

    <div className="bg-[#081028] border border-white/5 rounded-3xl p-6 h-[420px]">

      <h2 className="text-3xl font-bold text-white mb-2">

        Students Distribution

      </h2>

      <p className="text-gray-400 mb-6">

        Course-wise student data

      </p>



      <div className="w-full h-[280px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
            >

              {data.map(
                (entry, index) => (

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

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};



export default StudentsPieChart;