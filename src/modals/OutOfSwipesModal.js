"use client"
import "../styles/modals.css"

const OutOfSwipesModal = ({ onClose, onUpgrade }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-content">
          <div className="out-of-swipes-icon">😢</div>

          <h2 className="modal-title">You're out of swipes</h2>

          <p className="modal-description">
            MovieMatch uses purchases to sustain the business. More swipes are coming soon, or you can upgrade to get
            more now.
          </p>

          <div className="modal-actions">
            <button className="upgrade-button" onClick={onUpgrade}>
              Get more swipes now
            </button>

            <button className="cancel-button" onClick={onClose}>
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutOfSwipesModal

