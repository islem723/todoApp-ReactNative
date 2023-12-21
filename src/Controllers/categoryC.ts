import { Request, Response } from "express";
import { UserModel, CategoryModel } from "../Models";
import { ICategory } from "../types";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find({});
    return res.send(categories);
  } catch (error) {
    console.log("Error in getAllCategories", error);
    res.status(500).send({ error: "Error in getAllCategories" });
  }
};

export const createCategory = async (request: Request, res: Response) => {
  try {
    const { color, icon, isEditable, name }: ICategory = request.body;
    const { userId } = request.query;

    const found = await UserModel.findOne({ _id: userId });

    if (!found) {
      return res.status(404).json({ error: "User not found" });
    }

    const category = await CategoryModel.create({
      color,
      icon,
      isEditable,
      name,
      user: found,
    });
    return res.send(category);
  } catch (error) {
    console.log("error in createCategory", error);
    res.status(500).send({ error: "Something went wrong" });
  }
};

export const deleteCategory = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await CategoryModel.deleteMany({ _id: id });
    response.send({ message: "Category deleted" });
  } catch (error) {
    console.log("error in deleteCategory", error);
    response.status(500).send({ error: "Something went wrong" });
  }
};

export const upateCategory = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { color, icon, isEditable, name }: ICategory = request.body;
    await CategoryModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name,
          color,
          icon,
          isEditable,
        },
      }
    );
    response.send({ message: "category updated successfully" });
  } catch (error) {
    console.log("error in updateCategory", error);
    response.status(500).send({ error: "error in updating the category" });
  }
};
