import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((err) => console.log(`Erro: ${err.message}`));
  }, []);

  return (
    <div className='tasks-container'>
      {
        tasks.map(task => JSON.stringify(task))
      }
    </div>
  );
};

export default App;
