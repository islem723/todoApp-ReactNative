import express from "express";
import { createTask, getAllTasks } from "../Controllers/taskc";

const taskRoutes = express.Router();

taskRoutes.route("/create").post(createTask);
taskRoutes.route("/alltasks").get(getAllTasks);
