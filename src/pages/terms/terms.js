import React from "react";
import styles from "./terms.module.css";
import Home from "../home/home";
import { useModal } from "../../shared/hooks/useModal";
import { useNavigate } from "react-router-dom";
// import TermsModal from "../../shared/components/modal/termsModal/termsModal";
import TermsOfServiceModal from "../../shared/components/modal/termsOfServiceModal";

function Terms() {
  const modal = useModal(true);
  const navigate = useNavigate();

  return (
    <div className={styles.terms}>
      <TermsOfServiceModal
        modal={modal}
        closeAction={() => {
          navigate("/login");
        }}
      />
      <Home />
    </div>
  );
}

export default Terms;
