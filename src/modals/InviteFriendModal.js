"use client"

import { useState } from "react"
import "../styles/modals.css"
import { ClipboardCopy } from "lucide-react"

const GetFreeSwipesModal = ({ onClose }) => {
  const [isCopied, setIsCopied] = useState(false)

  // This would be your unique referral URL
  const referralUrl = "https://moviematch.com/ref/2CCF3A"

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(referralUrl)
    setIsCopied(true)

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <h2 className="modal-title modal-title-center">Get Free Swipes!</h2>
        </div>

        <div className="modal-content">
          {/* <div className="free-swipes-icon">
            <img src="/coins.png" alt="Gold coins" className="coins-image" />
          </div> */}

          <p className="modal-description">
            Invite friends to MovieMatch and get 10 free swipes when they sign up using your referral link!
          </p>

          <div className="invite-form">
            <div className="form-group">
              <label htmlFor="referral-url" className="form-label">
                Your Referral Link
              </label>
              <div className="url-input-container">
                <input type="text" id="referral-url" className="form-input url-input" value={referralUrl} readOnly />
                <button className="copy-button" onClick={handleCopyUrl} aria-label="Copy referral link">
                  <ClipboardCopy size={18} />
                </button>
              </div>
              {isCopied && <p className="copied-message">Copied to clipboard!</p>}
            </div>

            <div className="referral-info">
              <h3 className="referral-title">How it works:</h3>
              <ol className="referral-steps">
                <li>Share your unique link with friends</li>
                <li>Friend downloads MovieMatch</li>
                <li>You get 10 free swipes when they sign up!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetFreeSwipesModal

