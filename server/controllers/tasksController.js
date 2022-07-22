const Task = require('../schemes/Task');

const getTasks = async (req, res) => {
  const { userId } = req.query;

  const tasks = await Task.find({ userId: userId });
  res.status(200).send({
    success: true,
    data: tasks,
  });
};

const createTask = async (req, res) => {
  const { userId, title, description } = req.body;

  const task = await Task.create({
    userId: userId,
    title: title,
    description: description,
  });
  res.status(200).send({
    success: true,
  });
};

const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.body.taskId });

    const tasks = await Task.find({});
    res.status(200).send({
      success: true,
      data: tasks,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
};

const editTask = async (req, res) => {
  try {
    const { title, description, taskId } = req.body;
    const task = await Task.findOne({ _id: taskId });
    task.title = title;
    task.description = description;

    await task.save();
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
    });
  }
};

module.exports = {
  getTasks: getTasks,
  createTask: createTask,
  deleteTask: deleteTask,
  editTask: editTask,
};
