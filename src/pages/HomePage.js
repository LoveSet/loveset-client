"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import InviteFriendModal from "../modals/InviteFriendModal"
import TermsOfServiceModal from "../modals/TermsOfServiceModal"
import "../styles/homePage.css"

const HomePage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showTerms, setShowTerms] = useState(false)
  const [showInvite, setShowInvite] = useState(false)

  const handleGoogleAuth = () => {
    // Simulate Google Auth
    const mockUser = {
      id: "user123",
      name: "Movie Lover",
      email: "user@example.com",
      isNewUser: true,
    }

    login(mockUser)

    // If new user, redirect to onboarding
    if (mockUser.isNewUser) {
      navigate("/onboarding")
    } else {
      navigate("/app/swipe")
    }
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="logo-container">
          <span className="logo-icon">🎬</span>
          <h1 className="logo-text">MovieMatch</h1>
        </div>

        <h2 className="tagline">Your favorite movie in 1 swipe</h2>

        <p className="description">
          Discover movies and shows tailored to your taste. Swipe right on what you love, left on what you don't. Get
          personalized recommendations every time.
        </p>

        <div className="auth-buttons">
          <button className="google-auth-button" onClick={handleGoogleAuth}>
            <span className="google-icon">G</span>
            <span>Continue with Google</span>
          </button>

          <button className="invite-button" onClick={() => setShowInvite(true)}>
            Invite a friend
          </button>
        </div>

        <div className="terms-text">
          By continuing, you agree to our
          <button className="terms-link" onClick={() => setShowTerms(true)}>
            Terms of Service & Privacy Policy
          </button>
        </div>
      </div>

      {showTerms && <TermsOfServiceModal onClose={() => setShowTerms(false)} />}
      {showInvite && <InviteFriendModal onClose={() => setShowInvite(false)} />}
    </div>
  )
}

export default HomePage

