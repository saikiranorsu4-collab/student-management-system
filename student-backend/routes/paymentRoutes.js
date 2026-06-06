const express = require("express");

const router =
  express.Router();

const {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  downloadReceipt,
} = require(
  "../controllers/paymentController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

// ====================================
// CREATE ORDER
// ====================================

router.post(
  "/create-order",
  authMiddleware,
  createOrder
);

// ====================================
// VERIFY PAYMENT
// ====================================

router.post(
  "/verify-payment",
  authMiddleware,
  verifyPayment
);

// ====================================
// PAYMENT HISTORY
// ====================================

router.get(
  "/history",
  authMiddleware,
  getPaymentHistory
);

// ====================================
// DOWNLOAD RECEIPT
// ====================================

router.get(
  "/receipt/:paymentId",
  authMiddleware,
  downloadReceipt
);

module.exports =
  router;