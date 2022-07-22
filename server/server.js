const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const User = require('./schemes/User');
const app = express();
const cors = require('cors');
const userController = require('./controllers/userController');
const tasksController = require('./controllers/tasksController');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(express.json(), cors(corsOptions));

const start = async () => {
  try {
    await mongoose.connect(env.parsed.DB_URL);

    console.log('db connected');
  } catch (err) {
    console.error('error!!!', err.message);
  }
};

app.listen(env.parsed.PORT, () => {
  start();
  console.log('serv run');
});

app.post('/register-user', userController.registerUser);
app.post('/login-user', userController.loginUser);
app.get('/user-tasks', tasksController.getTasks);
app.post('/create-task', tasksController.createTask);
app.delete('/delete-task', tasksController.deleteTask);
app.patch('/edit-task', tasksController.editTask);
