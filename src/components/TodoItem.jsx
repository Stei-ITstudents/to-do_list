import React, { useState } from "react";

const TodoItem = ({ todo, toggleComplete, deleteTodo, saveTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    saveTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <div className="editing-input">
          <input
            type="text"
            className="task-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
          />
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            className="task-checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <span
            className={`task-text ${todo.completed ? "completed" : ""}`}
            onDoubleClick={handleDoubleClick}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.text}
          </span>
          <div className="task-buttons">
            <button className="edit-task-btn" onClick={handleDoubleClick}>
              Edit
            </button>
            <button
              className="delete-task-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              ×
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
