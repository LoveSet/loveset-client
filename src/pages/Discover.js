"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import OutOfSwipesModal from "../modals/OutOfSwipesModal"
import { useAuth } from "../contexts/AuthContext"
import styles from "../styles/discover.module.css"
import { motion, useMotionValue, useTransform } from "framer-motion"

// Mock movie data
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
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
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
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
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
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
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
 
]

const MovieCard = ({
  movie,
  index,
  totalCards,
  handleLike,
  handleDislike,
  handleViewDetails,
  handleWatchTrailer,
  handleShareMovie,
}) => {
  const x = useMotionValue(0)
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18])
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0])

  // Check if this card is at the front of the stack
  const isFront = index === totalCards - 1

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : index % 2 ? 6 : -6
    return `${rotateRaw.get() + offset}deg`
  })

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      if (x.get() > 0) {
        handleLike()
      } else {
        handleDislike()
      }
    }
  }

  const scale = isFront ? 1 : 0.98 - (totalCards - index - 1) * 0.02
  const zIndex = index

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
        damping: 50,
        stiffness: 400,
      }}
    >
      <div className={styles.moviePoster} style={{ pointerEvents: "none" }}>
        <img src={"https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg"} alt={movie.title} />

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
            e.stopPropagation()
            handleWatchTrailer(movie)
          }}
          style={{ pointerEvents: "auto" }}
          aria-label="Play trailer"
        >
          <span className={styles.playIcon}>▶</span>
        </button>

        <h2 className={styles.movieTitle}>
          {movie.title} <span className={styles.movieYear}>({movie.year})</span>
        </h2>

        <div className={styles.movieDirector}>Directed by {movie.director}</div>

        <div className={styles.movieGenres}>
          {movie.genres.map((genre, index) => (
            <span key={index} className={styles.genreTag}>
              {genre}
            </span>
          ))}
        </div>

        <div className={styles.movieActions}>
          <button className={styles.trailerButton} onClick={() => handleWatchTrailer(movie)}>
            <span className={styles.trailerIcon}>▶</span>
            <span>Watch Trailer</span>
          </button>

          <button className={styles.shareButton} onClick={() => handleShareMovie(movie)}>
            <span className={styles.shareIcon}>📤</span>
            <span>Share</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const Discover = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [movies, setMovies] = useState([...mockMovies])
  const [swipesLeft, setSwipesLeft] = useState(10) // Free tier: 10 swipes per day
  const [showOutOfSwipes, setShowOutOfSwipes] = useState(false)
  const [likedMovies, setLikedMovies] = useState([])
  const [dislikedMovies, setDislikedMovies] = useState([])
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    // Check if user is premium
    const userPremium = localStorage.getItem("isPremium")
    if (userPremium === "true") {
      setIsPremium(true)
    }

    // Load liked movies from localStorage
    const storedLikedMovies = localStorage.getItem("likedMovies")
    if (storedLikedMovies) {
      setLikedMovies(JSON.parse(storedLikedMovies))
    }

    // Load disliked movies from localStorage
    const storedDislikedMovies = localStorage.getItem("dislikedMovies")
    if (storedDislikedMovies) {
      setDislikedMovies(JSON.parse(storedDislikedMovies))
    }

    // Load remaining swipes from localStorage
    const storedSwipes = localStorage.getItem("swipesLeft")
    if (storedSwipes) {
      setSwipesLeft(Number.parseInt(storedSwipes))
    }
  }, [])

  useEffect(() => {
    // Save liked movies to localStorage
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies))

    // Save disliked movies to localStorage
    localStorage.setItem("dislikedMovies", JSON.stringify(dislikedMovies))

    // Save remaining swipes to localStorage
    localStorage.setItem("swipesLeft", swipesLeft.toString())
  }, [likedMovies, dislikedMovies, swipesLeft])

  const handleLike = () => {
    if (swipesLeft <= 0 && !isPremium) {
      setShowOutOfSwipes(true)
      return
    }

    const currentMovie = movies[movies.length - 1]
    setLikedMovies([...likedMovies, currentMovie])

    if (!isPremium) {
      setSwipesLeft(swipesLeft - 1)
    }

    // Remove the top card
    setMovies(movies.slice(0, -1))

    // If we've gone through all movies, reset
    if (movies.length <= 1) {
      setMovies([...mockMovies])
    }
  }

  const handleDislike = () => {
    if (swipesLeft <= 0 && !isPremium) {
      setShowOutOfSwipes(true)
      return
    }

    const currentMovie = movies[movies.length - 1]
    setDislikedMovies([...dislikedMovies, currentMovie])

    if (!isPremium) {
      setSwipesLeft(swipesLeft - 1)
    }

    // Remove the top card
    setMovies(movies.slice(0, -1))

    // If we've gone through all movies, reset
    if (movies.length <= 1) {
      setMovies([...mockMovies])
    }
  }

  const handleSurpriseMe = () => {
    // Shuffle the movies array
    const shuffled = [...mockMovies].sort(() => Math.random() - 0.5)
    setMovies(shuffled)
  }

  const handleViewDetails = (movie) => {
    navigate(`/details/${movie.id}`)
  }

  const handleShareMovie = (movie) => {
    // Implement share functionality
    alert(`Share URL: moviematch.com/movie/${movie.id}`)
  }

  const handleWatchTrailer = (movie, e) => {
    if (e) e.stopPropagation()
    window.open(movie.trailer, "_blank")
  }

  return (
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
            />
          ))}
        </div>

        <div className={styles.swipeButtons}>
          <button className={styles.dislikeButton} onClick={handleDislike}>
            <span className={styles.dislikeIcon}>✕</span>
          </button>

          <button className={styles.detailsButton} onClick={() => handleViewDetails(movies[movies.length - 1])}>
            <span className={styles.detailsIcon}>ℹ️</span>
          </button>

          <button className={styles.likeButton} onClick={handleLike}>
            <span className={styles.likeIcon}>♥</span>
          </button>
        </div>

        {showOutOfSwipes && (
          <OutOfSwipesModal onClose={() => setShowOutOfSwipes(false)} onUpgrade={() => navigate("/app/premium")} />
        )}
      </div>
    </div>
  )
}

export default Discover
