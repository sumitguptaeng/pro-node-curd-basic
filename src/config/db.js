import sequelize  from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();
const db = new sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: process.env.MYSQL_DIALECT,
        logging: false,

    }
);

db
  .authenticate()
  .then(() => console.log("Connected to MySQL database"))
  .catch((err) =>
    console.error("Error while connecting to MySQL database. Error:", err)
  );

export default db;