const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let nextId = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Необходимо указать название задачи' });
  }
  
  const newTask = {
    id: nextId++,
    title,
    completed: false
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { completed } = req.body;
  
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Задача не найдена' });
  }
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    completed: completed !== undefined ? completed : tasks[taskIndex].completed
  };
  
  res.json(tasks[taskIndex]);
});

app.delete('/tasks', (req, res) => {
  tasks = [];
  res.status(200).json({ message: 'Все задачи удалены' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});