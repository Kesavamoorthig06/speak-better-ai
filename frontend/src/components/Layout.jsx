import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, BookOpen, Settings, Menu, X, Mic } from "lucide-react";
// Using the combined App.css file
import "../App.css";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="logo-container">
            <Mic className="logo-icon" />
            <h1 className="logo-text">SpeakBetter AI</h1>
          </div>
          <button onClick={toggleSidebar} className="close-button">
            <X />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="sidebar-navigation">
          <SidebarLink 
            to="/" 
            label="Home" 
            icon={<Home size={18} />} 
            active={location.pathname === "/"} 
          />
          <SidebarLink 
            to="/about" 
            label="About" 
            icon={<Info size={18} />} 
            active={location.pathname === "/about"} 
          />
          <SidebarLink 
            to="/tutorials" 
            label="Tutorials" 
            icon={<BookOpen size={18} />} 
            active={location.pathname === "/tutorials"} 
          />
          <SidebarLink 
            to="/settings" 
            label="Settings" 
            icon={<Settings size={18} />} 
            active={location.pathname === "/settings"} 
          />
        </nav>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div className="backdrop" onClick={toggleSidebar} />
      )}

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Nav (Mobile Only) */}
        <header className="mobile-header">
          <button onClick={toggleSidebar} className="menu-button">
            <Menu />
          </button>
          <h1 className="header-title">SpeakBetter AI</h1>
        </header>

        {/* Page Content */}
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`sidebar-link ${active ? "active-link" : ""}`}
  >
    <span className="link-icon">{icon}</span>
    {label}
  </Link>
);

export default Layout;