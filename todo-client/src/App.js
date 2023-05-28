import './App.css';
import React, { useState, useEffect } from 'react';

import TaskForm from './components/taskForm';

const App = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const getTasks = async () => {
      const tasksFromServer = await fetchAll();
      setTasks(tasksFromServer);
    };

    getTasks();

  }, []);

  // Pega todas as tarefas do banco
  const fetchAll = async () => {
    const res = await fetch("http://localhost:8080/api/tasks");
    const data = await res.json();
    return data;
  };

  // Atualiza uma tarefa
  const updateTask = async (id, data = {}) => {
    
    // Update no banco
    const res = await fetch(
      `http://localhost:8080/api/tasks/${id}`, 
      { 
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
      );

    const resData = await res.json();

    // Update no front
    const newTasks = tasks.reduce((acc, currTask) => {
      if (currTask.id == id) {
        acc.push(data);
      } else {
        acc.push(currTask);
      }
      return acc;
    }, []);
    setTasks(newTasks)

    // retorno
    return resData;

  };

  return (
    <div className='tasks-container'>
      <TaskForm
        allTasks={tasks}
        updateTask={updateTask}
      />
    </div>
  );
};

export default App;
