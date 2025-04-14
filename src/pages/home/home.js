import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import InviteFriendModal from "../modals/InviteFriendModal";
import InviteFriendModal from "../../shared/components/modal/inviteFriendModal";
import TermsOfServiceModal from "../../shared/components/modal/termsOfServiceModal";
import PrivacyModal from "../../shared/components/modal/privacyModal";
import styles from "./home.module.css";
import useAuthService from "../../shared/hooks/api/useAuthService";
import { useAuthState } from "../../shared/context/useAuthContext";
import { AuthActionSuccess } from "../../shared/context/reducers/authActions";
import { useGoogleLogin } from "@react-oauth/google";
import { sentenceCase } from "sentence-case";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PageLoader from "../../shared/components/pageLoader/pageLoader";
import useGeoLocation from "../../shared/hooks/useGeoLocation";
import { useModal } from "../../shared/hooks/useModal";

function Home() {
  const { mutateAsync: google } = useAuthService.useGoogleService();

  const [loading, setLoading] = useState(false);

  const { user, dispatch } = useAuthState();

  const [searchParams] = useSearchParams();

  const ref = searchParams.get("ref");
  // const returnTo = searchParams.get("return_to");

  // const [country, setCountry] = useState(null);

  const location = useGeoLocation();

  const navigate = useNavigate();
  // const { login } = useAuth();
  // const login = () => {};
  const [showTerms, setShowTerms] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  // const handleGoogleAuth = () => {
  //   // Simulate Google Auth
  //   const mockUser = {
  //     id: "user123",
  //     name: "Movie Lover",
  //     email: "user@example.com",
  //     isNewUser: true,
  //   };

  //   login(mockUser);

  //   // If new user, redirect to onboarding
  //   if (mockUser.isNewUser) {
  //     navigate("/onboarding");
  //   } else {
  //     navigate("/app/discover");
  //   }
  // };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log("tokenResponse", tokenResponse.code);
      setLoading(true);

      try {
        let payload = { code: tokenResponse?.code };

        if (ref) payload.ref = ref;
        if (location) payload.country = location?.country;
        if (location) payload.location = location;

        const response = await google({
          payload,
        }).catch((error) => {
          toast.error(sentenceCase(error.message));
          setLoading(false);
        });

        if (response) {
          // setLoading(false);

          const userObj = {
            token: response?.data?.token,
            currentUser: response?.data,
            permission: ["user"],
          };

          dispatch(AuthActionSuccess(userObj));

          // if (returnTo) {
          //   window.location = decodeURIComponent(returnTo);
          // } else {
          //   if (pathname == "/login") {
          //     window.location = `${rootAppUrl}/home`;
          //   } else {
          //     window.location = pathname;
          //   }
          // }
          window.location = response?.data?.next;
        }
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred. Please try again.");
      }
    },
    flow: "auth-code",
  });

  const modal = useModal();
  const modal2 = useModal();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        // hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <PageLoader loading={loading} />
      <TermsOfServiceModal modal={modal} />
      <PrivacyModal modal={modal2} />

      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <div className={styles.logoContainer}>
            {/* <span className={styles.logoIcon}>🎬</span> */}
            <h1 className={styles.logoText}>LoveSet</h1>
          </div>

          <h2 className={styles.tagline}>Your favorite movie in 1 swipe</h2>

          <p className={styles.description}>
            Discover movies and shows tailored to your taste. Swipe right on
            what you love, left on what you don't. Get personalized
            recommendations every time.
          </p>

          <div className={styles.authButtons}>
            {user?.token ? (
              <button
                className={styles.googleAuthButton}
                onClick={() => {
                  navigate("/app/discover");
                }}
              >
                Open LoveSet
              </button>
            ) : (
              <button
                className={styles.googleAuthButton}
                // onClick={handleGoogleAuth}
                onClick={() => login()}
              >
                <span className={styles.googleIcon}>G</span>
                <span>Continue with Google</span>
              </button>
            )}

            {/* <button className={styles.inviteButton} onClick={() => setShowInvite(true)}>
          Invite a friend
        </button> */}
          </div>

          <div className={styles.termsText}>
            By continuing, you agree to our
            <button className={styles.termsLink} onClick={modal.handleOpen}>
              Terms of Service
            </button>{" "}
            &
            <button className={styles.termsLink} onClick={modal2.handleOpen}>
              Privacy Policy
            </button>
          </div>
        </div>

        {/* {showTerms && (
          <TermsOfServiceModal onClose={() => setShowTerms(false)} />
        )}
        {showInvite && (
          <InviteFriendModal onClose={() => setShowInvite(false)} />
        )} */}
      </div>
    </>
  );
}

export default Home;
