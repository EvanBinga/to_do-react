// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CompletedTaskList from './components/CompletedTaskList';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTasks();
    setTimeout(() => setIsLoading(false), 500);
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Ошибка при получении задач:', error);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, { completed });
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: response.data.completed } : task
      ));
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const clearAllTasks = async () => {
    try {
      await axios.delete(`${API_URL}/tasks`);
      setTasks([]);
    } catch (error) {
      console.error('Ошибка при очистке задач:', error);
    }
  };

  if (isLoading) {
    return <div className="App"></div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Список задач</h1>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={darkMode ? "Переключить на светлую тему" : "Переключить на темную тему"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>
      <main>
        <TaskForm onAddTask={addTask} />
        
        <div className="task-container">
          <TaskList tasks={tasks} onToggleComplete={toggleComplete} />
          <CompletedTaskList tasks={tasks} onToggleComplete={toggleComplete} />
        </div>
        
        <div className="task-stats">
          <p>
            Выполнено: {tasks.filter(task => task.completed).length} из {tasks.length}
          </p>
          {tasks.length > 0 && (
            <button className="clear-button" onClick={clearAllTasks}>
              Очистить все задачи
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;