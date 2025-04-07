"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TermsOfServiceModal from "../modals/TermsOfServiceModal"
import "../styles/premiumPage.css"

const PremiumPage = () => {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("6month")
  const [showTerms, setShowTerms] = useState(false)

  const plans = [
    {
      id: "weekly",
      name: "1-Week",
      price: "$5",
      perWeek: "$5/wk",
      savings: "0%",
      isBest: false,
    },
    {
      id: "monthly",
      name: "Monthly",
      price: "$12",
      perWeek: "$3/wk",
      savings: "40%",
      isBest: false,
    },
    {
      id: "6month",
      name: "6-Month",
      price: "$60",
      perWeek: "$2.50/wk",
      savings: "17%",
      isBest: true,
    },
  ]

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId)
  }

  const handleSubscribe = () => {
    // Simulate subscription process
    localStorage.setItem("isPremium", "true")
    localStorage.setItem("premiumPlan", selectedPlan)
    localStorage.setItem("premiumExpiry", new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString())

    // Redirect to swiping page
    navigate("/app/discover")
  }

  return (
    <div className="premium-container">
      <div className="premium-header">
        <h1 className="premium-title">MovieMatch Premium</h1>
        <p className="premium-subtitle">Unlimited swipes, no ads, and more features</p>
      </div>

      <div className="premium-features">
        <div className="feature-item">
          <span className="feature-icon">🔄</span>
          <span className="feature-text">Unlimited Swipes</span>
        </div>

        <div className="feature-item">
          <span className="feature-icon">🔍</span>
          <span className="feature-text">Where to Stream</span>
        </div>

        <div className="feature-item">
          <span className="feature-icon">🗑️</span>
          <span className="feature-text">Delete from Watchlist</span>
        </div>

        <div className="feature-item">
          <span className="feature-icon">🔔</span>
          <span className="feature-text">New Release Alerts</span>
        </div>
      </div>

      <div className="premium-plans">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlan === plan.id ? "selected" : ""} ${plan.isBest ? "best-value" : ""}`}
            onClick={() => handleSelectPlan(plan.id)}
          >
            {plan.isBest && <div className="best-badge">Best value</div>}

            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">{plan.price}</div>
            <div className="plan-per-week">{plan.perWeek}</div>

            {plan.savings !== "0%" && <div className="plan-savings">Save {plan.savings}</div>}

            <div className="plan-radio">
              <div className={`radio-button ${selectedPlan === plan.id ? "selected" : ""}`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="subscription-terms">
        By tapping "Continue", you will be charged and your subscription will automatically renew for the same price and
        duration until you cancel via Account Settings.
        <button className="terms-link" onClick={() => setShowTerms(true)}>
          Terms
        </button>
      </div>

      <div className="subscription-actions">
        <button className="subscribe-button" onClick={handleSubscribe}>
          Continue
        </button>

        <button className="cancel-button" onClick={() => navigate("/app/discover")}>
          No Thanks
        </button>
      </div>

      {showTerms && <TermsOfServiceModal onClose={() => setShowTerms(false)} />}
    </div>
  )
}

export default PremiumPage

