import { configDotenv } from 'dotenv';
import express from 'express';
import sequelize from './config/db.js';
import studentRoutes from "./routes/studentsRoutes.js";

configDotenv();
const app = express();

// Define the port (from environment variable or default 9000)
const PORT = process.env.PORT || 9000;

// Middleware (optional)
app.use(express.json());

// Example API route
app.use('/api/v1/students', studentRoutes);

// route
app.get('/', (req, res) => {
  res.send('Express server is running successfully!');
});

// DB connection
try {
  await sequelize.authenticate();
  console.log("Database connected successfully");
} catch (error) {
  console.error("Database connection failed:", error);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
