const PDFDocument = require("pdfkit");

const Payment = require("../models/Payment");

const generateReceipt =
  async (req, res) => {

    try {

      const payment =
        await Payment.findById(
          req.params.id
        )

        .populate(
          "studentId"
        )

        .populate(
          "feeId"
        );

      if (!payment) {

        return res.status(404).json({

          success: false,

          message:
            "Payment not found",

        });

      }

      const doc =
        new PDFDocument();

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=receipt-${payment._id}.pdf`
      );

      doc.pipe(res);

      doc
        .fontSize(24)
        .text(
          "EduManage Receipt",
          {
            align: "center",
          }
        );

      doc.moveDown();

      doc
        .fontSize(14)
        .text(
          `Student : ${payment.studentId.name}`
        );

      doc.text(
        `Amount : ₹${payment.amount}`
      );

      doc.text(
        `Payment ID : ${payment.razorpayPaymentId}`
      );

      doc.text(
        `Order ID : ${payment.razorpayOrderId}`
      );

      doc.text(
        `Status : ${payment.status}`
      );

      doc.text(
        `Date : ${new Date(
          payment.createdAt
        ).toLocaleString()}`
      );

      doc.end();

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Receipt generation failed",

      });

    }

  };

module.exports = {
  generateReceipt,
};