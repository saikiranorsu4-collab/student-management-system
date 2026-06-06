const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const Student =
  require("../models/Student");

const Teacher =
  require("../models/Teacher");

const Attendance =
  require("../models/Attendance");

const Fee =
  require("../models/Fee");

// =====================================
// DASHBOARD STATS
// =====================================

router.get(
  "/stats",
  authMiddleware,
  async (req, res) => {

    try {

      const totalStudents =
        await Student.countDocuments();

      const totalTeachers =
        await Teacher.countDocuments();

      const totalFees =
        await Fee.countDocuments();

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const todayAttendance =
        await Attendance.countDocuments({
          date: today,
        });

      const paidFees =
        await Fee.countDocuments({
          status: "Paid",
        });

      const pendingFees =
        await Fee.countDocuments({
          status: "Pending",
        });

      res.status(200).json({

        totalStudents,

        totalTeachers,

        totalFees,

        todayAttendance,

        paidFees,

        pendingFees,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }
);

module.exports = router;