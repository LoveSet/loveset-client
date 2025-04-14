import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import TermsOfServiceModal from "../modals/TermsOfServiceModal";
import TermsOfServiceModal from "../../../shared/components/modal/termsOfServiceModal";
import styles from "./premium.module.css";
import { FiRefreshCcw } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { CgInfinity } from "react-icons/cg";
import AppLayout from "../../../shared/components/appLayout/appLayout";
import useBillingService from "../../../shared/hooks/api/useBillingService";
import { CLIENT_URL } from "../../../shared/config/endpoints";
import { PADDLE_PRICE } from "../../../shared/config/integrations";
import { toast } from "react-toastify";
import PageLoader from "../../../shared/components/pageLoader/pageLoader";
import { CircularProgress } from "@mui/material";
import { useAuthState } from "../../../shared/context/useAuthContext";

function Premium() {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("6month");
  const [showTerms, setShowTerms] = useState(false);

  const plans = [
    {
      id: "weekly",
      name: "1-Week",
      price: "$5",
      perWeek: "$5/wk",
      savings: "0%",
      isBest: false,
    },
    {
      id: "monthly",
      name: "Monthly",
      price: "$12",
      perWeek: "$3/wk",
      savings: "0%",
      isBest: false,
    },
    {
      id: "6month",
      name: "6-Month",
      price: "$60",
      perWeek: "$2.50/wk",
      savings: "17%",
      isBest: true,
    },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  // const handleSubscribe = () => {
  //   // Simulate subscription process
  //   localStorage.setItem("isPremium", "true");
  //   localStorage.setItem("premiumPlan", selectedPlan);
  //   localStorage.setItem(
  //     "premiumExpiry",
  //     new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  //   );

  //   // Redirect to swiping page
  //   navigate("/app/discover");
  // };

  const [loading, setLoading] = useState(false);
  const { mutateAsync: getCustomer } =
    useBillingService.useGetCustomerService();

  const getPriceId = () => {
    if (selectedPlan == "weekly") {
      return PADDLE_PRICE.WEEKLY_PRICE_ID;
    } else if (selectedPlan == "monthly") {
      return PADDLE_PRICE.MONTHLY_PRICE_ID;
    } else {
      return PADDLE_PRICE.BI_ANNUALLY_PRICE_ID;
    }
  };

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      const response = await getCustomer().catch((err) => {
        setLoading(false);
        toast.error("An error occurred. Please try again.");
      });

      setLoading(false);

      if (response?.data) {
        const Paddle = window.Paddle;
        Paddle.Checkout.open({
          settings: {
            theme: "dark",
            successUrl: `${CLIENT_URL}/app/discover?action=subscribed`,
          },
          customer: {
            id: response?.data?.paddleCustomerId,
          },
          items: [
            {
              priceId: getPriceId(),
              quantity: 1,
            },
          ],
        });
      }
    } catch (err) {
      setLoading(false);
      toast.error("An error occurred. Please try again!");
    }
  };

  return (
    <AppLayout>
      {/* <PageLoader loading={loading} /> */}
      <div className={styles.premiumContainerWrapper}>
        <div className={styles.premiumContainer}>
          <div className={styles.premiumHeader}>
            <h1 className={styles.premiumTitle}>LoveSet Premium</h1>
            <p className={styles.premiumSubtitle}>
              Unlimited swipes, streaming availability, and more features
            </p>
          </div>

          <div className={styles.premiumFeatures}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <FiRefreshCcw />
              </span>
              <span className={styles.featureText}>Unlimited Swipes</span>
            </div>

            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <LuSearch />
              </span>
              <span className={styles.featureText}>Where to Stream</span>
            </div>

            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <FaRegTrashCan />
              </span>
              <span className={styles.featureText}>Delete from Watchlist</span>
            </div>

            {/* <div className={styles.featureItem}>
          <span className={styles.featureIcon}>🔔</span>
          <span className={styles.featureText}>New Release Alerts</span>
        </div> */}
          </div>

          <div className={styles.premiumPlans}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`${styles.planCard} ${selectedPlan === plan.id ? styles.selected : ""} ${plan.isBest ? styles.bestValue : ""}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.isBest && (
                  <div className={styles.bestBadge}>Best value</div>
                )}

                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planPrice}>{plan.price}</div>
                <div className={styles.planPerWeek}>{plan.perWeek}</div>

                {plan.savings !== "0%" ? (
                  <div className={styles.planSavings}>Save {plan.savings}</div>
                ) : (
                  <div style={{ height: "20.6px" }}></div>
                )}

                <div className={styles.planRadio}>
                  <div
                    className={`${styles.radioButton} ${selectedPlan === plan.id ? styles.radioButtonSelected : ""}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.subscriptionTerms}>
            By tapping "Continue", you will be charged and your subscription
            will automatically renew for the same price and duration until you
            cancel via Account Settings.
            {/* <button className={styles.termsLink} onClick={() => setShowTerms(true)}>
          Terms
        </button> */}
          </div>

          <div className={styles.subscriptionActions}>
            {user?.user?.premium ? (
              <button
                className={`${styles.subscribeButton} `}
                onClick={() => {
                  navigate("/app/settings");
                }}
              >
                Manage Subscription
              </button>
            ) : (
              <>
                <button
                  className={`${styles.subscribeButton} `}
                  onClick={loading ? () => {} : handleSubscribe}
                >
                  {loading ? (
                    <CircularProgress
                      style={{
                        color: "white",
                      }}
                      size={13}
                    />
                  ) : (
                    <>Continue</>
                  )}
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => navigate("/app/discover")}
                >
                  No Thanks
                </button>
              </>
            )}
          </div>

          {showTerms && (
            <TermsOfServiceModal onClose={() => setShowTerms(false)} />
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default Premium;
