const activities = [
  {
    id: 1,
    title: "New student registered",
    user: "SaiKiran",
    time: "2 mins ago",
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Fee payment received",
    user: "Karthik",
    time: "10 mins ago",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Attendance updated",
    user: "Vinay",
    time: "30 mins ago",
    color: "bg-yellow-500",
  },
  {
    id: 4,
    title: "New course added",
    user: "Admin",
    time: "1 hour ago",
    color: "bg-purple-500",
  },
];

function RecentActivity() {

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
          Recent Activity
        </h2>

        <p className="text-gray-400 mt-1">
          Latest system updates
        </p>

      </div>

      {/* ACTIVITIES */}

      <div className="space-y-5">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="
              flex items-start gap-4
              border-b border-gray-800
              pb-4
            "
          >

            {/* DOT */}

            <div
              className={`
                w-3 h-3 rounded-full mt-2
                ${activity.color}
              `}
            />

            {/* CONTENT */}

            <div className="flex-1">

              <h3 className="font-medium">
                {activity.title}
              </h3>

              <p
                className="
                  text-sm
                  text-gray-400
                  mt-1
                "
              >
                {activity.user}
              </p>

            </div>

            {/* TIME */}

            <p
              className="
                text-xs
                text-gray-500
              "
            >
              {activity.time}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default RecentActivity;