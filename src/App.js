import React, { useEffect, useRef } from "react";
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
import useUserService from "./shared/hooks/api/useUserService";
import { AuthActionSuccess } from "./shared/context/reducers/authActions";

function App() {
  const { user, dispatch } = useAuthState();

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

  const effectRan = useRef(false);
  const { mutateAsync: getUser } = useUserService.useGetUserService();

  async function handleGetUser() {
    let req = {
      params: {
        username: user?.user?.username,
      },
    };
    const response = await getUser(req).catch((err) => {});

    if (response) {
      const userObj = {
        token: user?.token,
        currentUser: {
          ...response?.data,
        },
        permission: [response?.data?.admin ? "admin" : "user"],
      };
      dispatch(AuthActionSuccess(userObj));
    }
  }

  async function fetchData() {
    if (user?.token) await handleGetUser();
  }

  // const debouncedHandleGetUser = debounce(handleGetUser, 300);

  useEffect(() => {
    let isMounted = true;

    if (!effectRan.current) {
      fetchData();
    }

    return () => {
      isMounted = false;
      effectRan.current = true;
    };
  }, [user?.token]);

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
