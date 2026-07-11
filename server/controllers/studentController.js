const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/students.json");

// GET all
exports.getStudents = (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
  } catch {
    res.status(500).json({ message: "Error reading data" });
  }
};

// ✅ GET single (FIXED)
exports.getStudentById = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const students = JSON.parse(fs.readFileSync(filePath));
    const student = students.find(s => s.id === id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch {
    res.status(500).json({ message: "Error fetching student" });
  }
};

// ADD
exports.addStudent = (req, res) => {
  try {
    const students = JSON.parse(fs.readFileSync(filePath));

    const newStudent = {
      id: Date.now(),
      ...req.body
    };

    students.push(newStudent);

    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

    res.json(newStudent);
  } catch {
    res.status(500).json({ message: "Error adding student" });
  }
};

// UPDATE
exports.updateStudent = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    let students = JSON.parse(fs.readFileSync(filePath));

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    students[index] = {
      ...students[index],
      ...req.body
    };

    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

    res.json(students[index]);

  } catch {
    res.status(500).json({ message: "Error updating student" });
  }
};

// DELETE
exports.deleteStudent = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    let students = JSON.parse(fs.readFileSync(filePath));

    const newList = students.filter(s => s.id !== id);

    if (students.length === newList.length) {
      return res.status(404).json({ message: "Not found" });
    }

    fs.writeFileSync(filePath, JSON.stringify(newList, null, 2));

    res.json({ message: "Deleted" });

  } catch {
    res.status(500).json({ message: "Error deleting" });
  }
};