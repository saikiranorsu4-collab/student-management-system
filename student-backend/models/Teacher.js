const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    // ==========================
    // USER ACCOUNT LINK
    // ==========================

    userId: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      default: null,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Inactive",
      ],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Teacher",
  teacherSchema
);