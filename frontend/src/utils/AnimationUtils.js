
export const animateTaskTransition = (taskId, isCompleted) => {
    const taskElement = document.querySelector(`li[data-task-id="${taskId}"]`);
    
    if (taskElement) {
      taskElement.classList.add('fade-out');
      setTimeout(() => {
        taskElement.classList.remove('fade-out');
      }, 300);
    }
  };