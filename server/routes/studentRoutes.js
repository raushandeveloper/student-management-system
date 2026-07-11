const express = require("express");
const router = express.Router();

const {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

// GET all
router.get("/", getStudents);

// ✅ GET single (IMPORTANT for edit)
router.get("/:id", getStudentById);

// ADD
router.post("/", addStudent);

// UPDATE
router.put("/:id", updateStudent);

// DELETE
router.delete("/:id", deleteStudent);

module.exports = router;