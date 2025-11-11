import express from "express";
import { updateStudentController, createStudent, fetchAllStudents, fetchStudentById } from "../controllers/studentsController.js";
const router = express.Router();


router.get('/list', async (req,res) => {
  try{
   await fetchAllStudents(req,res);
  }
  catch {error}{
    console.error("Error in /students/list route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await fetchStudentById(req, res);
  } catch (error) {
    console.error("Error in /students/:id route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/create", async (req,res) => {
  try{
    await createStudent(req, res);
  }catch(error){
    console.error("Error in /students/create route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await updateStudentController(req, res);
  } catch (error) {
    console.error("Error in /students/update:id route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;