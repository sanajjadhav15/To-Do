import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const localData = localStorage.getItem("todos");
    if (localData) {
      setTodos(JSON.parse(localData));
    }
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      completed: !newTodos[index].completed,
    };
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h1 className="heading">My To Do</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add Task"
          className="input-task"
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
      <ul className="list">
        {todos.map((task, index) => (
          <li key={index} className="list-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(index)}
              className="tick"
            />
            <span
              className="task-text"
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                textDecorationColor: task.completed ? "#574AE2" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleDelete(index)} className="remove">
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
