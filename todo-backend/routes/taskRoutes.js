const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Create Task
router.post('/', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { title, description, dueDate, status } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      status,
      userId: req.session.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
});

// Get All Tasks
router.get('/', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const tasks = await Task.find({ userId: req.session.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Update Task
router.put('/:id', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.session.userId },
      { title, description, dueDate, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// Delete Task
router.delete('/:id', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.session.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;
