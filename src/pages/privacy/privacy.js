import React from "react";
import styles from "./privacy.module.css";
import Home from "../home/home";
import { useModal } from "../../shared/hooks/useModal";
import { useNavigate } from "react-router-dom";
import PrivacyModal from "../../shared/components/modal/privacyModal";
// import PrivacyModal from "../../shared/components/modal/privacyModal/privacyModal";

function Privacy() {
  const modal = useModal(true);
  const navigate = useNavigate();

  return (
    <div className={styles.terms}>
      <PrivacyModal
        modal={modal}
        closeAction={() => {
          navigate("/login");
        }}
      />
      <Home />
    </div>
  );
}

export default Privacy;
