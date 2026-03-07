import Task from "../models/Task.js";

export const createTask = async (req, res) => {

  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    owner: req.user._id
  });

  res.status(201).json(task);

};

export const getTasks = async (req, res) => {

  const tasks = await Task.find({
    owner: req.user._id
  });

  res.json(tasks);

};

export const deleteTask = async (req, res) => {

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not allowed" });
  }

  await task.deleteOne();

  res.json({ message: "Task deleted" });

};