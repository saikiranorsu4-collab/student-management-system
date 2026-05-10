const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

// CREATE STUDENT
router.post("/", async (req, res) => {
  try {

    const student = new Student(req.body);

    const savedStudent = await student.save();

    res.status(201).json(savedStudent);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

// GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {

    const students = await Student.find();

    res.status(200).json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

// UPDATE STUDENT
router.put("/:id", async (req, res) => {

  try {

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedStudent);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

// DELETE STUDENT
router.delete("/:id", async (req, res) => {

  try {

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

module.exports = router;