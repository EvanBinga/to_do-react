import React from 'react';
import { animateTaskTransition } from '../utils/AnimationUtils';

function TaskList({ tasks, onToggleComplete }) {
  const activeTasks = tasks.filter(task => !task.completed);

  const handleToggle = (id, completed) => {
    animateTaskTransition(id, completed);
    setTimeout(() => {
      onToggleComplete(id, completed);
    }, 300);
  };

  return (
    <div className="task-list">
      <h2>Активные задачи</h2>
      {activeTasks.length === 0 ? (
        <p>Нет активных задач. Добавьте новую задачу!</p>
      ) : (
        <ul>
          {activeTasks.map((task) => (
            <li 
              key={task.id} 
              className="task-item"
              data-task-id={task.id}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id, true)}
              />
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;