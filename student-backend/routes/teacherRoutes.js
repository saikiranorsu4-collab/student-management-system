const express = require("express");
const bcrypt = require("bcryptjs");

const Teacher =
  require("../models/Teacher");

const User =
  require("../models/User");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();

// =====================================
// GET ALL TEACHERS
// =====================================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const teachers =
        await Teacher.find()
          .populate(
            "userId",
            "name email role"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        teachers
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

// =====================================
// ADD TEACHER + CREATE LOGIN ACCOUNT
// =====================================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      if (
        req.user.role !==
        "admin"
      ) {

        return res.status(403).json({

          message:
            "Admin only",

        });

      }

      const {

        name,
        email,
        phone,
        subject,
        qualification,
        experience,
        status,

      } = req.body;

      // CHECK USER EXISTS

      const existingUser =
        await User.findOne({
          email,
        });

      if (
        existingUser
      ) {

        return res.status(400).json({

          message:
            "User already exists",

        });

      }

      // DEFAULT PASSWORD

      const defaultPassword =
        "teacher123";

      const hashedPassword =
        await bcrypt.hash(
          defaultPassword,
          10
        );

      // CREATE USER ACCOUNT

      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          role:
            "teacher",

        });

      // CREATE TEACHER

      const teacher =
        await Teacher.create({

          userId:
            user._id,

          name,

          email,

          phone,

          subject,

          qualification,

          experience:
            Number(
              experience
            ) || 0,

          status:
            status ||
            "Active",

        });

      res.status(201).json({

        success: true,

        message:
          "Teacher created successfully",

        loginCredentials: {

          email,

          password:
            defaultPassword,

        },

        teacher,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

// =====================================
// UPDATE TEACHER
// =====================================

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      if (
        req.user.role !==
        "admin"
      ) {

        return res.status(403).json({

          message:
            "Admin only",

        });

      }

      const teacher =
        await Teacher.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      if (!teacher) {

        return res.status(404).json({

          message:
            "Teacher not found",

        });

      }

      res.status(200).json(
        teacher
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }
);

// =====================================
// DELETE TEACHER + USER ACCOUNT
// =====================================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      if (
        req.user.role !==
        "admin"
      ) {

        return res.status(403).json({

          message:
            "Admin only",

        });

      }

      const teacher =
        await Teacher.findById(
          req.params.id
        );

      if (!teacher) {

        return res.status(404).json({

          message:
            "Teacher not found",

        });

      }

      if (
        teacher.userId
      ) {

        await User.findByIdAndDelete(
          teacher.userId
        );

      }

      await Teacher.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "Teacher and login account deleted successfully",

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