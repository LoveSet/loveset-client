import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import AppLayout from "./layouts/AppLayout"
import HomePage from "./pages/HomePage"
import OnboardingPage from "./pages/OnboardingPage"
import Discover from "./pages/Discover"
import DetailsPage from "./pages/DetailsPage"
import PremiumPage from "./pages/PremiumPage"
import WatchlistPage from "./pages/WatchlistPage"
import SettingsPage from "./pages/SettingsPage"
import WelcomeEmail from "./email/welcome"
import ReferralEmail from "./email/referralAward"
import ExpiredEmail from "./email/subscriptionExpired"
import "./styles/global.css"
import SwipeCards from "./pages/SwipeCards"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

// App with routing
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          
          {/* Emails */}
          <Route path="welcome" element={<WelcomeEmail />} />
          <Route path="referral" element={<ReferralEmail />} />
          <Route path="expired" element={<ExpiredEmail />} />

          {/* Test */}

          {/* Protected routes with AppLayout */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="discover" element={<Discover />} />
            <Route path="premium" element={<PremiumPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="settings" element={<SettingsPage />} />



          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

