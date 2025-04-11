"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/detailsPage.module.css";

// Mock movie data
// const mockMovies = [
//   {
//     id: 1,
//     title: "Inception",
//     director: "Christopher Nolan",
//     year: 2010,
//     genres: ["Science Fiction", "Action", "Thriller"],
//     poster: "/placeholder.svg?height=500&width=350",
//     rating: 8.8,
//     description:
//       "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
//     trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
//     streamingOn: ["Netflix", "Amazon Prime", "HBO Max"],
//     cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
//     runtime: 148,
//   },
//   {
//     id: 2,
//     title: "The Shawshank Redemption",
//     director: "Frank Darabont",
//     year: 1994,
//     genres: ["Drama", "Crime"],
//     poster: "/placeholder.svg?height=500&width=350",
//     rating: 9.3,
//     description:
//       "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//     trailer: "https://www.youtube.com/watch?v=6hB3S9bIaco",
//     streamingOn: ["Netflix", "Disney+"],
//     cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
//     runtime: 142,
//   },
//   {
//     id: 3,
//     title: "Parasite",
//     director: "Bong Joon Ho",
//     year: 2019,
//     genres: ["Thriller", "Drama", "Comedy"],
//     poster: "/placeholder.svg?height=500&width=350",
//     rating: 8.6,
//     description:
//       "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
//     trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
//     streamingOn: ["Hulu", "Amazon Prime"],
//     cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
//     runtime: 132,
//   },
//   {
//     id: 4,
//     title: "Pulp Fiction",
//     director: "Quentin Tarantino",
//     year: 1994,
//     genres: ["Crime", "Drama"],
//     poster: "/placeholder.svg?height=500&width=350",
//     rating: 8.9,
//     description:
//       "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
//     trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
//     streamingOn: ["Netflix", "HBO Max"],
//     cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"],
//     runtime: 154,
//   },
//   {
//     id: 5,
//     title: "The Dark Knight",
//     director: "Christopher Nolan",
//     year: 2008,
//     genres: ["Action", "Crime", "Drama"],
//     poster: "/placeholder.svg?height=500&width=350",
//     rating: 9.0,
//     description:
//       "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//     trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
//     streamingOn: ["HBO Max", "Disney+"],
//     cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
//     runtime: 152,
//   },
// ]

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

  {
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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

  {
    id: 11,
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
    id: 12,
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
];

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Find movie by id
    const foundMovie = mockMovies.find((m) => m.id === Number.parseInt(id));
    if (foundMovie) {
      setMovie(foundMovie);

      // Check if movie is in liked list
      const likedMovies = JSON.parse(
        localStorage.getItem("likedMovies") || "[]"
      );
      const isMovieLiked = likedMovies.some(
        (m) => m.id === Number.parseInt(id)
      );
      setIsLiked(isMovieLiked);
    }
  }, [id]);

  const handleBack = () => {
    if (user) {
      navigate("/app/discover");
    } else {
      navigate("/");
    }
  };

  const handleToggleLike = () => {
    if (!user) {
      // Redirect to login if not logged in
      navigate("/");
      return;
    }

    const likedMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]");

    if (isLiked) {
      // Remove from likes
      const updatedLikes = likedMovies.filter((m) => m.id !== movie.id);
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikes));
      setIsLiked(false);
    } else {
      // Add to likes
      const updatedLikes = [...likedMovies, movie];
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikes));
      setIsLiked(true);
    }
  };

  const handlePlayTrailer = () => {
    window.open(movie.trailer, "_blank");
  };

  if (!movie) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsHeader}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>

        {/* <button className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`} onClick={handleToggleLike}>
          {isLiked ? "❤️" : "♡"}
        </button> */}
      </div>

      <div className={styles.movieDetails}>
        <div className={styles.posterContainer}>
          <img
            src={
              "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg"
            }
            alt={movie.title}
            className={styles.moviePoster}
          />

          <button
            className={styles.playTrailerButton}
            onClick={handlePlayTrailer}
          >
            <span className={styles.playIcon}>▶</span>
            <span>Watch Trailer</span>
          </button>
        </div>

        <div className={styles.infoContainer}>
          <h1 className={styles.movieTitle}>
            {movie.title}{" "}
            <span className={styles.movieYear}>({movie.year})</span>
          </h1>

          <div className={styles.movieMeta}>
            {/* <span className={styles.movieRating}>⭐ {movie.rating}/10</span> */}
            <span className={styles.movieRuntime}>{movie.runtime} min</span>
            {/* // todo: 12 seasons */}
          </div>

          <div className={styles.movieDirector}>
            Directed by{" "}
            <span className={styles.directorName}>{movie.director}</span>
          </div>

          <div className={styles.movieGenres}>
            {movie.genres.map((genre, index) => (
              <span key={index} className={styles.genreTag}>
                {genre}
              </span>
            ))}
          </div>

          <div className={styles.movieDescription}>
            <h3>Synopsis</h3>
            <p>{movie.description}</p>
          </div>

          <div className={styles.movieCast}>
            <h3>Cast</h3>
            <div className={styles.castList}>
              {movie.cast.map((actor, index) => (
                <span key={index} className={styles.castMember}>
                  {actor}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.streamingOptions}>
            <h3>Where to Watch</h3>
            <div className={styles.streamingPlatforms}>
              {movie.streamingOn.map((platform, index) => (
                <>
                  <span key={index} className={styles.platformTag}>
                    {/* <img src = {'https://media.movieofthenight.com/services/hbo/logo-light-theme.svg'} className = {styles.platformLogo} /> */}
                    {platform}
                  </span>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
