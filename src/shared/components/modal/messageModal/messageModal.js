import React from "react";
import {
  Box,
  // IconButton,
  // OutlinedInput,
  // InputLabel,
  // InputAdornment,
  // TextField,
  // FormHelperText,
  Modal,
  Button,
  // Select,
  // MenuItem,
  // FormControl,
} from "@mui/material";
import {
  useModalMessageStyle,
  // useTranspBtnStyle,
} from "../../../hooks/useStyles";

function MessageModal({
  modal,
  disableBackdrop = false,
  message,
  action,
  moreBtns,
  closeBtnDisabled = false,
  showClose = true,
}) {
  // const classes3 = useTranspBtnStyle();

  // color: "#0091ea !important",

  const transpBtnSx = {
    color: "#5891ff !important",
  };

  return (
    <Modal
      open={modal.open}
      onClose={modal.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={disableBackdrop ? { onClick: () => {} } : undefined}
    >
      <Box sx={useModalMessageStyle.modalStyle} className="modalType1">
        <div>
          <p style={{ fontFamily: "Inter" }}>{message}</p>
        </div>
        <div style={useModalMessageStyle.modalFooterWrapperStyle}>
          <div style={useModalMessageStyle.modalFooterStyle}>
            {moreBtns}
            {action &&
              action.map((item) => (
                <Button
                  style={{
                    fontFamily: "Inter",
                  }}
                  onClick={item.onClick}
                  sx={transpBtnSx}
                  className={`${item.disabled ? "disabled-btn" : ""}`}
                  disabled={item.disabled || false}
                >
                  {item.label}
                </Button>
              ))}

            {showClose && (
              <Button
                style={{
                  fontFamily: "Inter",
                }}
                onClick={modal.handleClose}
                sx={transpBtnSx}
                className={` ${closeBtnDisabled ? "disabled-btn" : ""}`}
                disabled={closeBtnDisabled}
              >
                CLOSE
              </Button>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default MessageModal;
