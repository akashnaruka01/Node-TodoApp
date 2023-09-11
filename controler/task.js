import { Task } from "../models/task.js";
import errorHandler from "./middlewares/error.js";

export const newtask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "task added succesfully",
      title,
      description,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const userid = await req.user._id;

    const task = await Task.find({ user: userid });
    if (!task)
      return next(new errorHandler("not task exit for this side", 404)); // here Error is a class.

    res.json({
      success: "true",
      message: `task of ${req.user.name} are succesfully fetched`,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {

  try {
    const task = await Task.findById(req.params.id);

  if (!task) return next(new errorHandler("Task Is Not Found.......", 404)); // here Error is a class.

  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: true,
    message: "task updated succesfully",
  });
  } catch (error) {
    next(error);
  }
  
};

export const deleteTask = async (req, res, next) => {

  try {
    const task = await Task.findById(req.params.id);

  if (!task) return next(new errorHandler("Task Is Not Found.......", 404)); // here Error is a class.

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "task deleted succesfully",
  });
  } catch (error) {
    next(error);
  }
  
};
