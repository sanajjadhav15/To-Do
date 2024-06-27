import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
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

  return (
    <Router>
      <div className="container">
        <img src={bg} alt="background" className="bg" />
        <div className="header">
          <h1 className="heading">My To Do</h1>
        </div>

        <Routes>
          <Route path="/" element={user? <Todo /> : <Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
      <footer>
        <div className="footer">
          {/* <p>© 2024</p> */}
          <p>Designed and developed with ❤️ by Sanaj</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
