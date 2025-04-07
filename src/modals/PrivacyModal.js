"use client"
import { Modal, Box } from "@mui/material"
import "../styles/modals.css"

const PrivacyModal = ({ open=true, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="terms-of-service-modal"
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
      >
        <div className="modal-container terms-modal">
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

          <div className="modal-header">
            <h2 className="modal-title">Privacy Policy</h2>
            <p className="modal-subtitle">Last Updated: April 6, 2025</p>
          </div>

          <div className="modal-content terms-content">
            <div className="terms-section">
              <h3>Welcome to MovieMatch</h3>
              <p>
                The following terms of service govern your access to and use of: (a) our website including any content,
                functionality, offered on or through moviematch.com (the "MovieMatch Website"); (b) our web application
                (the "MovieMatch Application"); (c) includes any text, pictures, media, data, text, information and
                other materials or content (collectively, the "Content") contained on or provided through (a) and (b);
                and (d) all other Content, products or services provided by us to you.
              </p>
            </div>

            <div className="terms-section">
              <h3>Agreement</h3>
              <p>
                These Terms form an agreement between MovieMatch, ("MovieMatch", "us", "we", "our") and you. The term
                "you", "your" or "User" refers to the person or entity browsing, installing, downloading, accessing or
                otherwise using the Services ("use" or "using" in these Terms will mean any of the foregoing).
              </p>
            </div>

            <div className="terms-section">
              <h3>By clicking to accept the terms of service, you:</h3>
              <ul>
                <li>Represent and warrant that you have reached the legal age of majority in your jurisdiction.</li>
                <li>You have the capacity to enter into binding obligations.</li>
                <li>
                  All information supplied by you to us through the Services is true, accurate, current, and complete.
                </li>
                <li>
                  Agree to be bound by and comply with these Terms and the relevant terms of the Contract (as defined
                  below and as applicable).
                </li>
              </ul>
            </div>

            <div className="terms-section">
              <h3>Privacy Policy</h3>
              <p>
                Our Privacy Policy describes how we handle the information you provide to us when you use our Services.
                You understand that through your use of the Services you consent to the collection and use of this
                information.
              </p>
            </div>

            <div className="terms-section">
              <h3>Subscription and Billing</h3>
              <p>
                MovieMatch offers both free and premium subscription options. By subscribing to MovieMatch Premium, you
                agree to the recurring billing terms. Your subscription will automatically renew at the end of each
                billing period unless you cancel before the renewal date.
              </p>
            </div>
          </div>

          <div className="modal-footer">
            <button className="accept-button" onClick={onClose}>
              I Accept
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default PrivacyModal

