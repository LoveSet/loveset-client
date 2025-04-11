import { useState } from "react";

function useModal(status) {
  const [open, setOpen] = useState(status);
  const handleOpen = (e = null) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpen(true);
  };
  const handleClose = (e = null) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpen(false);
  };

  return { open, handleOpen, handleClose };
}
export { useModal };
