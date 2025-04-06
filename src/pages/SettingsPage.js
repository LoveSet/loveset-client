"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import TermsOfServiceModal from "../modals/TermsOfServiceModal"
import "../styles/settingsPage.css"

const SettingsPage = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isPremium, setIsPremium] = useState(false)
  const [premiumPlan, setPremiumPlan] = useState("")
  const [premiumExpiry, setPremiumExpiry] = useState("")
  const [showTerms, setShowTerms] = useState(false)
  const [preferences, setPreferences] = useState({
    contentTypes: [],
    filmIndustries: [],
    genres: [],
    timePeriods: [],
    favorites: "",
    favoriteMovie: "",
  })

  useEffect(() => {
    // Check if user is premium
    const userPremium = localStorage.getItem("isPremium")
    if (userPremium === "true") {
      setIsPremium(true)
      setPremiumPlan(localStorage.getItem("premiumPlan") || "")
      setPremiumExpiry(localStorage.getItem("premiumExpiry") || "")
    }

    // Load user preferences
    const storedPreferences = localStorage.getItem("userPreferences")
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences))
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleEditPreferences = () => {
    navigate("/onboarding")
  }

  const handleUpgradePremium = () => {
    navigate("/app/premium")
  }

  const formatExpiryDate = (dateString) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Profile</h2>

        <div className="profile-info">
          <div className="user-avatar">{user?.name?.charAt(0) || "U"}</div>

          <div className="user-details">
            <div className="user-name">{user?.name || "User"}</div>
            <div className="user-email">{user?.email || "user@example.com"}</div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Subscription</h2>

        {isPremium ? (
          <div className="subscription-info">
            <div className="premium-badge">Premium</div>

            <div className="plan-details">
              <div className="plan-name">
                {premiumPlan === "weekly"
                  ? "1-Week Plan"
                  : premiumPlan === "monthly"
                    ? "Monthly Plan"
                    : premiumPlan === "6month"
                      ? "6-Month Plan"
                      : "Premium Plan"}
              </div>

              <div className="plan-expiry">Expires on {formatExpiryDate(premiumExpiry)}</div>
            </div>

            <button className="manage-subscription-button">Manage Subscription</button>
          </div>
        ) : (
          <div className="upgrade-prompt">
            <p>Upgrade to Premium for unlimited swipes and more features</p>
            <button className="upgrade-button" onClick={handleUpgradePremium}>
              Upgrade Now
            </button>
          </div>
        )}
      </div>

      <div className="settings-section">
        <h2 className="section-title">Preferences</h2>

        <div className="preferences-summary">
          <div className="preference-item">
            <div className="preference-label">Content Types</div>
            <div className="preference-value">{preferences.contentTypes.join(", ") || "Not set"}</div>
          </div>

          <div className="preference-item">
            <div className="preference-label">Genres</div>
            <div className="preference-value">{preferences.genres.join(", ") || "Not set"}</div>
          </div>

          <div className="preference-item">
            <div className="preference-label">Favorite Movie</div>
            <div className="preference-value">{preferences.favoriteMovie || "Not set"}</div>
          </div>
        </div>

        <button className="edit-preferences-button" onClick={handleEditPreferences}>
          Edit Preferences
        </button>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Account</h2>

        <div className="account-actions">
          <button className="account-action-button" onClick={() => setShowTerms(true)}>
            Terms of Service & Privacy Policy
          </button>

          <button className="account-action-button">Contact Support</button>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {showTerms && <TermsOfServiceModal onClose={() => setShowTerms(false)} />}
    </div>
  )
}

export default SettingsPage

