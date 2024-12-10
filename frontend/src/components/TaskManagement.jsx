import { useState } from 'react';

function TaskManagement() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput.trim()]);
      setTaskInput('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, idx) => idx !== index));
  };

  return (
    <div className="task-list">
      <h2>Task Management</h2>
      <input
        type="text"
        placeholder="Add a new task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul id="tasks">
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManagement;