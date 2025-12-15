import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import Footer from "../components/Footer";
import bg from "../assets/bg.png";

export default function Signup() {
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    alert("Signup successful (mock)");
    navigate("/");
  }

  return (
    <div
      className="auth-bg"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <AuthCard title="Sign Up">
        <form onSubmit={handleSignup}>

          <div className="row">
            <div className="field">
              <label>First Name</label>
              <div className="input-icon modern">
                <input placeholder="Juan" required />
              </div>
            </div>

            <div className="field">
              <label>Last Name</label>
              <div className="input-icon modern">
                <input placeholder="Dela Cruz" required />
              </div>
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <div className="input-icon modern">
              <input
                type="email"
                placeholder="email@example.com"
                required
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
              />
            </div>
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <div className="input-icon modern">
              <input
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button>Sign Up</button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </AuthCard>
      <Footer />
    </div>
  );
}
