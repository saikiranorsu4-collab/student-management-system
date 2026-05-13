const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const authMiddleware = require("../middleware/authMiddleware");



// GET ALL STUDENTS
router.get("/", authMiddleware, async (req, res) => {

  try {

    const students = await Student.find();

    res.status(200).json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



// ADD STUDENT
router.post("/", authMiddleware, async (req, res) => {

  try {

    const student = await Student.create(req.body);

    res.status(201).json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



// UPDATE STUDENT
router.put("/:id", authMiddleware, async (req, res) => {

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
router.delete("/:id", authMiddleware, async (req, res) => {

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

// UPDATE STUDENT
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const updatedStudent =
      await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedStudent);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;