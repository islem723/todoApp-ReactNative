import categoryModel from "../Models/category-model";
import { UserModel } from "../Models";
import { ICategory } from "../types";

import { Response, Request } from "express";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryModel.find({});
    return res.send(categories);
  } catch (error) {
    console.log("error in getAllCategories", error);
    throw error;
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

    const category = await categoryModel.create({
      color,
      icon,
      isEditable,
      name,
      user: found,
    });
    return res.send(category);
  } catch (error) {
    console.log("error in createCategory", error);
    res.send({ error: "Something went wrong" });
    throw error;
  }
};

export const deleteCategory = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await categoryModel.deleteMany({ _id: id });
    response.send({ message: "Category deleted" });
  } catch (error) {
    console.log("error in deleteCategory", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};

export const upateCategory = async (request: Request, response: Response) => {
  try {
    const { _id, color, icon, isEditable, name }: ICategory = request.body;
    await categoryModel.updateOne(
      {
        _id,
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
    response.send({ error: "error in updating the category" });
    throw error;
  }
};
