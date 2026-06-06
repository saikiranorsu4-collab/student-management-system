const mongoose =
  require("mongoose");

const feeSchema =
  new mongoose.Schema(

    {

      // ==========================
      // STUDENT REFERENCE
      // ==========================

      studentId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Student",

        required: true,

      },

      // ==========================
      // TOTAL FEE
      // ==========================

      totalAmount: {

        type: Number,

        required: true,

      },

      // ==========================
      // PAID AMOUNT
      // ==========================

      paidAmount: {

        type: Number,

        default: 0,

      },

      // ==========================
      // REMAINING AMOUNT
      // ==========================

      remainingAmount: {

        type: Number,

        required: true,

      },

      // ==========================
      // DUE DATE
      // ==========================

      dueDate: {

        type: Date,

        required: true,

      },

      // ==========================
      // STATUS
      // ==========================

      status: {

        type: String,

        enum: [

          "Pending",

          "Partially Paid",

          "Paid",

        ],

        default:
          "Pending",

      },

    },

    {

      timestamps: true,

    }

  );

module.exports =
  mongoose.model(
    "Fee",
    feeSchema
  );