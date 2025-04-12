"use client";

import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthContext";
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
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { IoSearch, IoHeartOutline } from "react-icons/io5";
import { TbHeart } from "react-icons/tb";
import { AiOutlineFire } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import styles from "./appLayout.module.css";
import { pages } from "../../../routes";
import { ToastContainer, toast } from "react-toastify";

const drawerWidth = 256.8;

function AppLayout({ children }) {
  // const { user, logout } = useAuth();
  const logout = () => {};
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const drawerContent = (
    <>
      {/* <Box className={styles.sidebarHeader}>
        <Box className={styles.logo}>
          {sidebarOpen && (
            <Typography variant="h6" className={styles.logoText}>
              MovieMatch
            </Typography>
          )}
        </Box>
      </Box> */}

      <Box className={styles.userProfile}>
        <Box className={styles.userAvatar}>{"A"}</Box>
        {sidebarOpen && (
          <Box className={styles.userInfo}>
            <Typography
              variant="subtitle1"
              className={styles.userName}
              style={{
                fontFamily: "Neuzeit Grotesk Bold",
              }}
            >
              {/* {user?.name || "User"} */}
              Archie Bryann
            </Typography>
            <Typography
              variant="body2"
              className={styles.userEmail}
              style={{
                fontFamily: "Inter",
              }}
            >
              @ekomobong
            </Typography>
          </Box>
        )}
      </Box>

      <Divider />

      <List className={styles.sidebarNav}>
        {pages
          .filter((page) => page?.app && page?.nav?.top)
          .map((item) => (
            <ListItem
              key={item.path}
              button
              component={Link}
              to={item?.path}
              selected={isActive(item?.path)}
              className={`${styles.navItem} ${isActive(item?.path) ? styles.active : ""}`}
            >
              <ListItemIcon className={styles.navIcon}>
                {item?.nav?.icon}
              </ListItemIcon>
              {sidebarOpen && (
                <ListItemText
                  primary={item?.nav.name}
                  style={{
                    fontFamily: "Inter",
                  }}
                />
              )}
            </ListItem>
          ))}
        {/* <ListItem
          button
          component={Link}
          to="/app/discover"
          selected={isActive("/app/discover")}
          className={`${styles.navItem} ${isActive("/app/discover") ? styles.active : ""}`}
        >
          <ListItemIcon className={styles.navIcon}>
            <IoSearch />
          </ListItemIcon>
          {sidebarOpen && (
            <ListItemText
              primary="Discover"
              style={{
                fontFamily: "Inter",
              }}
            />
          )}
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/app/watchlist"
          selected={isActive("/app/watchlist")}
          className={`${styles.navItem} ${isActive("/app/watchlist") ? styles.active : ""}`}
        >
          <ListItemIcon className={styles.navIcon}>
            <IoHeartOutline />
          </ListItemIcon>
          {sidebarOpen && (
            <ListItemText
              primary="Watchlist"
              style={{
                fontFamily: "Inter",
              }}
            />
          )}
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/app/premium"
          selected={isActive("/app/premium")}
          className={`${styles.navItem} ${isActive("/app/premium") ? styles.active : ""}`}
        >
          <ListItemIcon className={styles.navIcon}>
            <AiOutlineFire />
          </ListItemIcon>
          {sidebarOpen && (
            <ListItemText
              primary="Premium"
              style={{
                fontFamily: "Inter",
              }}
            />
          )}
        </ListItem> */}
        {/* 
        <ListItem
          button
          component={Link}
          to="/app/settings"
          selected={isActive("/app/settings")}
          className={`${styles.navItem} ${isActive("/app/settings") ? styles.active : ""}`}
        >
          <ListItemIcon className={styles.navIcon}><IoSettingsOutline /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="Settings" style={{
              fontFamily: "Inter"
            }}  />}
        </ListItem> */}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* <Divider /> */}

      <Box className={styles.sidebarFooter}>
        <List className={styles.sidebarNav}>
          {pages
            .filter((page) => page?.app && page?.nav?.bottom)
            .map((item) => (
              <ListItem
                key={item.path}
                button
                component={Link}
                to={item?.path}
                selected={isActive(item?.path)}
                className={`${styles.navItem} ${isActive(item?.path) ? styles.active : ""}`}
              >
                <ListItemIcon className={styles.navIcon}>
                  {item?.nav?.icon}
                </ListItemIcon>
                {sidebarOpen && (
                  <ListItemText
                    primary={item?.nav.name}
                    style={{
                      fontFamily: "Inter",
                    }}
                  />
                )}
              </ListItem>
            ))}

          {/* <ListItem
            button
            component={Link}
            to="/app/settings"
            selected={isActive("/app/settings")}
            className={`${styles.navItem} ${isActive("/app/settings") ? styles.active : ""}`}
          >
            <ListItemIcon className={styles.navIcon}>
              <IoSettingsOutline />
            </ListItemIcon>
            {sidebarOpen && (
              <ListItemText
                primary="Manage Account"
                style={{
                  fontFamily: "Inter",
                }}
              />
            )}
          </ListItem> */}
          {/* <ListItem
          button
          component={Link}
          onClick={handleLogout}
          // selected={isActive("/app/settings")}
          className={`${styles.navItem}`}
        >
          <ListItemIcon className={styles.navIcon}><IoIosLogOut /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="Sign out" style={{
              fontFamily: "Inter"
            }}  />}
        </ListItem> */}
        </List>
      </Box>
    </>
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        // hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              style={{ fontFamily: "Neuzeit Grotesk Bold" }}
            >
              LoveSet
            </Typography>
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
                // backgroundColor: "#F7F7F7",
                // boxShadow: "2px 0 10px var(--shadow-color)",
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
                // backgroundColor: "#F7F7F7",
                // boxShadow: "2px 0 10px var(--shadow-color)",
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
            // padding: "30px",
            transition: "margin-left 0.3s ease",
            width: "100%",
            marginTop: isMobile ? "64px" : 0,
          }}
        >
          {/* <Outlet /> */}
          {children}
        </Box>
      </Box>
    </>
  );
}

export default AppLayout;
