import express from "express";
import { createUser, login } from "../Controllers/userC";

const userRoutes = express.Router();

userRoutes.route("/create").post(createUser);
userRoutes.route("/login").post(login);

export default userRoutes;
