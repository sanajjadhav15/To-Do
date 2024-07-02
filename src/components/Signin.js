import React, { useState } from "react";
import "../styles/sign.css";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import googleIcon from "./google.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSigninWithEmail = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/todo");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSigninWithGoogle = () => {
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
      <form onSubmit={handleSigninWithEmail} className="form">
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
          Sign In
        </button>

        <hr />
        <p>Or</p>
        <hr />
        <button onClick={handleSigninWithGoogle} className="btn-google">
          <img src={googleIcon} alt="google" className="google-icon" />
          Sign In with Google
        </button>
        {error && <p className="error">{error}</p>}
        <p className="signin">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
