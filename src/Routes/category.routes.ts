import express from "express";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  upateCategory,
} from "../Controllers/categoryC";

const categoryRoutes = express.Router();

categoryRoutes.route("/create").post(createCategory);
categoryRoutes.route("/").get(getAllCategories);
categoryRoutes.route("/delete/:id").post(deleteCategory);

categoryRoutes.route("/update").put(upateCategory);
export default categoryRoutes;
