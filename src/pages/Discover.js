"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import OutOfSwipesModal from "../modals/OutOfSwipesModal"
import { useAuth } from "../contexts/AuthContext"
import styles from "../styles/discover.module.css"

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
  },
]

const Discover = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipesLeft, setSwipesLeft] = useState(10) // Free tier: 10 swipes per day
  const [showOutOfSwipes, setShowOutOfSwipes] = useState(false)
  const [likedMovies, setLikedMovies] = useState([])
  const [dislikedMovies, setDislikedMovies] = useState([])
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [startX, setStartX] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
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

  const handleSwipeStart = (e) => {
    setStartX(e.clientX || e.touches[0].clientX)
  }

  const handleSwipeMove = (e) => {
    if (!startX) return

    const currentX = e.clientX || e.touches[0].clientX
    const diff = currentX - startX

    setOffsetX(diff)

    if (diff > 50) {
      setSwipeDirection("right")
    } else if (diff < -50) {
      setSwipeDirection("left")
    } else {
      setSwipeDirection(null)
    }
  }

  const handleSwipeEnd = () => {
    if (swipeDirection === "right") {
      handleLike()
    } else if (swipeDirection === "left") {
      handleDislike()
    }

    setStartX(0)
    setOffsetX(0)
    setSwipeDirection(null)
  }

  const handleLike = () => {
    if (swipesLeft <= 0 && !isPremium) {
      setShowOutOfSwipes(true)
      return
    }

    const currentMovie = mockMovies[currentIndex]
    setLikedMovies([...likedMovies, currentMovie])

    if (!isPremium) {
      setSwipesLeft(swipesLeft - 1)
    }

    goToNextMovie()
  }

  const handleDislike = () => {
    if (swipesLeft <= 0 && !isPremium) {
      setShowOutOfSwipes(true)
      return
    }

    const currentMovie = mockMovies[currentIndex]
    setDislikedMovies([...dislikedMovies, currentMovie])

    if (!isPremium) {
      setSwipesLeft(swipesLeft - 1)
    }

    goToNextMovie()
  }

  const goToNextMovie = () => {
    if (currentIndex < mockMovies.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Reset to beginning when we've gone through all movies
      setCurrentIndex(0)
    }
  }

  const handleSurpriseMe = () => {
    // Randomly select a movie index
    const randomIndex = Math.floor(Math.random() * mockMovies.length)
    setCurrentIndex(randomIndex)
  }

  const handleViewDetails = () => {
    navigate(`/details/${mockMovies[currentIndex].id}`)
  }

  const handleShareMovie = () => {
    // Implement share functionality
    alert(`Share URL: moviematch.com/movie/${mockMovies[currentIndex].id}`)
  }

  const handleWatchTrailer = (e) => {
    e.stopPropagation()
    window.open(mockMovies[currentIndex].trailer, "_blank")
  }

  const currentMovie = mockMovies[currentIndex]

  return (
    <div className={styles.swipingContainerWrapper}>
      <div className={styles.swipingContainer}>
        <div
          className={styles.movieCard}
          style={{
            transform: `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)`,
            opacity: 1 - Math.abs(offsetX) / 500,
          }}
          onMouseDown={handleSwipeStart}
          onMouseMove={handleSwipeMove}
          onMouseUp={handleSwipeEnd}
          onMouseLeave={handleSwipeEnd}
          onTouchStart={handleSwipeStart}
          onTouchMove={handleSwipeMove}
          onTouchEnd={handleSwipeEnd}
        >
          <div className={styles.moviePoster}>
            <img src={"https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg"} alt={currentMovie.title} />

            {swipeDirection === "right" && <div className={`${styles.swipeOverlay} ${styles.likeOverlay}`}>LIKE</div>}

            {swipeDirection === "left" && <div className={`${styles.swipeOverlay} ${styles.dislikeOverlay}`}>NOPE</div>}
          </div>

          <div className={styles.movieInfo}>
            <button className={styles.playButton} onClick={handleWatchTrailer} aria-label="Play trailer">
              <span className={styles.playIcon}>▶</span>
            </button>

            <h2 className={styles.movieTitle}>
              {currentMovie.title} <span className={styles.movieYear}>({currentMovie.year})</span>
            </h2>

            <div className={styles.movieDirector}>Directed by {currentMovie.director}</div>

            <div className={styles.movieGenres}>
              {currentMovie.genres.map((genre, index) => (
                <span key={index} className={styles.genreTag}>
                  {genre}
                </span>
              ))}
            </div>

            <div className={styles.movieActions}>
              <button className={styles.trailerButton} onClick={handleWatchTrailer}>
                <span className={styles.trailerIcon}>▶</span>
                <span>Watch Trailer</span>
              </button>

              <button className={styles.shareButton} onClick={handleShareMovie}>
                <span className={styles.shareIcon}>📤</span>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.swipeButtons}>
          <button className={styles.dislikeButton} onClick={handleDislike}>
            <span className={styles.dislikeIcon}>✕</span>
          </button>

          <button className={styles.detailsButton} onClick={handleViewDetails}>
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

