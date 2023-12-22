import { Request, Response } from "express";
import { CategoryModel, TaskModel, UserModel } from "../Models";
import { ITask } from "../types";
import dayjs from "dayjs";
import { checkIfTowDaysAreTheSame } from "../Services/dayjs-service";

export async function getAllTasksOfUser(req: Request, res: Response) {
  return res.status(200).send(await TaskModel.find({ user: req.query.userId }));
}

export async function createTask(req: Request, res: Response) {
  try {
    const { idUser, idCat } = req.query;
    const { name, date, isEditable, isCompleted }: ITask = req.body;

    const user = await UserModel.findOne({ _id: idUser });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const category = await CategoryModel.findOne({ _id: idCat });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const task = await TaskModel.create({
      name,
      date: new Date(date),
      isEditable,
      isCompleted,
      user: user,
      category: category,
    });

    if (!task) {
      return res.status(400).json({ error: "Could not create task" });
    }

    res.status(201).send(task);
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}

export async function UpdateTaskStatus(req: Request, res: Response) {
  const { isCompleted } = req.body;
  const { id } = req.params;
  const task = await TaskModel.updateOne(
    { _id: id },
    {
      isCompleted,
    }
  );
  res.send(task);
}

export async function getAllTaskByCategory(req: Request, res: Response) {
  const { userId } = req.query;
  const { idCat } = req.params;
  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const category = await CategoryModel.findOne({ _id: idCat });

  if (!category) {
    return res.status(404).json({ error: "User not found" });
  }

  const tasks = await TaskModel.find({
    user: user,
    category: category,
  });
  res.send(tasks);
}

export async function getAllCompletedTasks(req: Request, res: Response) {
  const { userId } = req.query;
  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const tasks = await TaskModel.find({
    user: user,
    isCompleted: true,
  });
  res.send(tasks);
}

export async function getTasksForToday(req: Request, res: Response) {
  const { userId } = req.query;

  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const tasks = await TaskModel.find({
    user: user,
  });

  res.send(tasks.filter((t) => t.date == new Date()));
}

export async function deletetask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await TaskModel.deleteOne({
      _id: id,
    });
    res.send({ message: "Task deleted" });
  } catch (error) {
    console.log("error in deleteTask", error);
    res.send({ error: "Error while deleting task" });
  }
}

export async function editTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { categoryId, date, name }: ITask = req.body;

    await TaskModel.updateOne(
      { id },
      {
        $set: {
          name,
          categoryId,
          date,
        },
      }
    );
    res.send({ message: "Task updated successfully" });
  } catch (error) {
    console.log("error in editTask", error);
    res.send({ error: "error while updating the task" });
  }
}
export async function getTasksByDateAndUserID(req: Request, res: Response) {
  const { startAt } = req.body;
  try {
    const tasks = await TaskModel.find({
      createdAt: { $gte: new Date(startAt), $lt: new Date() },
    }).sort([["createdAt", "descending"]]);
    res.send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}
