"use client";
import { Modal, Box } from "@mui/material";
import "../../styles/modals.css";
import { useAuthState } from "../../context/useAuthContext";

const OutOfSwipesModal = ({ modal, onUpgrade, onInviteFriend }) => {
  const { user } = useAuthState();

  return (
    <Modal
      open={modal.open}
      onClose={modal.handleClose}
      aria-labelledby="out-of-swipes-modal"
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
        className="modalType1"
      >
        <div className="modal-container">
          <button className="modal-close" onClick={modal.handleClose}>
            ×
          </button>

          <div className="modal-content">
            <div className="out-of-swipes-icon">😢</div>

            <h2 className="modal-title modal-title-center">
              You're out of swipes
            </h2>

            <p className="modal-description">
              LoveSet uses purchases to sustain the business. More swipes are
              coming soon, or you can upgrade to get more now.
            </p>

            <div className="modal-actions">
              <button className="upgrade-button" onClick={onUpgrade}>
                Upgrade to Premium
              </button>

              {/* will show if you have not done so already */}
              {!user?.user?.hasReferred && (
                <button className="invite-button" onClick={onInviteFriend}>
                  Invite Friend for 10 Free Swipes
                </button>
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default OutOfSwipesModal;
