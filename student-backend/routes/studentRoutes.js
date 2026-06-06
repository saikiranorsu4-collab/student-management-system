const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const Student =
  require("../models/Student");

const User =
  require("../models/User");

const authMiddleware =
  require("../middleware/authMiddleware");


// =======================================
// GET LOGGED-IN STUDENT PROFILE
// =======================================

router.get(
  "/profile/me",
  authMiddleware,
  async (req, res) => {
    try {

      const student =
        await Student.findOne({
          userId:
            req.user.id,
        });

      if (!student) {
        return res.status(404).json({
          success: false,
          message:
            "Student profile not found",
        });
      }

      res.status(200).json({
        success: true,
        student,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  }
);

// =======================================
// UPDATE LOGGED-IN STUDENT PROFILE
// =======================================

router.put(
  "/profile/update",
  authMiddleware,
  async (req, res) => {

    try {

      const student =
        await Student.findOne({
          userId: req.user.id,
        });

      if (!student) {

        return res.status(404).json({
          success: false,
          message:
            "Student profile not found",
        });

      }

      const {
        name,
        phone,
        address,
        profileImage,
      } = req.body;

      // ==========================
      // UPDATE FIELDS
      // ==========================

      if (name !== undefined) {
        student.name = name;
      }

      if (phone !== undefined) {
        student.phone = phone;
      }

      if (address !== undefined) {
        student.address = address;
      }

      // IMPORTANT:
      // allows image upload AND image removal

      if (
        profileImage !== undefined
      ) {
        student.profileImage =
          profileImage;
      }

      await student.save();

      // ==========================
      // UPDATE USER TABLE
      // ==========================

      await User.findByIdAndUpdate(
        req.user.id,
        {
          name: student.name,
        }
      );

      // ==========================
      // RESPONSE
      // ==========================

      res.status(200).json({

        success: true,

        message:
          "Profile updated successfully",

        student,

      });

    } catch (error) {

      console.log(
        "PROFILE UPDATE ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

// =======================================
// GET ALL STUDENTS
// =======================================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const students =
        await Student.find()
          .populate(
            "userId",
            "name email role"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        students
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);


// =======================================
// GET SINGLE STUDENT
// =======================================

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const student =
        await Student.findById(
          req.params.id
        ).populate(
          "userId",
          "name email role"
        );

      if (!student) {

        return res.status(404).json({
          success: false,
          message:
            "Student not found",
        });

      }

      res.status(200).json(
        student
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);


// =======================================
// ADD STUDENT
// =======================================

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
            "Access denied. Admin only.",
        });

      }

      const {

        rollNumber,
        name,
        email,
        phone,
        course,
        department,
        year,
        section,
        age,
        gender,
        parentName,
        parentPhone,
        address,
        status,

      } = req.body;

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            "User already exists",
        });

      }

      const defaultPassword =
        "student123";

      const hashedPassword =
        await bcrypt.hash(
          defaultPassword,
          10
        );

      const user =
        await User.create({

          name,
          email,

          password:
            hashedPassword,

          role:
            "student",

        });

      const student =
        await Student.create({

          userId:
            user._id,

          rollNumber,

          name,

          email,

          phone,

          course,

          department,

          year,

          section,

          age,

          gender,

          parentName,

          parentPhone,

          address,

          status,

          profileImage: "",

        });

      res.status(201).json({

        success: true,

        message:
          "Student created successfully",

        loginCredentials: {

          email,

          password:
            defaultPassword,

        },

        student,

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


// =======================================
// UPDATE STUDENT
// =======================================

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      if (
        req.user.role !== "admin"
      ) {

        return res.status(403).json({
          success: false,
          message:
            "Access denied. Admin only.",
        });

      }

      const updatedStudent =
        await Student.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedStudent) {

        return res.status(404).json({
          success: false,
          message:
            "Student not found",
        });

      }

      if (
        updatedStudent.userId
      ) {

        await User.findByIdAndUpdate(
          updatedStudent.userId,
          {
            name:
              updatedStudent.name,
            email:
              updatedStudent.email,
          }
        );

      }

      res.status(200).json({
        success: true,
        student:
          updatedStudent,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  }
);

// =======================================
// DELETE STUDENT
// =======================================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      if (
        req.user.role !== "admin"
      ) {

        return res.status(403).json({
          success: false,
          message:
            "Access denied. Admin only.",
        });

      }

      const student =
        await Student.findById(
          req.params.id
        );

      if (!student) {

        return res.status(404).json({
          success: false,
          message:
            "Student not found",
        });

      }

      if (
        student.userId
      ) {

        await User.findByIdAndDelete(
          student.userId
        );

      }

      await Student.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Student deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  }
);

module.exports = router;