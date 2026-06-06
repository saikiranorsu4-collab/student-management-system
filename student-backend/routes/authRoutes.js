const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


const authMiddleware =
  require("../middleware/authMiddleware");


const router = express.Router();

// =======================================
// REGISTER
// =======================================

router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role,
      } = req.body;

      // VALIDATION

      if (
        !name ||
        !email ||
        !password
      ) {

        return res.status(400).json({

          message:
            "Please fill all fields",

        });

      }

      // CHECK USER EXISTS

      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {

        return res.status(400).json({

          message:
            "User already exists",

        });

      }

      // HASH PASSWORD

      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      // CREATE USER

      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          role:
            role || "student",

        });

      // CREATE TOKEN

      const token =
        jwt.sign(

          {

            id:
              user._id,

            role:
              user.role,

            email:
              user.email,

          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }

        );

      // RESPONSE

      res.status(201).json({

        token,

        user: {

          id:
            user._id,

          name:
            user.name,

          email:
            user.email,

          role:
            user.role,

        },

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
// LOGIN
// =======================================

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // VALIDATION

      if (
        !email ||
        !password
      ) {

        return res.status(400).json({

          message:
            "Please enter email and password",

        });

      }

      // FIND USER

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400).json({

          message:
            "Invalid credentials",

        });

      }

      // CHECK PASSWORD

      const isMatch =
        await bcrypt.compare(

          password,

          user.password

        );

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Invalid credentials",

        });

      }

      // DEBUG LOGS

      console.log("==============");
      console.log("LOGIN SUCCESS");
      console.log("NAME:", user.name);
      console.log("EMAIL:", user.email);
      console.log("ROLE:", user.role);
      console.log("==============");

      // CREATE TOKEN

      const token =
        jwt.sign(

          {

            id:
              user._id,

            role:
              user.role,

            email:
              user.email,

          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }

        );

      // RESPONSE

      res.status(200).json({

        token,

        user: {

          id:
            user._id,

          name:
            user.name,

          email:
            user.email,

          role:
            user.role,

        },

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
// CHANGE PASSWORD
// =======================================

router.put(
  "/change-password",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        currentPassword,
        newPassword,
      } = req.body;

      if (
        !currentPassword ||
        !newPassword
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "All fields are required",
          });
      }

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "User not found",
          });
      }

      const isMatch =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!isMatch) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Current password is incorrect",
          });
      }

      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          salt
        );

      user.password =
        hashedPassword;

      await user.save();

      return res
        .status(200)
        .json({
          success: true,
          message:
            "Password changed successfully",
        });

    } catch (error) {

      console.log(error);

      return res
        .status(500)
        .json({
          success: false,
          message:
            error.message,
        });

    }

  }
);

module.exports = router;