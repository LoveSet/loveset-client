import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import OutOfSwipesModal from "../modals/OutOfSwipesModal";
import OutOfSwipesModal from "../../../shared/components/modal/outOfSwipesModal";
// import { useAuth } from "../../../contexts/AuthContext";
import styles from "./discover.module.css";
import { motion, useMotionValue, useTransform } from "framer-motion";
import AppLayout from "../../../shared/components/appLayout/appLayout";
import { useDiscover } from "../../../shared/context/useDiscoverContext";
import { FILES_URL } from "../../../shared/config/endpoints";
import openInNewTab from "../../../shared/utils/openInNewTab";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import useDiscoverService from "../../../shared/hooks/api/useDiscoverService";
import { useModal } from "../../../shared/hooks/useModal";
import YouTubeVideoModal from "../../../shared/components/modal/youtubeVideoModal";
import { GridLoader, HashLoader, PacmanLoader } from "react-spinners";
import { CircularProgress, Skeleton } from "@mui/material";
import { AuthActionSuccess } from "../../../shared/context/reducers/authActions";
import { useAuthState } from "../../../shared/context/useAuthContext";
import InviteFriendModal from "../../../shared/components/modal/inviteFriendModal";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import useUserService from "../../../shared/hooks/api/useUserService";
import PageLoader from "../../../shared/components/pageLoader/pageLoader";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet";

// Mock movie data

const MovieCard = ({
  movie,
  index,
  totalCards,
  handleLike,
  handleDislike,
  handleViewDetails,
  handleWatchTrailer,
  handleShareMovie,
  trailerLoading,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image load
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  // Check if this card is at the front of the stack
  const isFront = index === totalCards - 1;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : index % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const swipeThreshold = isMobile ? 30 : 100;

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > swipeThreshold) {
      if (x.get() > 0) {
        handleLike();
      } else {
        handleDislike();
      }
    }
  };

  const scale = isFront ? 1 : 0.98 - (totalCards - index - 1) * 0.02;
  const zIndex = index;

  return (
    <motion.div
      className={styles.movieCard}
      style={{
        x,
        // opacity, // no need for opacity since we are working with like and dislike
        rotate,
        zIndex,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
      }}
      animate={{
        scale,
        y: (totalCards - index - 1) * 10, // Slight vertical offset for stacked appearance
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
      transition={{
        type: "spring",
        // damping: 50,
        damping: 10,
        stiffness: 100,
      }}
    >
      <div className={styles.moviePoster} style={{ pointerEvents: "none" }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        )}
        <img
          src={
            movie?.posterUrl?.includes("https")
              ? movie?.posterUrl
              : FILES_URL + movie?.posterUrl
          }
          alt={movie.title}
          onLoad={() => setImageLoaded(true)} // Set imageLoaded to true when the image loads
          style={{ display: imageLoaded ? "block" : "none" }} // Hide the image until it loads
        />
        <motion.div
          className={`${styles.swipeOverlay} ${styles.likeOverlay}`}
          style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
        >
          LIKE
        </motion.div>

        <motion.div
          className={`${styles.swipeOverlay} ${styles.dislikeOverlay}`}
          style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
        >
          NOPE
        </motion.div>
      </div>

      <div className={styles.movieInfo}>
        <button
          className={styles.playButton}
          onClick={(e) => {
            e.stopPropagation();
            // handleWatchTrailer(movie)
            handleViewDetails(movie);
          }}
          // onClick={() => handleViewDetails(movies[movies.length - 1])}
          style={{ pointerEvents: "auto" }}
          aria-label="Play trailer"
        >
          <span className={styles.playIcon}>▶</span>
        </button>

        <h2 className={styles.movieTitle}>
          {movie.title}{" "}
          <span className={styles.movieYear}>({movie?.year})</span>
        </h2>

        <div className={styles.movieDirector}>
          Directed by {movie?.director}
        </div>

        <div className={styles.movieGenres}>
          {movie?.genres.map((genre, index) => (
            <span key={index} className={styles.genreTag}>
              {genre}
            </span>
          ))}
        </div>

        <div className={styles.movieActions}>
          {/* <a href={movie?.trailer} target="_blank"> */}
          <button
            className={styles.trailerButton}
            onClick={
              !trailerLoading ? () => handleWatchTrailer(movie) : () => {}

              // openInNewTab(movie?.trailerUrl)
            }
          >
            {trailerLoading ? (
              <CircularProgress
                style={{
                  color: "white",
                }}
                size={20}
              />
            ) : (
              <>
                <span className={styles.trailerIcon}>▶</span>
                <span>Watch Trailer</span>
              </>
            )}
          </button>
          {/* </a> */}
          {/* <CopyToClipboard
            text={this.state.value}
            onCopy={() => {
              toast.info("Copied to Clipboard!");
            }}
          > */}
          <button
            className={styles.shareButton}
            onClick={() => {
              navigator.clipboard.writeText(
                `https://loveset.platle.com/content/${movie?.slug}`
              );
              toast.info("Copied to clipboard!");
            }}
          >
            <span className={styles.shareIcon}>📤</span>
            <span>Share</span>
          </button>
          {/* </CopyToClipboard> */}
        </div>
      </div>
    </motion.div>
  );
};

function Discover() {
  const { user, dispatch } = useAuthState();

  const navigate = useNavigate();

  const { movies, setMovies, handleDiscovery, loading, handleReplenish } =
    useDiscover();

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current && !loading && movies?.length < 1) {
      handleDiscovery([]);
      hasRun.current = true; // Mark as executed
    }
  }, [loading]);

  // const { user } = useAuth();
  // const user = {
  //   id: "user123",
  //   name: "Movie Lover",
  //   email: "user@example.com",
  //   isNewUser: true,
  // };
  // const [movies, setMovies] = useState([...mockMovies]);
  const [swipesLeft, setSwipesLeft] = useState(20 - user?.user?.swipesUsed); // Free tier: 20 swipes per day
  const [showOutOfSwipes, setShowOutOfSwipes] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);
  const [dislikedMovies, setDislikedMovies] = useState([]);
  // const [isPremium, setIsPremium] = useState(user?.user?.premium);

  // useEffect(() => {
  //   // Check if user is premium
  //   const userPremium = localStorage.getItem("isPremium");
  //   if (userPremium === "true") {
  //     setIsPremium(true);
  //   }

  //   // Load liked movies from localStorage
  //   const storedLikedMovies = localStorage.getItem("likedMovies");
  //   if (storedLikedMovies) {
  //     setLikedMovies(JSON.parse(storedLikedMovies));
  //   }

  //   // Load disliked movies from localStorage
  //   const storedDislikedMovies = localStorage.getItem("dislikedMovies");
  //   if (storedDislikedMovies) {
  //     setDislikedMovies(JSON.parse(storedDislikedMovies));
  //   }

  //   // Load remaining swipes from localStorage
  //   const storedSwipes = localStorage.getItem("swipesLeft");
  //   if (storedSwipes) {
  //     setSwipesLeft(Number.parseInt(storedSwipes));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Save liked movies to localStorage
  //   localStorage.setItem("likedMovies", JSON.stringify(likedMovies));

  //   // Save disliked movies to localStorage
  //   localStorage.setItem("dislikedMovies", JSON.stringify(dislikedMovies));

  //   // Save remaining swipes to localStorage
  //   localStorage.setItem("swipesLeft", swipesLeft.toString());
  // }, [likedMovies, dislikedMovies, swipesLeft]);

  const { mutateAsync: like } = useDiscoverService.useLikeService();
  const { mutateAsync: pass } = useDiscoverService.usePassService();

  const handleLikeShow = async (contentId) => {
    try {
      const response = await like({
        payload: {
          contentId,
        },
      });
      if (response) {
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handlePassShow = async (contentId) => {
    try {
      const response = await pass({
        payload: {
          contentId,
        },
      });

      if (response) {
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleUpdateSwipesUsed = () => {
    // update `swipesUsed` in local user
    const userObj = {
      token: user?.token,
      currentUser: { ...user?.user, swipesUsed: user?.user?.swipesUsed + 1 },
      permission: user?.permission,
    };
    dispatch(AuthActionSuccess(userObj));
  };

  const modal2 = useModal();

  const handleLike = () => {
    if (swipesLeft <= 0 && !user?.user?.premium) {
      // setShowOutOfSwipes(true);
      modal2.handleOpen();
      return;
    }

    const currentMovie = movies[movies.length - 1];
    handleLikeShow(currentMovie?.id);

    // setLikedMovies([...likedMovies, currentMovie]);

    if (!user?.user?.premium) {
      setSwipesLeft(swipesLeft - 1);
      handleUpdateSwipesUsed();
    }

    handleReplenish();
    // handleDiscovery(movies.slice(0, -1));

    // Remove the top card
    setMovies(movies.slice(0, -1));

    // If we've gone through all movies, reset
    // if (movies.length <= 1) {
    //   setMovies([...mockMovies]);
    // }
  };

  const handleDislike = () => {
    if (swipesLeft <= 0 && !user?.user?.premium) {
      // setShowOutOfSwipes(true);
      modal2.handleOpen();
      return;
    }

    const currentMovie = movies[movies.length - 1];
    handlePassShow(currentMovie?.id);
    // setDislikedMovies([...dislikedMovies, currentMovie]);

    if (!user?.user?.premium) {
      setSwipesLeft(swipesLeft - 1);
      handleUpdateSwipesUsed();
    }

    // handleDiscovery(movies.slice(0, -1));
    handleReplenish();

    // Remove the top card
    setMovies(movies.slice(0, -1));

    // If we've gone through all movies, reset
    // if (movies.length <= 1) {
    //   setMovies([...mockMovies]);
    // }
  };

  // const handleSurpriseMe = () => {
  //   // Shuffle the movies array
  //   const shuffled = [...mockMovies].sort(() => Math.random() - 0.5);
  //   setMovies(shuffled);
  // };

  const handleViewDetails = (movie) => {
    navigate(`/content/${movie?.slug}`);
  };

  const handleShareMovie = (movie) => {
    // Implement share functionality
    alert(`Share URL: moviematch.com/movie/${movie.id}`);
  };

  const modal = useModal();
  const [videoId, setVideoId] = useState(null);
  const { mutateAsync: getYoutubeVideo } =
    useDiscoverService.useGetYoutubeUrlService();
  const [trailerLoading, setTrailerLoading] = useState(false);

  const handleWatchTrailer = async (movie, e) => {
    try {
      if (e) e.stopPropagation();
      setTrailerLoading(true);

      if (movie?.trailerUrl?.includes("search_query")) {
        // Fetch actual YouTube URL
        const response = await getYoutubeVideo({
          query: {
            contentId: movie?.id,
          },
        });

        if (response?.data?.trailerUrl) {
          const youtubeUrl = response.data.trailerUrl;

          const updatedMovies = movies.map((m) =>
            m.id === movie.id ? { ...m, trailerUrl: youtubeUrl } : m
          );
          setMovies(updatedMovies);

          // open modal here
          setVideoId(youtubeUrl.split("v=")[1]);
          modal.handleOpen();
        } else {
          toast.error("Failed to fetch YouTube trailer. Please try again.");
        }
      } else {
        // Use existing URL and open modal
        setVideoId(movie?.trailerUrl.split("v=")[1]);
        modal.handleOpen();
      }
      setTrailerLoading(false);
    } catch (error) {
      console.error("Error fetching trailer:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const modal3 = useModal();

  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (action == "subscribed") {
      // isVerifyingPayment = true

      const userObj = {
        token: user?.token,
        currentUser: { ...user?.user, isVerifyingPayment: true },
        permission: user?.permission,
      };
      dispatch(AuthActionSuccess(userObj));

      handleCheckSubscriptionStatus();
    }
  }, [action]);

  const [loading00, setLoading00] = useState(false);
  const { mutateAsync: getUser } = useUserService.useGetUserService();

  async function handleCheckSubscriptionStatus() {
    try {
      setLoading00(true);
      let req = {
        params: {
          username: user?.user?.username,
        },
      };
      const response = await getUser(req).catch((err) => {
        setLoading00(false);
        toast.error("An error occurred. Please try again or contact @platle!");
      });

      if (response?.data?.premium && !response?.data?.unsubscribed) {
        const userObj = {
          token: user?.token,
          currentUser: {
            ...response?.data,
          },
          permission: [response?.data?.admin ? "admin" : "user"],
        };
        dispatch(AuthActionSuccess(userObj));

        setShowConfetti(true);
        setLoading00(false);
      } else {
        setTimeout(handleCheckSubscriptionStatus, 3000);
      }
    } catch (err) {
      setLoading00(false);
      toast.error("An error occurred. Please try again or contact @platle!");
    }
  }

  return (
    <AppLayout>
      <Helmet>
        <style>{`
              body {
                overflow-y: hidden;
              }
              `}</style>
      </Helmet>
      <PageLoader loading={loading00} />
      {showConfetti && (
        <Confetti
          width={width - 20}
          height={height - 20}
          numberOfPieces={700}
          recycle={false}
        />
      )}
      <YouTubeVideoModal modal={modal} videoId={videoId} />
      <OutOfSwipesModal
        modal={modal2}
        onUpgrade={() => navigate("/app/premium")}
        onInviteFriend={() => {
          modal2.handleClose();
          modal3.handleOpen();
        }}
      />
      <InviteFriendModal modal={modal3} />

      <div className={styles.swipingContainerWrapper}>
        <div className={styles.swipingContainer}>
          <div className={styles.cardStack}>
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                index={index}
                totalCards={movies.length}
                handleLike={handleLike}
                handleDislike={handleDislike}
                handleViewDetails={() => handleViewDetails(movie)}
                handleWatchTrailer={(movie, e) => handleWatchTrailer(movie, e)}
                handleShareMovie={() => handleShareMovie(movie)}
                trailerLoading={trailerLoading}
              />
            ))}
            {loading && (
              <HashLoader
                color={"#5891ff"}
                loading={true}
                // cssOverride={override}
                size={86}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </div>

          <div
            className={styles.swipeButtons}
            style={{
              height: "56px",
            }}
          >
            {/* <button className={styles.dislikeButton} onClick={handleDislike}>
            <span className={styles.dislikeIcon}>✕</span>
          </button>

          <button className={styles.detailsButton} onClick={() => handleViewDetails(movies[movies.length - 1])}>
            <span className={styles.detailsIcon}>ℹ️</span>
          </button>

          <button className={styles.likeButton} onClick={handleLike}>
            <span className={styles.likeIcon}>♥</span>
          </button> */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Discover;
