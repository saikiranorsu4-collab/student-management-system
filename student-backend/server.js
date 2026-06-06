require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES

const authRoutes =
  require("./routes/authRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

const studentRoutes =
  require("./routes/studentRoutes");

const teacherRoutes =
  require("./routes/teacherRoutes");

const attendanceRoutes =
  require("./routes/attendanceRoutes");

const feeRoutes =
  require("./routes/feeRoutes");

const paymentRoutes =
  require("./routes/paymentRoutes");

const receiptRoutes =
  require("./routes/receiptRoutes");

const app = express();

// ====================================
// MIDDLEWARE
// ====================================

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// IMPORTANT FOR PROFILE IMAGE UPLOADS

app.use(
  express.json({
    limit: "20mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "20mb",
  })
);

// ====================================
// HEALTH CHECK
// ====================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Student Management API Running Successfully",
  });
});

// ====================================
// API ROUTES
// ====================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/students",
  studentRoutes
);

app.use(
  "/api/teachers",
  teacherRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/fees",
  feeRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/receipts",
  receiptRoutes
);

// ====================================
// 404 HANDLER
// ====================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      "Route not found",
  });
});

// ====================================
// GLOBAL ERROR HANDLER
// ====================================

app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    console.log(err);

    if (
      err.type ===
      "entity.too.large"
    ) {
      return res.status(413).json({
        success: false,
        message:
          "Uploaded image is too large. Please upload an image below 5MB.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error",
    });
  }
);

// ====================================
// DATABASE CONNECTION
// ====================================

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log(
      "✅ MongoDB Connected"
    );

    const PORT =
      process.env.PORT ||
      5000;

    app.listen(
      PORT,
      () => {
        console.log(
          `🚀 Server running on port ${PORT}`
        );
      }
    );
  })
  .catch((error) => {
    console.error(
      "❌ MongoDB Connection Error:",
      error.message
    );
  });