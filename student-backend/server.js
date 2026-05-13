const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


// IMPORT ROUTES
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((error) => {
  console.log(error);
});


// ROUTES
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});