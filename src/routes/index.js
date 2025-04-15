import { permissions } from "../shared/utils/permissions";

// pages
import Home from "../pages/home/home";
import Onboarding from "../pages/onboarding/onboarding";
import Content from "../pages/content/content";

// app pages
import Discover from "../pages/app/discover/discover";
import Watchlist from "../pages/app/watchlist/watchlist";
import Premium from "../pages/app/premium/premium";
import Settings from "../pages/app/settings/settings";

// icons
import { IoSearch, IoHeartOutline } from "react-icons/io5";
import { AiOutlineFire } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import Terms from "../pages/terms/terms";
import Privacy from "../pages/privacy/privacy";

export const pages = [
  {
    path: "/",
    element: <Home />,
    app: false,
  },
  {
    path: "/terms-of-service",
    element: <Terms />,
    app: false,
  },
  {
    path: "/privacy-policy",
    element: <Privacy />,
    app: false,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
    app: false,
  },
  {
    path: "/content/:slug",
    element: <Content />,
    app: false,
  },
  // app
  {
    path: "/app/discover",
    element: <Discover />,
    app: true,
    guarded: true,
    nav: {
      icon: <IoSearch />,
      name: "Discover",
      top: true,
      bottom: false,
    },
    permissions: [permissions.User],
  },
  {
    path: "/app/watchlist",
    element: <Watchlist />,
    app: true,
    guarded: true,
    nav: {
      icon: <IoHeartOutline />,
      name: "Watchlist",
      top: true,
      bottom: false,
    },
    permissions: [permissions.User],
  },
  {
    path: "/app/premium",
    element: <Premium />,
    app: true,
    guarded: true,
    nav: {
      icon: <AiOutlineFire />,
      name: "Premium",
      top: true,
      bottom: false,
    },
    permissions: [permissions.User],
  },
  {
    path: "/app/settings",
    element: <Settings />,
    app: true,
    guarded: true,
    nav: {
      icon: <IoSettingsOutline />,
      name: "Settings",
      top: false,
      bottom: true,
    },
    permissions: [permissions.User],
  },
];

export const routes = pages;
