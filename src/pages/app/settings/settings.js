import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../legacy/contexts/AuthContext";
import TermsOfServiceModal from "../../../shared/components/modal/termsOfServiceModal";
import styles from "./settings.module.css";
import AppLayout from "../../../shared/components/appLayout/appLayout";
import { useAuthState } from "../../../shared/context/useAuthContext";
import { useModal } from "../../../shared/hooks/useModal";
import useBillingService from "../../../shared/hooks/api/useBillingService";
import MessageModal from "../../../shared/components/modal/messageModal/messageModal";
import { AuthActionSuccess } from "../../../shared/context/reducers/authActions";
import PrivacyModal from "../../../shared/components/modal/privacyModal";

function Settings() {
  const { user, dispatch } = useAuthState();
  const navigate = useNavigate();
  // const { user, logout } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [premiumPlan, setPremiumPlan] = useState("");
  const [premiumExpiry, setPremiumExpiry] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [preferences, setPreferences] = useState({
    contentTypes: [],
    filmIndustries: [],
    genres: [],
    timePeriods: [],
    favorites: "",
    favoriteMovie: "",
  });

  // useEffect(() => {
  //   // Check if user is premium
  //   const userPremium = localStorage.getItem("isPremium");
  //   if (userPremium === "true") {
  //     setIsPremium(true);
  //     setPremiumPlan(localStorage.getItem("premiumPlan") || "");
  //     setPremiumExpiry(localStorage.getItem("premiumExpiry") || "");
  //   }

  //   // Load user preferences
  //   const storedPreferences = localStorage.getItem("userPreferences");
  //   if (storedPreferences) {
  //     setPreferences(JSON.parse(storedPreferences));
  //   }
  // }, []);

  const logout = () => {};

  const handleLogout = () => {
    window.localStorage.clear();
    window.location = "/";
  };

  const handleEditPreferences = () => {
    navigate("/onboarding");
  };

  const handleUpgradePremium = () => {
    navigate("/app/premium");
  };

  const formatExpiryDate = (timestamp) => {
    if (!timestamp) return "";

    // Convert Unix timestamp (seconds) to milliseconds for JavaScript Date
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const modal = useModal();

  const [loading3, setLoading3] = useState(false);
  const { mutateAsync: unsubscribe } =
    useBillingService.useUnsubscribeService();

  async function handleUnsubscribe() {
    try {
      setLoading3(true);
      const response = await unsubscribe({}).catch((err) => {
        setLoading3(false);
      });

      if (response) {
        const userObj = {
          token: user?.token,
          currentUser: { ...user?.user, ...response?.data },
          permission: user?.permission,
        };
        dispatch(AuthActionSuccess(userObj));
      }
      setLoading3(false);
    } catch (err) {
      setLoading3(false);
    }
  }

  const modal2 = useModal();
  const modal3 = useModal();

  return (
    <AppLayout>
      <MessageModal
        modal={modal}
        message={`Are you sure you want to unsubscribe? We're sad to see you go!`}
        action={[
          {
            label: "Cancel",
            onClick: modal.handleClose,
          },
          {
            label: "Unsubscribe",
            onClick: async () => {
              await handleUnsubscribe();
              modal.handleClose();
            },
            disabled: loading3,
          },
        ]}
        showClose={false}
      />

      <TermsOfServiceModal modal={modal2} />
      <PrivacyModal modal={modal3} />

      <div className={styles.settingsContainer}>
        <div className={styles.settingsHeader}>
          <h1 className={styles.settingsTitle}>Settings</h1>
        </div>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Profile</h2>

          <div className={styles.profileInfo}>
            <div className={styles.userAvatar}>{user?.user?.name?.[0]}</div>

            <div className={styles.userDetails}>
              <div className={styles.userName}>{user?.user?.name}</div>
              <div className={styles.userEmail}>@{user?.user?.username}</div>
            </div>
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Subscription</h2>

          {!user?.user?.premium || user?.user?.unsubscribed ? (
            <div className={styles.upgradePrompt}>
              <p>Upgrade to Premium for unlimited swipes and more features</p>
              <button
                className={styles.upgradeButton}
                onClick={handleUpgradePremium}
              >
                Upgrade Now
              </button>
            </div>
          ) : (
            <div className={styles.subscriptionInfo}>
              <div className={styles.premiumBadge}>Premium</div>

              <div className={styles.planDetails}>
                <div className={styles.planName}>
                  {user?.user?.subscriptionPlan === "weekly"
                    ? "1-Week Plan"
                    : user?.user?.subscriptionPlan === "monthly"
                      ? "Monthly Plan"
                      : user?.user?.subscriptionPlan === "biannually"
                        ? "6-Month Plan"
                        : "Premium Plan"}
                </div>

                <div className={styles.planExpiry}>
                  Expires on{" "}
                  {formatExpiryDate(user?.user?.subscriptionExpiring)}
                </div>
              </div>

              <button
                className={styles.manageSubscriptionButton}
                onClick={modal.handleOpen}
              >
                Manage Subscription
              </button>
            </div>
          )}
        </div>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Preferences</h2>

          <div className={styles.preferencesSummary}>
            <div className={styles.preferenceItem}>
              <div className={styles.preferenceLabel}>Content Types</div>
              <div className={styles.preferenceValue}>
                {user?.user?.contentTypes.join(", ") || "Not set"}
              </div>
            </div>

            <div className={styles.preferenceItem}>
              <div className={styles.preferenceLabel}>Industries</div>
              <div className={styles.preferenceValue}>
                {user?.user?.filmIndustries.join(", ") || "Not set"}
              </div>
            </div>

            <div className={styles.preferenceItem}>
              <div className={styles.preferenceLabel}>Genres</div>
              <div className={styles.preferenceValue}>
                {user?.user?.genres.join(", ") || "Not set"}
              </div>
            </div>
            <div className={styles.preferenceItem}>
              <div className={styles.preferenceLabel}>Time Periods</div>
              <div className={styles.preferenceValue}>
                {user?.user?.timePeriods.join(", ") || "Not set"}
              </div>
            </div>
          </div>

          <button
            className={styles.editPreferencesButton}
            onClick={handleEditPreferences}
          >
            Edit Preferences
          </button>
        </div>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Account</h2>

          <div className={styles.accountActions}>
            <button
              className={styles.accountActionButton}
              // onClick={() => setShowTerms(true)}
              onClick={modal2.handleOpen}
            >
              Terms of Service
            </button>
            <button
              className={styles.accountActionButton}
              // onClick={() => setShowTerms(true)}
              onClick={modal3.handleOpen}
            >
              Privacy Policy
            </button>

            {/* <button className={styles.accountActionButton}>Contact Support</button> */}

            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* {showTerms && (
          <TermsOfServiceModal onClose={() => setShowTerms(false)} />
        )} */}
      </div>
    </AppLayout>
  );
}

export default Settings;
