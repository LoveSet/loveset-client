"use client";
import { Modal, Box } from "@mui/material";
import ReactPlayer from "react-player";
import "../../styles/modals.css";

const YouTubeVideoModal = ({ modal, videoId }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <Modal
      open={modal.open}
      onClose={modal.handleClose}
      aria-labelledby="youtube-video-modal"
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
          overflow: "hidden", // Prevent scrollbars
        }}
        className="modalType1"
      >
        <div className="modal-container youtube-modal">
          <div
            className="modal-content"
            style={{
              position: "relative",
              paddingTop: "56.25%", // 16:9 aspect ratio
              width: "100%",
              height: "0", // Height is determined by paddingTop
            }}
          >
            <ReactPlayer
              url={videoUrl}
              playing
              controls
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default YouTubeVideoModal;
