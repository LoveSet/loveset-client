"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import InviteFriendModal from "../modals/InviteFriendModal";
import TermsOfServiceModal from "../modals/TermsOfServiceModal";
import styles from "../styles/homePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showTerms, setShowTerms] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const handleGoogleAuth = () => {
    // Simulate Google Auth
    const mockUser = {
      id: "user123",
      name: "Movie Lover",
      email: "user@example.com",
      isNewUser: true,
    };

    login(mockUser);

    // If new user, redirect to onboarding
    if (mockUser.isNewUser) {
      navigate("/onboarding");
    } else {
      navigate("/app/swipe");
    }
  };

  return (
    <div className={styles.homeContainer}>
    <div className={styles.homeContent}>
      <div className={styles.logoContainer}>
        {/* <span className={styles.logoIcon}>🎬</span> */}
        <h1 className={styles.logoText}>LoveSet</h1>
      </div>
  
      <h2 className={styles.tagline}>Your favorite movie in 1 swipe</h2>
  
      <p className={styles.description}>
        Discover movies and shows tailored to your taste. Swipe right on what
        you love, left on what you don't. Get personalized recommendations
        every time.
      </p>
  
      <div className={styles.authButtons}>
        <button className={styles.googleAuthButton} onClick={handleGoogleAuth}>
          <span className={styles.googleIcon}>G</span>
          <span>Continue with Google</span>
        </button>
  
        {/* <button className={styles.inviteButton} onClick={() => setShowInvite(true)}>
          Invite a friend
        </button> */}
      </div>
  
      <div className={styles.termsText}>
        By continuing, you agree to our
        <button className={styles.termsLink} onClick={() => setShowTerms(true)}>
          Terms of Service
        </button> {" "}
        &
        <button className={styles.termsLink} onClick={() => setShowTerms(true)}>
          Privacy Policy
        </button>
      </div>
    </div>
  
    {showTerms && <TermsOfServiceModal onClose={() => setShowTerms(false)} />}
    {showInvite && <InviteFriendModal onClose={() => setShowInvite(false)} />}
  </div>
  
  );
};

export default HomePage;
