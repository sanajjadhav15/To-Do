import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "../styles/todo.css";
import { signOut } from "firebase/auth";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const getTodos = async () => {
      const todosCol = collection(db, "todos");
      const q = query(todosCol, where("uid", "==", user.uid));
      const todosSnapshot = await getDocs(q);
      setTodos(
        todosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getTodos();
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task === "") return;

    const newTask = {
      text: task,
      completed: false,
      uid: user.uid,
    };
    const todosCol = collection(db, "todos");
    const docRef = await addDoc(todosCol, newTask);
    setTodos([...todos, { id: docRef.id, ...newTask }]);
    setTask("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    await updateDoc(doc(db, "todos", id), {
      completed: !todo.completed,
    });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="container-td">
      <form onSubmit={handleSubmit} className="form-td">
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
      {user && (
        <div className="signout-td">
          <button onClick={handleSignOut} className="signout-btn">
            Sign Out
          </button>
        </div>
        )}
    </div>
  );
}

export default Todo;
