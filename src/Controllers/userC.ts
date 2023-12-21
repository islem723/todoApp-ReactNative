import { UserModel } from "../Models";

import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HASH_ROUNDS, JWT_EXPIRATION, JWT_SECRET } from "../config/env";
import IUser from "../types";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password }: IUser = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(400).send({ error: "Email already used" });
    }
    const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);
    const created = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!created) {
      return res.status(400).send({ error: "Could not create user" });
    }
    res.status(201).send({ message: "UserModel created successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.toString() });
  }
}

//login

export async function login(req: Request, res: Response) {
  const { email, password }: IUser = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).send("Invalid email ");
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(404).send("Invalid  password");
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  res.status(200).send({ token: token, user: user });
}
