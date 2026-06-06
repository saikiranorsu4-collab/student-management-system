const crypto = require("crypto");

const razorpay =
  require("../config/razorpay");

const Fee =
  require("../models/Fee");

const Payment =
  require("../models/Payment");

const Student =
  require("../models/Student");

// ====================================
// CREATE ORDER
// ====================================

const createOrder =
  async (req, res) => {

    try {

      const {
        feeId,
        amount,
      } = req.body;

      if (
        !feeId ||
        !amount
      ) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              "Fee ID and amount are required",
          });

      }

      const fee =
        await Fee.findById(
          feeId
        );

      if (!fee) {

        return res
          .status(404)
          .json({
            success: false,
            message:
              "Fee record not found",
          });

      }
       
      if (!razorpay) {
  return res.status(500).json({
    success: false,
    message:
      "Razorpay not configured",
  });
}




      const order =
        await razorpay.orders.create({
          amount:
            Number(amount) * 100,
          currency: "INR",
          receipt:
            `fee_${Date.now()}`,
        });

      await Payment.create({

        studentId:
          fee.studentId,

        feeId:
          fee._id,

        amount,

        razorpayOrderId:
          order.id,

        status:
          "Pending",

      });

     return res
  .status(200)
  .json({
    success: true,

    key:
      process.env
        .RAZORPAY_KEY_ID,

    order,
  });
    } catch (error) {

      console.log(
        "CREATE ORDER ERROR:",
        error
      );

      return res
        .status(500)
        .json({

          success: false,

          message:
            "Order creation failed",

        });

    }

  };

// ====================================
// VERIFY PAYMENT
// ====================================

const verifyPayment =
  async (req, res) => {

    try {

      const {

        feeId,

        amount,

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,

      } = req.body;

      const generatedSignature =
        crypto

          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )

          .update(
            `${razorpay_order_id}|${razorpay_payment_id}`
          )

          .digest("hex");

      if (
        generatedSignature !==
        razorpay_signature
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "Payment verification failed",

          });

      }

      const fee =
        await Fee.findById(
          feeId
        );

      if (!fee) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              "Fee not found",

          });

      }

      fee.paidAmount +=
        Number(amount);

      fee.remainingAmount =
        fee.totalAmount -
        fee.paidAmount;

      if (
        fee.remainingAmount <= 0
      ) {

        fee.status =
          "Paid";

        fee.remainingAmount =
          0;

      } else {

        fee.status =
          "Partially Paid";

      }

      await fee.save();

      await Payment.findOneAndUpdate(

        {
          razorpayOrderId:
            razorpay_order_id,
        },

        {

          razorpayPaymentId:
            razorpay_payment_id,

          razorpaySignature:
            razorpay_signature,

          status:
            "Paid",

        }

      );

      return res
        .status(200)
        .json({

          success: true,

          message:
            "Payment verified successfully",

        });

    } catch (error) {

      console.log(
        "VERIFY PAYMENT ERROR:",
        error
      );

      return res
        .status(500)
        .json({

          success: false,

          message:
            "Verification failed",

        });

    }

  };

// ====================================
// PAYMENT HISTORY
// ====================================

const getPaymentHistory =
  async (req, res) => {

    try {

      const student =
        await Student.findOne({

          userId:
            req.user.id,

        });

      if (!student) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              "Student not found",

          });

      }

      const payments =
        await Payment.find({

          studentId:
            student._id,

          status:
            "Paid",

        })

          .populate(
            "studentId",
            "name email rollNumber"
          )

          .populate(
            "feeId"
          )

          .sort({
            createdAt: -1,
          });

      return res
        .status(200)
        .json({

          success: true,

          payments,

        });

    } catch (error) {

      console.log(
        "PAYMENT HISTORY ERROR:",
        error
      );

      return res
        .status(500)
        .json({

          success: false,

          message:
            "Failed to fetch payment history",

        });

    }

  };

// ====================================
// DOWNLOAD RECEIPT
// ====================================

const downloadReceipt =
  async (req, res) => {

    try {

      const {
        paymentId,
      } = req.params;

      const payment =
        await Payment.findById(
          paymentId
        )

          .populate(
            "studentId",
            "name email rollNumber"
          )

          .populate(
            "feeId"
          );

      if (!payment) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              "Payment not found",

          });

      }

      return res
        .status(200)
        .json({

          success: true,

          receipt: {

            receiptNumber:
              `RCPT-${payment._id}`,

            studentName:
              payment.studentId?.name,

            rollNumber:
              payment.studentId?.rollNumber,

            email:
              payment.studentId?.email,

            amount:
              payment.amount,

            paymentId:
              payment.razorpayPaymentId,

            orderId:
              payment.razorpayOrderId,

            status:
              payment.status,

            paidOn:
              payment.createdAt,

          },

        });

    } catch (error) {

      console.log(
        "DOWNLOAD RECEIPT ERROR:",
        error
      );

      return res
        .status(500)
        .json({

          success: false,

          message:
            "Failed to fetch receipt",

        });

    }

  };

// ====================================
// EXPORTS
// ====================================

module.exports = {

  createOrder,

  verifyPayment,

  getPaymentHistory,

  downloadReceipt,

};