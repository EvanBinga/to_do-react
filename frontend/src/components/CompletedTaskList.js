import React from 'react';
import { animateTaskTransition } from '../utils/AnimationUtils';

function CompletedTaskList({ tasks, onToggleComplete }) {
  const completedTasks = tasks.filter(task => task.completed);

  const handleToggle = (id, completed) => {
    animateTaskTransition(id, completed);
    setTimeout(() => {
      onToggleComplete(id, completed);
    }, 300);
  };

  return (
    <div className="completed-task-list">
      <h2>Выполненные задачи</h2>
      {completedTasks.length === 0 ? (
        <p>Нет выполненных задач</p>
      ) : (
        <ul>
          {completedTasks.map((task) => (
            <li 
              key={task.id} 
              className="completed task-item"
              data-task-id={task.id}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id, false)}
              />
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompletedTaskList;