import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email === "admin@bluetruth.com" && password === "123456") {
      window.location.href = "http://localhost:5174";
    } else if (email.includes("@") && password.length > 0) {
      // SAVE THE USER HERE
      localStorage.setItem("currentUser", email); 
      window.location.href = "http://localhost:5173/home";
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <div
      className="auth-bg"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="logo">💧 BLUE TRUTH</h1>
      <p className="subtitle">Smart Water Monitoring System</p>

      <AuthCard title="Sign In">
        <form onSubmit={handleLogin}>

          <div className="field">
            <label>Email</label>
            <div className="input-icon modern">
              <input
                type="email"
                placeholder="email@example.com"
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-icon modern">
              <input
                type="password"
                placeholder="••••••••"
                required
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button>Sign In</button>
        </form>

        <p className="switch">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </AuthCard>
      <Footer />
    </div>
  );
}