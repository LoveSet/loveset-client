"use client"

import { useState } from "react"
import "../styles/modals.css"

const InviteFriendModal = ({ onClose }) => {
  const [email, setEmail] = useState("")
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email) {
      // Simulate sending invitation
      setTimeout(() => {
        setIsSent(true)
      }, 1000)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Invite a Friend</h2>
        </div>

        <div className="modal-content">
          {!isSent ? (
            <>
              <p className="modal-description">
                Share MovieMatch with your friends and help them discover movies they'll love.
              </p>

              <form onSubmit={handleSubmit} className="invite-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Friend's Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your friend's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  Send Invitation
                </button>
              </form>
            </>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3 className="success-title">Invitation Sent!</h3>
              <p className="success-text">
                We've sent an invitation to {email}. They'll receive a link to join MovieMatch.
              </p>
              <button className="close-button" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InviteFriendModal

