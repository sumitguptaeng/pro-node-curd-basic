import sequelize from "../config/db.js";

export const getAllStudents = async () => {
  try {
    const [results] = await sequelize.query("SELECT * FROM students");
    return results;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// ✅ Get student by ID
export const getStudentById = async (id) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM students WHERE id = ?", {
      replacements: [id],
    });
    return results.length ? results[0] : null;
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    throw error;
  }
};


// Insert a new student
export const insertStudent = async (name, roll_no, fees, studentClass, medium) => {
  try {
    const query = `INSERT INTO students (name, roll_no, fees, class, medium)
      VALUES (:name, :roll_no, :fees, :studentClass, :medium)`;

    const [result] = await sequelize.query(query, {
      replacements: { name, roll_no, fees, studentClass, medium },
    });

    // For MySQL, insertId gives the new record’s ID
    return { id: result, name, roll_no, fees, class: studentClass, medium };

  } catch (error) {
    console.error("Error inserting student:", error);
    throw error;
  }
};


// Update student
export const updateStudent = async (id, name, roll_no, fees, studentClass, medium) => {
  try {
    const query = `UPDATE students SET name = :name,roll_no = :roll_no,fees = :fees,class = :studentClass,
          medium = :medium WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { id, name, roll_no, fees, studentClass, medium },
    });
    return result;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};
