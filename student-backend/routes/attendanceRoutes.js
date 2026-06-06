const express = require("express");

const router = express.Router();

const Attendance = require("../models/Attendance");

const authMiddleware =
  require("../middleware/authMiddleware");

// =====================================
// GET ALL ATTENDANCE
// ADMIN + TEACHER
// =====================================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      if (
        req.user.role !== "admin" &&
        req.user.role !== "teacher"
      ) {

        return res.status(403).json({
          message:
            "Access denied",
        });

      }

      const attendance =
        await Attendance.find()
          .populate(
            "studentId",
            "name email department"
          )
          .sort({
            createdAt: -1,
          });

      res.json(attendance);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

// =====================================
// GET STUDENT ATTENDANCE
// STUDENT
// =====================================

router.get(
  "/student/:studentId",
  authMiddleware,
  async (req, res) => {

    try {

      const records =
        await Attendance.find({

          studentId:
            req.params.studentId,

        })
          .populate(
            "studentId",
            "name email"
          )
          .sort({
            date: -1,
          });

      res.json(records);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

// =====================================
// TODAY ATTENDANCE
// =====================================

router.get(
  "/today",
  authMiddleware,
  async (req, res) => {

    try {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const records =
        await Attendance.find({
          date: today,
        });

      res.json(records);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

// =====================================
// SAVE ATTENDANCE
// ADMIN + TEACHER
// =====================================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      if (
        req.user.role !== "admin" &&
        req.user.role !== "teacher"
      ) {

        return res.status(403).json({
          message:
            "Only Admin or Teacher can mark attendance",
        });

      }

      const {
        studentId,
        status,
      } = req.body;

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const attendance =
        await Attendance.findOneAndUpdate(
          {
            studentId,
            date: today,
          },
          {
            studentId,
            status,
            date: today,
            markedBy:
              req.user.id,
          },
          {
            upsert: true,
            new: true,
          }
        );

      res.status(201).json(
        attendance
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

// =====================================
// ATTENDANCE STATS
// =====================================

router.get(
  "/stats",
  authMiddleware,
  async (req, res) => {

    try {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const records =
        await Attendance.find({
          date: today,
        });

      const present =
        records.filter(
          (item) =>
            item.status ===
            "Present"
        ).length;

      const absent =
        records.filter(
          (item) =>
            item.status ===
            "Absent"
        ).length;

      res.json({

        total:
          records.length,

        present,

        absent,

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

module.exports = router;