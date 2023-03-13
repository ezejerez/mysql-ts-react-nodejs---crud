import express, { Application } from "express";
import userRoutes from "../routes/user";
import cors from "cors";
import db from "../db/connection";

const app: Application = express();
const PORT = process.env.PORT;
const apiPaths = { users: "/api/users" };

function connectToPort() {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Use route paths from the api.
function useRoutes() {
  app.use(apiPaths.users, userRoutes);
}

function applyMiddlewares() {
  // Applying CORS
  app.use(cors());

  // Parse bodies from req
  app.use(express.json());

  // Use public folder
  app.use(express.static("public"));
}

// Access to DB
async function authDB() {
  try {
    await db.authenticate();

    console.log("Database connected");
  } catch (err: any) {
    throw new Error(err);
  }
}

export default function Server() {
  authDB();
  applyMiddlewares();
  useRoutes();
  connectToPort();
}
