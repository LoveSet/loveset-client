"use client"

import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "../styles/appLayout.css"

const AppLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text"></span>
          </div>
          {/* <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "◀" : "▶"}
          </button> */}
        </div>

        <div className="user-profile">
          <div className="user-avatar">{user?.name?.charAt(0) || "U"}</div>
          {sidebarOpen && (
            <div className="user-info">
              <div className="user-name">{user?.name || "User"}</div>
              <div className="user-email">{user?.email || "user@example.com"}</div>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <Link to="/app/swipe" className={`nav-item ${isActive("/app/swipe") ? "active" : ""}`}>
            <span className="nav-icon">🔍</span>
            {sidebarOpen && <span className="nav-text">Discover</span>}
          </Link>
          <Link to="/app/watchlist" className={`nav-item ${isActive("/app/watchlist") ? "active" : ""}`}>
            <span className="nav-icon">❤️</span>
            {sidebarOpen && <span className="nav-text">My Likes</span>}
          </Link>
          <Link to="/app/premium" className={`nav-item ${isActive("/app/premium") ? "active" : ""}`}>
            <span className="nav-icon">⭐</span>
            {sidebarOpen && <span className="nav-text">Premium</span>}
          </Link>
          <Link to="/app/settings" className={`nav-item ${isActive("/app/settings") ? "active" : ""}`}>
            <span className="nav-icon">⚙️</span>
            {sidebarOpen && <span className="nav-text">Settings</span>}
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            {sidebarOpen && <span className="logout-text">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout

