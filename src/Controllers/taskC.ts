import { Request, Response } from "express";
import { TaskModel, UserModel } from "../Models";
import { ITask } from "../types";

export async function getAllTasks(req: Request, res: Response) {
  return res.status(200).send(await TaskModel.find({ user: req.query.useId }));
}

export async function createTask(req: Request, res: Response) {
  const userId = req.query;
  const { name, date, categoryId, isEditable, isCompleted }: ITask = req.body;

  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const task = await TaskModel.create({
    name,
    date,
    isEditable,
    isCompleted,
    category: categoryId,
    user: user,
  });

  if (!task) {
    return res.status(400).json({ error: "Could not create task" });
  }

  res.send(task);
}
