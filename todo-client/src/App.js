import './App.css';
import React, { useState, useEffect } from 'react';

import TaskForm from './components/taskForm';

const App = () => {

  return (
    <div className='tasks-container'>
      <TaskForm/>
    </div>
  );
};

export default App;
