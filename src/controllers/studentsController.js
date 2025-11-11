import { updateStudent, insertStudent, getAllStudents, getStudentById} from "../models/studentModel.js";

export const fetchAllStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

export const fetchStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await getStudentById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error: error.message,
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, roll_no, fees, class: studentClass, medium } = req.body;

    if (!name || !roll_no || !fees || !studentClass || !medium) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, roll_no, fees, class, medium) are required",
      });
    }

     const newStudent = await insertStudent(name, roll_no, fees, studentClass, medium);

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: newStudent,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};

export const updateStudentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roll_no, fees, class: studentClass, medium } = req.body;

    if (!id || !name || !roll_no || !fees || !studentClass || !medium) {
      return res.status(400).json({
        success: false,
        message: "All fields (id, name, roll_no, fees, class, medium) are required",
      });
    }

    const result = await updateStudent(id, name, roll_no, fees, studentClass, medium);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found or no changes made",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update student",
      error: error.message,
    });
  }
};

