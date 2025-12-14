import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import './Navbar.css';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    
    if (auth?.user?.role === "ADMIN") {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // 🔹 Not logged in → Public Navbar
  if (!auth) {
    return (
      <>
        <nav className="public-nav">
          <Link to="/home" className="nav-brand">
            <div className="nav-logo">🍭</div>
            <div>
              <div className="nav-brand-text">Sweet Spot</div>
              <div className="nav-brand-tagline">Crafted with Love</div>
            </div>
          </Link>
          
          <button className="nav-menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <Link to="/home" onClick={closeMenu}>Home</Link>
            <div className="nav-separator"></div>
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <div className="nav-separator"></div>
            <Link to="/register" onClick={closeMenu}>Register</Link>
          </div>
        </nav>
        <div className={`nav-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
      </>
    );
  }

  // 🔹 Admin Navbar
  if (auth.user.role === "ADMIN") {
    return (
      <>
        <nav className="admin-nav">
          <Link to="/admin" className="nav-brand">
            <div className="nav-logo">🍭</div>
            <div>
              <div className="nav-brand-text">Sweet Spot</div>
              <div className="nav-brand-tagline">Admin Panel</div>
            </div>
          </Link>
          
          <button className="nav-menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <Link to="/admin" onClick={closeMenu}>Admin Home</Link>
            <div className="nav-separator"></div>
            <Link to="/admin/manage-sweets" onClick={closeMenu}>Manage Sweets</Link>
            <div className="nav-separator"></div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
        <div className={`nav-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
      </>
    );
  }

  // 🔹 User Navbar
  return (
    <>
      <nav className="user-nav">
        <Link to="/home" className="nav-brand">
          <div className="nav-logo">🍭</div>
          <div>
            <div className="nav-brand-text">Sweet Spot</div>
            <div className="nav-brand-tagline">Crafted with Love</div>
          </div>
        </Link>
        
        <button className="nav-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/home" onClick={closeMenu}>Home</Link>
          <div className="nav-separator"></div>
          <Link to="/user/dashboard" onClick={closeMenu}>Dashboard</Link>
          <div className="nav-separator"></div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className={`nav-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
    </>
  );
};

export default Navbar;