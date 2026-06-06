const express = require("express");

const router = express.Router();

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Attendance = require("../models/Attendance");
const Fee = require("../models/Fee");

const authMiddleware =
  require("../middleware/authMiddleware");

router.get(
  "/stats",
  authMiddleware,
  async (req, res) => {
    try {
      const totalStudents =
        await Student.countDocuments();

      const totalTeachers =
        await Teacher.countDocuments();

      const attendanceRecords =
        await Attendance.find();

      const presentCount =
        attendanceRecords.filter(
          (record) =>
            record.status === "Present"
        ).length;

      const attendancePercentage =
        attendanceRecords.length > 0
          ? Math.round(
              (presentCount /
                attendanceRecords.length) *
                100
            )
          : 0;

      const fees =
        await Fee.find();

      const totalCollected =
        fees.reduce(
          (total, fee) =>
            total +
            (fee.paidAmount || 0),
          0
        );

      res.status(200).json({
        success: true,

        totalStudents,

        totalTeachers,

        attendancePercentage,

        totalCollected,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;