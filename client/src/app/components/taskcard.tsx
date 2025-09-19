// components/taskcard.tsx
'use client';

import React, { useState, useEffect } from 'react';

const TaskCard = ({ task, onEdit, onComplete, onUncomplete, isCompleted }) => {
  const [activeTime, setActiveTime] = useState(0);
  const [startTime] = useState(task.id);

  useEffect(() => {
    if (!isCompleted) {
      const timer = setInterval(() => {
        setActiveTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, isCompleted]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className={`task-card ${isCompleted ? 'completed-card' : ''}`}>
      <div className="card-header">
        <h3>{task.title}</h3>
      </div>
      <div className="card-body">
        <p>{task.body}</p>
      </div>
      <div className="card-footer">
        {!isCompleted ? (
          <>
            <button onClick={() => onEdit(task.id)} className="edit-button">Edit</button>
            <span className="timer">{formatTime(activeTime)}</span>
            <button onClick={() => onComplete(task.id)} className="complete-button">Complete</button>
          </>
        ) : (
          <>
            <span className="completed-label">✅ Completed</span>
            <button onClick={() => onUncomplete(task.id)} className="uncomplete-button">Uncomplete :(</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;