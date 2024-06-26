import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import "../styles/signup.css";
import googleIcon from "./google.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignupWithEmail = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignupWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSignupWithEmail} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-pass"
        />
        <button type="submit" className="btn-signup">
          Sign Up
        </button>

        <hr />
        <p>Or</p>
        <hr />
        <button onClick={handleSignupWithGoogle} className="btn-google">
          <img src={googleIcon} alt="google" className="google-icon" />
          Sign Up with Google
        </button>
        {error && <p className="error">{error}</p>}
        <p className="signin">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
      </form>

      
    </div>
  );
};

export default Signup;
