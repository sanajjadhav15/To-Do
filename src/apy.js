import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import "./styles.css";
import bg from "./bg-image.jpg";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const todosCol = collection(db, "todos");
      const todosSnapshot = await getDocs(todosCol);
      setTodos(todosSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
    };
    getTodos();
  }
  , []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      return;
    }
    const newTask = {
      text: task,
      completed: false,
    };
    const todosCol = collection(db, "todos");
    const docRef = await addDoc(todosCol, newTask);
    setTodos([...todos, {id: docRef.id, ...newTask}]);
    setTask("");
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    await updateDoc(doc(db, "todos", id),{
      completed: updatedTodo.completed
    });
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  }

  return (
    <div className="container">
      <img src={bg} alt="background" className="bg" />
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
        {todos.map((task) => (
          <li key={task.id} className="list-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(task.id)}
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
            <button onClick={() => handleDelete(task.id)} className="remove">
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
