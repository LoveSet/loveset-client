import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./content.module.css";
import useContentService from "../../shared/hooks/api/useContent";
import { toast } from "react-toastify";
import { useAuthState } from "../../shared/context/useAuthContext";
import { FILES_URL } from "../../shared/config/endpoints";
import { Skeleton, CircularProgress } from "@mui/material";
import { useModal } from "../../shared/hooks/useModal";
import YouTubeVideoModal from "../../shared/components/modal/youtubeVideoModal";
import useDiscoverService from "../../shared/hooks/api/useDiscoverService";
import openInNewTab from "../../shared/utils/openInNewTab";

const mockMovies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genres: ["Science Fiction", "Action", "Thriller"],
    poster: "/placeholder.svg?height=500&width=350",
    rating: 8.8,
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    streamingOn: ["Netflix", "Amazon Prime", "HBO Max"],
    cast: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Ellen Page",
      "Tom Hardy",
    ],
    runtime: 148,
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
    genres: ["Drama", "Crime"],
    poster: "/placeholder.svg?height=500&width=350",
    rating: 9.3,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    trailer: "https://www.youtube.com/watch?v=6hB3S9bIaco",
    streamingOn: ["Netflix", "Disney+"],
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    runtime: 142,
  },
  {
    id: 3,
    title: "Parasite",
    director: "Bong Joon Ho",
    year: 2019,
    genres: ["Thriller", "Drama", "Comedy"],
    poster: "/placeholder.svg?height=500&width=350",
    rating: 8.6,
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    streamingOn: ["Hulu", "Amazon Prime"],
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    runtime: 132,
  },
  {
    id: 4,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: 1994,
    genres: ["Crime", "Drama"],
    poster: "/placeholder.svg?height=500&width=350",
    rating: 8.9,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    streamingOn: ["Netflix", "HBO Max"],
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"],
    runtime: 154,
  },
  {
    id: 5,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    genres: ["Action", "Crime", "Drama"],
    poster: "/placeholder.svg?height=500&width=350",
    rating: 9.0,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    streamingOn: ["HBO Max", "Disney+"],
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    runtime: 152,
  },
];

function Content() {
  const { user } = useAuthState();
  const { slug } = useParams();
  const id = slug;
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const modal = useModal();

  const { mutateAsync: getContent } = useContentService.useGetContentService();
  const { mutateAsync: getYoutubeVideo } =
    useDiscoverService.useGetYoutubeUrlService();

  const handleGetContent = async () => {
    try {
      const response = await getContent({
        params: {
          contentId: id,
        },
        query: {
          userId: user?.user?.id,
        },
      });

      if (response) {
        setMovie(response?.data);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleBack = () => {
    if (user?.token) {
      navigate("/app/discover");
    } else {
      navigate("/");
    }
  };

  const handleToggleLike = () => {
    if (!user) {
      navigate("/");
      return;
    }

    const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]");

    if (isLiked) {
      const updatedLikes = likedMovies.filter((m) => m.id !== movie.id);
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikes));
      setIsLiked(false);
    } else {
      const updatedLikes = [...likedMovies, movie];
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikes));
      setIsLiked(true);
    }
  };

  const handleWatchTrailer = async () => {
    try {
      setTrailerLoading(true);

      if (movie?.trailerUrl?.includes("search_query")) {
        const response = await getYoutubeVideo({
          query: {
            contentId: movie?.id,
          },
        });

        if (response?.data?.trailerUrl) {
          const youtubeUrl = response.data.trailerUrl;
          setVideoId(youtubeUrl.split("v=")[1]);
          modal.handleOpen();
        } else {
          toast.error("Failed to fetch YouTube trailer. Please try again.");
        }
      } else {
        setVideoId(movie?.trailerUrl.split("v=")[1]);
        modal.handleOpen();
      }
      setTrailerLoading(false);
    } catch (error) {
      console.error("Error fetching trailer:", error);
      toast.error("Something went wrong. Please try again.");
      setTrailerLoading(false);
    }
  };

  useEffect(() => {
    handleGetContent();
  }, [id]);

  const [streamingLoading, setStreamingLoading] = useState(true);

  const { mutateAsync: getStreamingAvailability } =
    useContentService.useGetStreamingAvailabilityService();

  const [streamingStatus, setStreamingStatus] = useState(null);

  const handleStreamingAvailability = async () => {
    try {
      setStreamingLoading(true);

      const response = await getStreamingAvailability({
        params: { contentId: id },
        query: { userId: user?.user?.id },
      });

      if (response?.data?.length > 0) {
        setMovie((prev) => ({
          ...prev,
          streamingAvailability: response.data,
        }));
        setStreamingStatus(null); // Clear any previous status
      } else {
        setStreamingStatus("No streaming platforms available.");
      }
    } catch (error) {
      toast.error("Failed to fetch streaming availability. Please try again.");
      setStreamingStatus("Error fetching streaming availability.");
    } finally {
      setStreamingLoading(false);
    }
  };

  // Determine streaming status based on user and movie state
  const determineStreamingStatus = () => {
    if (!user?.token) {
      return (
        <p>
          <Link to={`/`} className={styles.link}>
            Sign in
          </Link>{" "}
          to see streaming availability.
        </p>
      );
    }

    if (!user?.user?.premium) {
      return (
        <p>
          <Link to={`/app/premium`} className={styles.link}>
            Subscribe
          </Link>{" "}
          to see streaming availability.
        </p>
      );
    }

    if (streamingLoading) {
      return (
        <>
          <CircularProgress
            size={20}
            style={{ color: "#5891ff", marginTop: "3px" }}
          />{" "}
          Searching for availability...{" "}
        </>
      );
    }

    if (streamingStatus) {
      return <p>{streamingStatus}</p>;
    }

    if (!movie?.streamingAvailability?.length) {
      return <p>No streaming platforms available for this content.</p>;
    }

    return null; // No status message if everything is fine
  };

  useEffect(() => {
    if (id) {
      handleStreamingAvailability();
    }
  }, [id]);

  if (!movie) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.detailsContainer}>
      <YouTubeVideoModal modal={modal} videoId={videoId} />

      <div className={styles.detailsHeader}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>
      </div>

      <div className={styles.movieDetails}>
        <div className={styles.posterContainer}>
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
            alt={movie?.title}
            className={styles.moviePoster}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />

          {imageLoaded && (
            <button
              className={styles.playTrailerButton}
              onClick={handleWatchTrailer}
              disabled={trailerLoading}
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
                  <span className={styles.playIcon}>▶</span>
                  <span>Watch Trailer</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className={styles.infoContainer}>
          <h1 className={styles.movieTitle}>
            {movie?.title}{" "}
            <span className={styles.movieYear}>({movie?.year})</span>
          </h1>

          <div className={styles.movieMeta}>
            <span className={styles.movieRuntime}>{movie?.duration}</span>
          </div>

          <div className={styles.movieDirector}>
            Directed by{" "}
            <span className={styles.directorName}>{movie?.director}</span>
          </div>

          <div className={styles.movieGenres}>
            {movie?.genres?.map((genre, index) => (
              <span key={index} className={styles.genreTag}>
                {genre}
              </span>
            ))}
          </div>

          <div className={styles.movieDescription}>
            <h3>Synopsis</h3>
            <p>{movie?.synopsis}</p>
          </div>

          <div className={styles.movieCast}>
            <h3>Cast</h3>
            <div className={styles.castList}>
              {movie?.cast?.map((actor, index) => (
                <span key={index} className={styles.castMember}>
                  {actor}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.streamingOptions}>
            <h3>Where to Watch</h3>
            {determineStreamingStatus() || (
              <div className={styles.streamingPlatforms}>
                {movie?.streamingAvailability?.map((platform, index) => (
                  <span
                    key={index}
                    className={styles.platformTag}
                    onClick={() => openInNewTab(platform?.link)}
                  >
                    {platform?.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
