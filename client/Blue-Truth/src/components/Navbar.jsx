import { NavLink, useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
  }

  return (
    <header className="home-header">
      <div className="header-overlay">

        <div className="header-top">
          <div className="header-title">
            <span className="logo">BLUE TRUTH </span>
            <span className="tagline">Smart Water Monitoring</span>
          </div>

          <div className="header-right">
            {user ? (
              <>
                <span className="welcome">Welcome, {user}</span>
                
                {/* CONTAINER TO STACK BUTTONS */}
                <div className="user-actions">
                  <button 
                    className="profile-btn" 
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </button>
                  
                  <button className="logout" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <button className="logout" onClick={() => navigate("/login")}>
                Log In
              </button>
            )}
          </div>
        </div>

        <div className="nav-container">
          <NavLink to="/home" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>
            Home
          </NavLink>
          <NavLink to="/map" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>
            Map View
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>
            Contact
          </NavLink>
        </div>

      </div>
    </header>
  );
}