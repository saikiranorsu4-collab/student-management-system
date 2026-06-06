const express =
  require("express");

const router =
  express.Router();

const {
  generateReceipt,
} = require(
  "../controllers/receiptController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

router.get(
  "/:id",
  authMiddleware,
  generateReceipt
);

module.exports =
  router;