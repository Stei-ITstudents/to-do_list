import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import icon from "./assets/images/icon.png";
import "./App.css";

const App = () => {
  console.log("App rendered");
  const [todos, setTodos] = useState([]);
  const [hover, setHover] = useState(false);

  // Store in Local Storage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleMouseEnter = () => {
    document.body.classList.add("todo-hover");
  };

  const handleMouseLeave = () => {
    document.body.classList.remove("todo-hover");
  };

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const saveTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  return (
    <div
      className="todo"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="header">
        <h2>To-do list</h2>
        <img src={icon} alt="icon" />
      </div>
      <TodoInput addTodo={addTodo} />
      <ul className="scroll">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            saveTodo={saveTodo}
          />
        ))}
      </ul>

      <hr className="counter" />
      <div className="counter-container">
        <span>{todos.length} items total</span>
        <button className="btn" onClick={deleteAllTodos}>
          Delete All
        </button>
      </div>
    </div>
  );
};

export default App;
