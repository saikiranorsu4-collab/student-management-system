import { motion } from "framer-motion";

function StatsCard({
  title,
  value,
  icon,
  color,
  percentage,
}) {

  return (

    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        bg-[#0F172A]
        border border-gray-800
        rounded-2xl
        p-5
        shadow-lg
        hover:border-purple-500/40
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

        {/* TEXT */}

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
              mt-2
            "
          >
            {value}
          </h2>

        </div>

        {/* ICON */}

        <div
          className="
            w-12 h-12
            rounded-xl
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

      {/* BOTTOM */}

      <div className="mt-4">

        <p
          className="
            text-green-400
            text-xs
          "
        >
          ↑ {percentage} from last month
        </p>

      </div>

    </motion.div>

  );

}

export default StatsCard;