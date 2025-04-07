"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import TermsOfServiceModal from "../modals/TermsOfServiceModal"
import styles from "../styles/settingsPage.module.css"

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
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h1 className={styles.settingsTitle}>Settings</h1>
      </div>

      <div className={styles.settingsSection}>
        <h2 className={styles.sectionTitle}>Profile</h2>

        <div className={styles.profileInfo}>
          <div className={styles.userAvatar}>A</div>

          <div className={styles.userDetails}>
            <div className={styles.userName}>Archie Bryann</div>
            <div className={styles.userEmail}>@ekomobong</div>
          </div>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h2 className={styles.sectionTitle}>Subscription</h2>

        {isPremium ? (
          <div className={styles.subscriptionInfo}>
            <div className={styles.premiumBadge}>Premium</div>

            <div className={styles.planDetails}>
              <div className={styles.planName}>
                {premiumPlan === "weekly"
                  ? "1-Week Plan"
                  : premiumPlan === "monthly"
                    ? "Monthly Plan"
                    : premiumPlan === "6month"
                      ? "6-Month Plan"
                      : "Premium Plan"}
              </div>

              <div className={styles.planExpiry}>Expires on {formatExpiryDate(premiumExpiry)}</div>
            </div>

            <button className={styles.manageSubscriptionButton}>Manage Subscription</button>
          </div>
        ) : (
          <div className={styles.upgradePrompt}>
            <p>Upgrade to Premium for unlimited swipes and more features</p>
            <button className={styles.upgradeButton} onClick={handleUpgradePremium}>
              Upgrade Now
            </button>
          </div>
        )}
      </div>

      <div className={styles.settingsSection}>
        <h2 className={styles.sectionTitle}>Preferences</h2>

        <div className={styles.preferencesSummary}>
          <div className={styles.preferenceItem}>
            <div className={styles.preferenceLabel}>Content Types</div>
            <div className={styles.preferenceValue}>{preferences.contentTypes.join(", ") || "Not set"}</div>
          </div>

          <div className={styles.preferenceItem}>
            <div className={styles.preferenceLabel}>Industries</div>
            <div className={styles.preferenceValue}>{preferences.genres.join(", ") || "Not set"}</div>
          </div>

          <div className={styles.preferenceItem}>
            <div className={styles.preferenceLabel}>Genres</div>
            <div className={styles.preferenceValue}>{preferences.favoriteMovie || "Not set"}</div>
          </div>
          <div className={styles.preferenceItem}>
            <div className={styles.preferenceLabel}>Time Periods</div>
            <div className={styles.preferenceValue}>{preferences.timePeriods || "Not set"}</div>
          </div>
        </div>

        <button className={styles.editPreferencesButton} onClick={handleEditPreferences}>
          Edit Preferences
        </button>
      </div>

      <div className={styles.settingsSection}>
        <h2 className={styles.sectionTitle}>Account</h2>

        <div className={styles.accountActions}>
          <button className={styles.accountActionButton} onClick={() => setShowTerms(true)}>
            Terms of Service
          </button>
          <button className={styles.accountActionButton} onClick={() => setShowTerms(true)}>
          Privacy Policy
          </button>

          {/* <button className={styles.accountActionButton}>Contact Support</button> */}

          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {showTerms && <TermsOfServiceModal onClose={() => setShowTerms(false)} />}
    </div>
  )
}

export default SettingsPage