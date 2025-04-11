import React, { useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { routes } from "./routes";
import { useAuthState } from "./shared/context/useAuthContext";

// components
import CustomHead from "./shared/components/customHead/customHead";
import ScrollToTop from "./shared/components/scrollToTop/scrollToTop";

// CSS files
import "./shared/styles/global.css";
import "./shared/styles/modals.css";
import AppLayout from "./shared/components/appLayout/appLayout";

function App() {
  const { user } = useAuthState();

  const renderGuardedRoutes = ({ i, ...route }) => {
    if (user?.token) {
      return (
        <Route
          key={i}
          path={route.path}
          // element={route.element || r0 ? route.noRedirect : route.redirect}
          element={route.element}
          {...route}
        />
      );
    } else {
      return (
        <Route
          key={i}
          path={route.path}
          element={
            <Navigate
              to={`/?return_to=${encodeURIComponent(
                window.location.pathname +
                  window.location.search +
                  window.location.hash
              )}`}
              replace
            />
          }
        />
      );
    }
  };

  return (
    <div style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <CustomHead />
      <ScrollToTop />
      <Routes>
        {routes.map((route, i) =>
          route.guarded ? (
            renderGuardedRoutes({ i, ...route })
          ) : (
            <Route key={i} {...route} />
          )
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
