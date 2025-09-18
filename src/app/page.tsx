'use client';

import React, { useState, useEffect } from 'react';
import './page.css';
import TaskCard from './components/taskcard.tsx';

class Task {
  constructor(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
  }
}


const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [draftBodyText, setDraftBodyText] = useState('');
  const [draftTitle, setDraftTitle] = useState('');
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const [tasks, setTasks] = useState(() => {
    // getting stored text
    const saved = localStorage.getItem("tasks");
    const initialValue = JSON.parse(saved);
    return initialValue || {"tasks":[]};
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompleted = localStorage.getItem("completedTasks");
    const initialValue = JSON.parse(savedCompleted);
    return initialValue || { "tasks": [] };
  });

  console.log(tasks);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDraftTitle('');
    setDraftBodyText('');
    // Clear the text when closing
  };

  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  }

  const handleConfirmModalConfirm = () => {
    setShowConfirmModal(false);
    handleCloseModal()
  }

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  }

  const handleConfirmModalCancel = () => {
    setShowConfirmModal(false);
  }

  const handleTryCloseModal = () => {
    console.log("handleTryCloseModal")
    if (draftTitle == '' && draftBodyText == '') {
      handleCloseModal();
    } else {
      handleOpenConfirmModal();
    }
  }

  const handleAddTask = () => {
    console.log("handleAddTask")
    if (draftTitle.trim() !== '') {
      const newID = Date.now()
      const newTask = new Task(newID, draftTitle, draftBodyText)
      setTasks({"tasks": [...tasks.tasks, newTask]});
      // setTasks({"tasks": tasks.tasks, newTask});
      handleCloseModal();
    } else if (draftBodyText == '') {
      handleCloseModal();
      //if no title or body text, close window instead
    } else {
      //tell the user that they need a title.
    }
  };

  const handleCompleteTask = (id) => {
    const taskToComplete = tasks.tasks.find(task => task.id === id);
    if (taskToComplete) {
      setTasks({ "tasks": tasks.tasks.filter(task => task.id !== id) });
      setCompletedTasks({ "tasks": [...completedTasks.tasks, taskToComplete] });
    }
  };

  const handleUncompleteTask = (id) => {
    const taskToUncomplete = completedTasks.tasks.find(task => task.id === id);
    if (taskToUncomplete) {
      setCompletedTasks({ "tasks": completedTasks.tasks.filter(task => task.id !== id) });
      setTasks({ "tasks": [...tasks.tasks, taskToUncomplete] });
    }
  };

  const handleEditTask = (id) => {
    //idk
    console.log(`Editing task with ID: ${id}`);
  };

  const toggleCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        console.log("escape key detected")
        if (!showConfirmModal) {
          handleTryCloseModal();
        } else {
          handleConfirmModalCancel();
        }
      }
      if(event.keyCode === 13) {
        if (showConfirmModal) {
          handleConfirmModalConfirm();
        }
        if (showModal) {
          if (event.ctrlKey) {
            event.preventDefault();
            handleAddTask();
          }
        }
        if (showEditModal) {
          if (event.ctrlKey) {
            event.preventDefault();
            handleEditTask();
          }
        }
      }
      if (event.key === 'n' && (event.ctrlKey)) {
        event.preventDefault();
        handleOpenModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleTryCloseModal, handleOpenModal]); // The effect re-runs when showModal changes

  return (

    <div>
      <h1>Evie stop procrastinating!!!!!!!!!!!</h1>
      <button title="(ctrl+n)" className="general-button" onClick={handleOpenModal}>
        Add a New Task
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add a New Task</h3>
              <input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="Title"
              />
              <button title="(esc)" className="close-button" onClick={handleTryCloseModal}>
                &times;
              </button>
              
            </div>
            <div className="modal-body">
              <textarea
                value={draftBodyText}
                onChange={(e) => setDraftBodyText(e.target.value)}
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

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="discard-modal">
            <div className="modal-header">
              <h3>Discard changes?</h3>
            </div>
            <div className="discard-cancel-footer">
              <button className="cancel-button" onClick={handleConfirmModalCancel}>Cancel</button>
              <button className="discard-button" onClick={handleConfirmModalConfirm}>Discard</button>    
            </div>
          </div>
        </div>
      )}

      <div className="tasks-list">
        <h2>Tasks</h2>
        <div>
          {tasks.tasks.length === 0 ? (
            completedTasks.tasks.length === 0 ? (
              <p>Add a task to get started!</p>
            ) : (
              <p>You've finished all your tasks! Good job!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
            )
          ) : (
            <ul className="tasks-container">
              {tasks.tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onComplete={handleCompleteTask}
                  isCompleted={false}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      <hr className="divider" />

      <div className="completed-tasks-section">
        <h2 className="completed-header" onClick={toggleCompletedTasks}>
          Completed Tasks
          <span className="dropdown-arrow">{showCompletedTasks ? '▼' : '►'}</span>
        </h2>
        <div className={`completed-dropdown-content ${showCompletedTasks ? 'expanded' : ''}`}>
          {completedTasks.tasks.length === 0 ? (
            <p>No completed tasks yet.</p>
          ) : (
            <ul className="tasks-container">
              {completedTasks.tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUncomplete={handleUncompleteTask}
                  isCompleted={true}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;