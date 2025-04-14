import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./watchlist.module.css";
import AppLayout from "../../../shared/components/appLayout/appLayout";
import { useAuthState } from "../../../shared/context/useAuthContext";
import useWatchlistService from "../../../shared/hooks/api/useWatchlistService";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material"; // Import Skeleton
import { FILES_URL } from "../../../shared/config/endpoints";
import PageLoader from "../../../shared/components/pageLoader/pageLoader";

function Watchlist() {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const [likedMovies, setLikedMovies] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({}); // Track image loading state for each movie

  let limit = 10;
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [watchlist, setWatchlist] = useState([]);

  const { mutateAsync: getWatchlist } =
    useWatchlistService.useGetWatchlistService();

  const handleGetWatchlist = async () => {
    try {
      const response = await getWatchlist({
        query: {
          limit,
          page: page + 1,
        },
      }).catch((err) => {
        toast.error("An error occurred while getting your watchlist.");
      });
      if (response) {
        setWatchlist([...watchlist, ...response?.data?.watchlist]);
        setPage(response?.data?.currentPage);
        setTotalPages(response?.data?.totalPages);
      }
    } catch (error) {
      toast.error("An error occurred while getting your watchlist.");
    }
  };

  useEffect(() => {
    handleGetWatchlist();
  }, []);

  const [loading, setLoading] = useState(false);

  const { mutateAsync: deleteFromWatchlist } =
    useWatchlistService.useDeleteFromWatchlistService();

  const handleDeleteFromWatchlist = async (watchlistId) => {
    try {
      if (!user?.user?.premium) {
        navigate("/app/premium");
        return;
      }

      setLoading(true);
      // Call the API to delete the movie from the watchlist
      const response = await deleteFromWatchlist({
        params: {
          watchlistId,
        },
      });
      if (response) {
        // Update the watchlist state by filtering out the deleted movie
        const updatedWatchlist = watchlist.filter(
          (_watchlist) => _watchlist.id !== watchlistId
        );
        setWatchlist(updatedWatchlist);
        toast.success("Removed from your watchlist.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleViewDetails = (movieId) => {
    navigate(`/content/${movieId}`);
  };

  return (
    <AppLayout>
      <PageLoader loading={loading} />
      <div className={styles.watchlistContainer}>
        <div className={styles.watchlistHeader}>
          <h1 className={styles.watchlistTitle}>Watchlist</h1>
          <p className={styles.watchlistSubtitle}>
            Movies and shows you've liked
          </p>
        </div>

        {watchlist?.length === 0 ? (
          <div className={styles.emptyWatchlist}>
            <div className={styles.emptyIcon}>🎬</div>
            <h2 className={styles.emptyTitle}>No liked movies yet</h2>
            <p className={styles.emptyText}>
              Start swiping to discover movies you'll love
            </p>
            <button
              className={styles.discoverButton}
              onClick={() => navigate("/app/discover")}
            >
              Discover Movies
            </button>
          </div>
        ) : (
          <div className={styles.movieGrid}>
            {watchlist.map((movie) => (
              <div key={movie.contentId.id} className={styles.movieItem}>
                <div
                  className={styles.moviePoster}
                  onClick={() => handleViewDetails(movie.contentId.slug)}
                >
                  {/* Skeleton Loader */}
                  {!imageLoaded[movie.contentId.id] && (
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
                      movie?.contentId?.posterUrl?.includes("https")
                        ? movie?.contentId?.posterUrl
                        : FILES_URL + movie?.contentId?.posterUrl
                    }
                    alt={movie.contentId.title}
                    onLoad={() =>
                      setImageLoaded((prev) => ({
                        ...prev,
                        [movie.contentId.id]: true,
                      }))
                    }
                    style={{
                      display: imageLoaded[movie.contentId.id]
                        ? "block"
                        : "none",
                    }}
                  />
                  {imageLoaded[movie.contentId.id] && (
                    <div className={styles.playOverlay}>
                      <span className={styles.playIcon}>▶</span>
                    </div>
                  )}
                </div>

                <div className={styles.movieInfo}>
                  <h3 className={styles.movieTitle}>{movie.contentId.title}</h3>
                  <p className={styles.movieDirector}>
                    {movie.contentId.director}
                  </p>

                  <div className={styles.movieActions}>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleDeleteFromWatchlist(movie.id)} // watchlistId
                      disabled={!isPremium}
                    >
                      {isPremium ? "🗑️ Remove" : "🔒 Remove"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!user?.user?.premium && watchlist?.length > 0 && (
          <div className={styles.premiumPrompt}>
            <p>Upgrade to Premium to remove content from your watchlist</p>
            <button
              className={styles.upgradeButton}
              onClick={() => navigate("/app/premium")}
            >
              Upgrade Now
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default Watchlist;
