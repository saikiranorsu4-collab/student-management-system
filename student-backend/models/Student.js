const mongoose = require("mongoose");

const studentSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      rollNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        default: "",
      },

      profileImage: {
        type: String,
        trim: true,
        default: "",
      },

      course: {
        type: String,
        default: "",
      },

      department: {
        type: String,
        default: "",
      },

      year: {
        type: String,
        default: "",
      },

      section: {
        type: String,
        default: "",
      },

      age: {
        type: Number,
      },

      gender: {
        type: String,
        enum: [
          "Male",
          "Female",
          "Other",
        ],
      },

      parentName: {
        type: String,
        default: "",
      },

      parentPhone: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
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

module.exports =
  mongoose.model(
    "Student",
    studentSchema
  );