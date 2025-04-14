import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./watchlist.module.css";
import AppLayout from "../../../shared/components/appLayout/appLayout";
import { useAuthState } from "../../../shared/context/useAuthContext";
import useWatchlistService from "../../../shared/hooks/api/useWatchlistService";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import { FILES_URL } from "../../../shared/config/endpoints";
import PageLoader from "../../../shared/components/pageLoader/pageLoader";
import InfiniteScroll from "react-infinite-scroll-component";
// import ReactLoading from "react-loading";
import {
  GridLoader,
  HashLoader,
  PacmanLoader,
  SyncLoader,
  BeatLoader,
} from "react-spinners";

function Watchlist() {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const [likedMovies, setLikedMovies] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const { mutateAsync: getWatchlist } =
    useWatchlistService.useGetWatchlistService();

  const [loading2, setLoading2] = useState(true);

  const handleGetWatchlist = async () => {
    try {
      setLoading2(true);
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
      setLoading2(false);
    } catch (error) {
      setLoading2(false);
      toast.error("An error occurred while getting your watchlist.");
    }
  };

  useEffect(() => {
    handleGetWatchlist();
  }, []);

  const { mutateAsync: deleteFromWatchlist } =
    useWatchlistService.useDeleteFromWatchlistService();

  const handleDeleteFromWatchlist = async (watchlistId) => {
    try {
      if (!user?.user?.premium) {
        navigate("/app/premium");
        return;
      }

      setLoading(true);
      const response = await deleteFromWatchlist({
        params: {
          watchlistId,
        },
      });
      if (response) {
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

        {!loading2 && watchlist?.length < 1 && (
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
        )}

        <InfiniteScroll
          style={{
            overflow: "unset",
          }}
          // className="_infinite-scroll-component"
          scrollThreshold="100px"
          dataLength={watchlist.length}
          next={handleGetWatchlist}
          hasMore={page < totalPages}
          // height={`calc(100vh - ${user?.user?.premium ? 0 : 171}px)`}
          loader={
            <div
              className="j-center"
              style={{
                marginTop: "8px",
                marginBottom: "8px",
              }}
            >
              {/* <ReactLoading
                  type="spinningBubbles"
                  color={"#8a96a3"}
                  height={24}
                  width={24}
                /> */}
              <HashLoader
                color={"#5891ff"}
                loading={true}
                // cssOverride={override}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          }
        >
          <div className={styles.movieGrid}>
            {watchlist.map((movie) => (
              <div key={movie.contentId.id} className={styles.movieItem}>
                <div
                  className={styles.moviePoster}
                  onClick={() => handleViewDetails(movie.contentId.slug)}
                >
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
                      onClick={() => handleDeleteFromWatchlist(movie.id)}
                      disabled={!user?.user?.premium}
                    >
                      {user?.user?.premium ? "🗑️ Remove" : "🔒 Remove"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>

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
