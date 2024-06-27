import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Todo from "./components/Todo";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./styles.css";
import bg from "./components/bg-image.jpg";
import img from "./image.png";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Router>
      <div className="container">
        <img src={bg} alt="background" className="bg" />
        <div className="header">
          <h1 className="heading">My To Do</h1>
        </div>

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>

        {user && (
          <button onClick={handleSignOut} className="signout">
            Sign Out
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;
