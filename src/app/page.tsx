'use client';

import React, { useState, useEffect } from 'react';
import './page.css';

const NotesApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskText, setTaskText] = useState('');

  const [tasks, setTasks] = useState(() => {
    // getting stored text
    const saved = localStorage.getItem("tasks");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTaskText(''); // Clear the text when closing
  };

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, taskText]);
      setTaskText('');
      setShowModal(false);
    } else {
      handleCloseModal()
      //if no text, close window instead
    }
  };

  useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]); // The effect re-runs when showModal changes

  return (
    <div>
      <h1>Evie stop procrastinating!!!!!!!!!!!</h1>
      <button className="general-button" onClick={handleOpenModal}>
        Add a New Task
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add a New Task</h3>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <textarea
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Start typing here..."
                //size of text input box
                rows="8"
              />
            </div>
            <div className="modal-footer">
              <button className="general-button" onClick={handleAddTask}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="tasks-list">
        <h2>Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotesApp;