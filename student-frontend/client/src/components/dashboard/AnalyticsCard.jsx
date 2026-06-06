import { motion } from "framer-motion";

function AnalyticsCard({
  title,
  value,
  growth,
  icon,
  color,
}) {

  return (

    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
        bg-[#0F172A]
        border border-gray-800
        rounded-3xl
        p-5
        shadow-lg
        hover:border-purple-500/30
        transition-all
      "
    >

      {/* TOP */}

      <div
        className="
          flex items-center
          justify-between
        "
      >

        {/* LEFT */}

        <div>

          <p
            className="
              text-gray-400
              text-sm
            "
          >
            {title}
          </p>

          <h2
            className="
              text-3xl
              font-bold
              mt-3
            "
          >
            {value}
          </h2>

        </div>

        {/* ICON */}

        <div
          className="
            w-14 h-14
            rounded-2xl
            flex items-center
            justify-center
          "
          style={{
            background: color,
          }}
        >
          {icon}
        </div>

      </div>

      {/* GROWTH */}

      <div className="mt-5">

        <span
          className="
            text-green-400
            text-sm
          "
        >
          ↑ {growth} this month
        </span>

      </div>

    </motion.div>

  );

}

export default AnalyticsCard;