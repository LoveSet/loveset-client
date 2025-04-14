const useModalMessageStyle = {
  modalStyle: {
    position: "absolute",
    outline: "none",
    top: "49%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "white",
    // color: "white",
    borderRadius: "calc(0.5rem - 1px)",
    boxShadow: 24,
    padding: "14px 16px 8px 16px",
    width: 342,
    paddingBottom: "2.5px",
    // border: "1px solid rgba(63 63 70)",
  },
  modalFooterWrapperStyle: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
    marginTop: "15px",
    marginBottom: "9px",
  },
  modalFooterStyle: {
    display: "flex",
    flexDirection: "row",
  },
};

export { useModalMessageStyle };
