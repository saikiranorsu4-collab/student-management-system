const mongoose =
  require("mongoose");

const paymentSchema =
  new mongoose.Schema(
    {
      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },

      feeId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Fee",
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      razorpayOrderId: {
        type: String,
        required: true,
      },

      razorpayPaymentId: {
        type: String,
      },

      razorpaySignature: {
        type: String,
      },

      status: {
        type: String,

        enum: [
          "Pending",
          "Paid",
          "Failed",
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
    "Payment",
    paymentSchema
  );