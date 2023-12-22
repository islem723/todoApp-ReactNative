import express from "express";
import {
  createTask,
  getAllTasksOfUser,
  UpdateTaskStatus,
  getAllTaskByCategory,
  getAllCompletedTasks,
  getTasksByDateAndUserID,
  editTask,
  deletetask,
} from "../Controllers/taskC";

const taskRoutes = express.Router();
taskRoutes.route("/completed").get(getAllCompletedTasks); // *
taskRoutes.route("/today").get(getTasksByDateAndUserID);
taskRoutes.route("/create").post(createTask); // *
taskRoutes.route("/edit/:id").put(editTask); // *
taskRoutes.route("/alltasksBycategory/:id").get(getAllTaskByCategory);
taskRoutes.route("/alltasks").get(getAllTasksOfUser); // *
taskRoutes.route("/deletetask/:id").delete(deletetask);
taskRoutes.route("/update-status/:id").put(UpdateTaskStatus);
export default taskRoutes;
