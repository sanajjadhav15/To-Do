import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Todo from "./components/Todo";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./styles.css";
import bg from "./components/bg-image.jpg";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Router>
      <div className="container">
        <img src={bg} alt="background" className="bg" />
        <h1 className="heading">My To Do</h1>
        <Routes>
          {user ? (
            <Route
              path="/"
              element={<Todo user={user} handleSignOut={handleSignOut} />}
            />
          ) : (
            <>
              <Route path="/" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
