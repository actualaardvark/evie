'use client';

import React, { useState, useEffect } from 'react';
import './page.css';

class Task {
  constructor(id, title, body, deadline) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.deadline = deadline
  }
}

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [draftBodyText, setDraftBodyText] = useState('');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDeadline, setDraftDeadline] = useState('');

  const [tasks, setTasks] = useState(() => {
    // getting stored text
    const saved = localStorage.getItem("tasks");
    const initialValue = JSON.parse(saved);
    return initialValue || {"tasks":[]};
  });

  console.log(tasks);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDraftTitle('');
    setDraftBodyText('');
    setDraftDeadline('');
    // Clear the text when closing
  };

  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  }

  const handleConfirmModalConfirm = () => {
    setShowConfirmModal(false);
    handleCloseModal()
  }

  const handleConfirmModalCancel = () => {
    setShowConfirmModal(false);
  }

  const handleTryCloseModal = () => {
    console.log("handleTryCloseModal")
    if (draftTitle == '' && draftBodyText == '' && draftDeadline == '') {
      handleCloseModal();
    } else {
      handleOpenConfirmModal();
    }
  }

  const handleAddTask = () => {
    console.log("handleAddTask")
    if (draftTitle.trim() !== '') {
      const newID = Date.now()
      if (draftDeadline == '') {
        setDraftDeadline(false);
      }
      const newTask = new Task(newID, draftTitle, draftBodyText, draftDeadline)
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

  useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

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
        {tasks.length === 0 ? (
          <p>Add a task to get started!</p>
        ) : (
          <ul>
            hi
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;