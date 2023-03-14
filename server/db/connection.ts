import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME!,
  process.env.PROJECT_DB_USERNAME!,
  process.env.PROJECT_DB_PASSWORD!,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default db;
