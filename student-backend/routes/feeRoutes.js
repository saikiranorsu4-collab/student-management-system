const express = require("express");

const router = express.Router();

const Fee = require("../models/Fee");

const Student = require("../models/Student");

const authMiddleware =
  require("../middleware/authMiddleware");

// =====================================
// GET ALL FEES
// ADMIN ONLY
// =====================================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      if (
        req.user.role !== "admin"
      ) {

        return res.status(403).json({
          success: false,
          message: "Admin only",
        });

      }

      const fees =
        await Fee.find()
          .populate(
            "studentId",
            "name rollNumber email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        fees,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }
);

// =====================================
// GET STUDENT FEES
// =====================================

router.get(
  "/student/:studentId",
  authMiddleware,
  async (req, res) => {

    try {

      const fees =
        await Fee.find({
          studentId:
            req.params.studentId,
        })
          .populate(
            "studentId",
            "name rollNumber email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        fees,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }
);

// =====================================
// GET MY FEES
// =====================================

router.get(
  "/my-fees",
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

      const fees =
        await Fee.find({
          studentId:
            student._id,
        })
          .populate(
            "studentId",
            "name rollNumber email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        fees,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  }
);

// =====================================
// CREATE FEE
// ADMIN ONLY
// =====================================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      if (
        req.user.role !== "admin"
      ) {

        return res.status(403).json({
          success: false,
          message: "Admin only",
        });

      }

      const {
        studentId,
        totalAmount,
        paidAmount,
        dueDate,
      } = req.body;

      const total =
        Number(totalAmount);

      const paid =
        Number(
          paidAmount || 0
        );

      const remainingAmount =
        total - paid;

      let status =
        "Pending";

      if (
        remainingAmount <= 0
      ) {

        status = "Paid";

      }
      else if (
        paid > 0
      ) {

        status =
          "Partially Paid";

      }

      const fee =
        await Fee.create({

          studentId,

          totalAmount:
            total,

          paidAmount:
            paid,

          remainingAmount,

          dueDate,

          status,

        });

      res.status(201).json({

        success: true,

        fee,

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

// =====================================
// COLLECT PAYMENT
// ADMIN ONLY
// =====================================

router.put(
  "/pay/:id",
  authMiddleware,
  async (req, res) => {

    try {

      if (
        req.user.role !== "admin"
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Admin only",

        });

      }

      const fee =
        await Fee.findById(
          req.params.id
        );

      if (!fee) {

        return res.status(404).json({

          success: false,

          message:
            "Fee not found",

        });

      }

      const paymentAmount =
        Number(
          req.body.amount
        );

      if (
        paymentAmount <= 0
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid payment amount",

        });

      }

      fee.paidAmount +=
        paymentAmount;

      fee.remainingAmount =
        fee.totalAmount -
        fee.paidAmount;

      if (
        fee.remainingAmount <= 0
      ) {

        fee.status = "Paid";

        fee.remainingAmount = 0;

      }
      else {

        fee.status =
          "Partially Paid";

      }

      await fee.save();

      res.status(200).json({

        success: true,

        fee,

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

// =====================================
// UPDATE FEE
// ADMIN ONLY
// =====================================

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
            "Admin only",

        });

      }

      const fee =
        await Fee.findById(
          req.params.id
        );

      if (!fee) {

        return res.status(404).json({

          success: false,

          message:
            "Fee not found",

        });

      }

      const totalAmount =
        req.body.totalAmount ??
        fee.totalAmount;

      const paidAmount =
        req.body.paidAmount ??
        fee.paidAmount;

      const remainingAmount =
        totalAmount -
        paidAmount;

      let status =
        "Pending";

      if (
        remainingAmount <= 0
      ) {

        status = "Paid";

      }
      else if (
        paidAmount > 0
      ) {

        status =
          "Partially Paid";

      }

      const updatedFee =
        await Fee.findByIdAndUpdate(

          req.params.id,

          {

            ...req.body,

            totalAmount,

            paidAmount,

            remainingAmount,

            status,

          },

          {

            new: true,

            runValidators: true,

          }

        );

      res.status(200).json({

        success: true,

        fee:
          updatedFee,

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

// =====================================
// DELETE FEE
// ADMIN ONLY
// =====================================

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
            "Admin only",

        });

      }

      await Fee.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "Fee deleted successfully",

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