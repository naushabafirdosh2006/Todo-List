import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/background-todo.png'; // Adjust the path as per your project structure

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <div style={{ ...styles.wrapper, backgroundImage: `url(${backgroundImage})` }}>
      <div style={styles.container}>
        <h1 style={styles.title}>To-Do List</h1>
        <div style={styles.taskCounter}>
          <p>You have {tasks.filter(task => !task.completed).length} active task(s)</p>
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={handleInputChange}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addButton}>Add</button>
        </div>
        <ul style={styles.list}>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                ...styles.task,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'gray' : 'black',
                transform: task.completed ? 'scale(0.95)' : 'scale(1)',
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={() => toggleTaskCompletion(index)}
            >
              <img src="https://via.placeholder.com/20" alt="icon" style={styles.taskImage} />
              {task.text}
              <button onClick={() => removeTask(index)} style={styles.removeButton}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button onClick={clearAllTasks} style={styles.clearButton}>Clear All</button>
      </div>
    </div>
  );
};

// Enhanced styles with the new background image
const styles = {
  wrapper: {
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  container: {
    width: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    marginBottom: '10px',
    color: '#333',
  },
  taskCounter: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#666',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    flexGrow: 1,
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  task: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  taskImage: {
    marginRight: '10px',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  clearButton: {
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
};

export default TodoList;
