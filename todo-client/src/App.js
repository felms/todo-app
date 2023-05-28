import './App.css';
import React, { useState, useEffect } from 'react';

import TaskForm from './components/taskForm';
import AddTaskForm from './components/addTaskForm';

const App = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const getTasks = async () => {
      const tasksFromServer = await fetchAll();
      setTasks(tasksFromServer);
    };

    getTasks();

  }, []);

  // --- Pega todas as tarefas do banco
  const fetchAll = async () => {
    const res = await fetch("http://localhost:8080/api/tasks");
    const data = await res.json();
    return data;
  };

  // --- Atualiza uma tarefa
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

  // --- Adiciona uma tarefa
  const addTask = async (task) => {

    if (task.description && task.dueDate) {
      // Update no banco
      const res = await fetch(
        `http://localhost:8080/api/tasks`, 
        { 
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        }
        );

      const resData = await res.json();

      // Update no front
      const tasksFromServer = await fetchAll();
      setTasks(tasksFromServer);

    }

    // Altera a visibilidade dos formulários
    toggleVisible();

  };

  // --- Altera a visibilidade dos formulários
  const toggleVisible = () => {
    const tasksdiv = document.getElementById('task-list');
    if (tasksdiv.classList.contains("not-visible") ){
      tasksdiv.classList.remove("not-visible");
    } else {
      tasksdiv.classList.add("not-visible");
    }

    const addtasksdiv = document.getElementById('task-inputs');
    if (addtasksdiv.classList.contains("not-visible")) {
      addtasksdiv.classList.remove("not-visible");
    } else {
      addtasksdiv.classList.add("not-visible");
    }
  };

  // --- "Monta" a página
  return (
    <div className='outter-container'>
      <div id='task-list' className='tasks-container'>
        <TaskForm
          allTasks={tasks}
          updateTask={updateTask}
          toggleVisible={toggleVisible}
        />
      </div>
      <div id='task-inputs' className='task-form-container  not-visible'>
        <AddTaskForm
        addTask={addTask}
        /> 
      </div>
    </div>
  );
};

export default App;
