import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import googleIcon from "./google.png";
import "../styles/sign.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignupWithEmail = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/todo");
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignupWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        navigate("/todo");
      })
      .catch((error) => {
        setError(error.message);
      });
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
