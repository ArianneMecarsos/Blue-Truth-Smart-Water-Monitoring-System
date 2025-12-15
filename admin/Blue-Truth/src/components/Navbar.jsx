import { NavLink, useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  function handleLogout() {
    // later you can clear auth token here
    // Redirects to the landing page (Home) after logout
    navigate("/login");
  }

  return (
    <header className="home-header">
      <div className="header-overlay">

        {/* TOP ROW */}
        <div className="header-top">
          <div className="header-title">
            <span className="logo">BLUE TRUTH </span>
            <span className="tagline">Smart Water Monitoring</span>
          </div>

          <div className="header-right">
            {/* CONDITIONAL RENDERING */}
            {user ? (
              // If user is logged in:
              <>
                <span className="welcome">Welcome, {user}</span>
                <button className="logout" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              // If user is NOT logged in:
              <button className="logout" onClick={() => navigate("/login")}>
                Log In
              </button>
            )}
          </div>
        </div>

        <div className="nav-container">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            Map View
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            History
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
          >
            Contact
          </NavLink>
        </div>

      </div>
    </header>
  );
}