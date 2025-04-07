"use client"

import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Menu } from "@mui/icons-material"
import styles from "../styles/appLayout.module.css"

const drawerWidth = 250

const AppLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const drawerContent = (
    <>
      <Box className={styles.sidebarHeader}>
        <Box className={styles.logo}>
          <span className={styles.logoIcon}>🎬</span>
          {sidebarOpen && (
            <Typography variant="h6" className={styles.logoText}>
              MovieMatch
            </Typography>
          )}
        </Box>
      </Box>

      <Box className={styles.userProfile}>
        <Box className={styles.userAvatar}>{user?.name?.charAt(0) || "U"}</Box>
        {sidebarOpen && (
          <Box className={styles.userInfo}>
            <Typography variant="subtitle1" className={styles.userName}>
              {user?.name || "User"}
            </Typography>
            <Typography variant="body2" className={styles.userEmail}>
              {user?.email || "user@example.com"}
            </Typography>
          </Box>
        )}
      </Box>

      <Divider />

      <List className={styles.sidebarNav}>
        <ListItem
          button
          component={Link}
          to="/app/swipe"
          selected={isActive("/app/swipe")}
          className={`${styles.navItem} ${isActive("/app/swipe") ? styles.active : ""}`}
        >
          <ListItemIcon className={styles.navIcon}>🔍</ListItemIcon>
          {sidebarOpen && <ListItemText primary="Discover" />}
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/app/watchlist"
          selected={isActive("/app/watchlist")}
          className={`${styles.navItem} ${isActive("/app/watchlist") ? styles.active : ""}`}
        >
          <ListItemIcon className={styles.navIcon}>❤️</ListItemIcon>
          {sidebarOpen && <ListItemText primary="My Likes" />}
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/app/premium"
          selected={isActive("/app/premium")}
          className={`${styles.navItem} ${isActive("/app/premium") ? styles.active : ""}`}
        >
          <ListItemIcon className={styles.navIcon}>⭐</ListItemIcon>
          {sidebarOpen && <ListItemText primary="Premium" />}
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/app/settings"
          selected={isActive("/app/settings")}
          className={`${styles.navItem} ${isActive("/app/settings") ? styles.active : ""}`}
        >
          <ListItemIcon className={styles.navIcon}>⚙️</ListItemIcon>
          {sidebarOpen && <ListItemText primary="Settings" />}
        </ListItem>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box className={styles.sidebarFooter}>
        <Button
          className={styles.logoutButton}
          onClick={handleLogout}
          startIcon={<span className={styles.logoutIcon}>🚪</span>}
          fullWidth
          sx={{ justifyContent: sidebarOpen ? "flex-start" : "center" }}
        >
          {sidebarOpen && "Logout"}
        </Button>
      </Box>
    </>
  )

  return (
    <Box className={styles.appLayout}>
      {/* App Bar for mobile - only shown when drawer is closed */}
      {isMobile && !sidebarOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "64px",
            backgroundColor: "white",
            zIndex: 99,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6">MovieMatch</Typography>
        </Box>
      )}

      {/* Drawer - different behavior based on screen size */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={sidebarOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "var(--background-white)",
              boxShadow: "2px 0 10px var(--shadow-color)",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="persistent"
          open={sidebarOpen}
          sx={{
            width: sidebarOpen ? drawerWidth : 70,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: sidebarOpen ? drawerWidth : 70,
              boxSizing: "border-box",
              overflowX: "hidden",
              backgroundColor: "var(--background-white)",
              boxShadow: "2px 0 10px var(--shadow-color)",
              transition: "width 0.3s ease",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        className={styles.mainContent}
        sx={{
          marginLeft: {
            xs: 0,
            // md: sidebarOpen ? `${drawerWidth}px` : "70px",
          },
          padding: "30px",
          transition: "margin-left 0.3s ease",
          width: "100%",
          marginTop: isMobile ? "64px" : 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default AppLayout

