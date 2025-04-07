"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../styles/watchlistPage.module.css"

const WatchlistPage = () => {
  const navigate = useNavigate()
  const [likedMovies, setLikedMovies] = useState([])
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    // Load liked movies from localStorage
    const storedLikedMovies = JSON.parse(localStorage.getItem("likedMovies") || "[]")
    setLikedMovies(storedLikedMovies)

    // Check if user is premium
    const userPremium = localStorage.getItem("isPremium")
    if (userPremium === "true") {
      setIsPremium(true)
    }
  }, [])  

  const handleRemoveFromLikes = (movieId) => {
    if (!isPremium) {
      navigate("/app/premium")
      return
    }

    const updatedLikes = likedMovies.filter((movie) => movie.id !== movieId)
    setLikedMovies(updatedLikes)
    localStorage.setItem("likedMovies", JSON.stringify(updatedLikes))
  }

  const handleViewDetails = (movieId) => {
    navigate(`/details/${movieId}`)
  }

  return (
    <div className={styles.watchlistContainer}>
      <div className={styles.watchlistHeader}>
        <h1 className={styles.watchlistTitle}>Watchlist</h1>
        <p className={styles.watchlistSubtitle}>Movies and shows you've liked</p>
      </div>

      {likedMovies.length === 0 ? (
        <div className={styles.emptyWatchlist}>
          <div className={styles.emptyIcon}>🎬</div>
          <h2 className={styles.emptyTitle}>No liked movies yet</h2>
          <p className={styles.emptyText}>Start swiping to discover movies you'll love</p>
          <button className={styles.discoverButton} onClick={() => navigate("/app/discover")}>
            Discover Movies
          </button>
        </div>
      ) : (
        <div className={styles.movieGrid}>
          {likedMovies.map((movie) => (
            <div key={movie.id} className={styles.movieItem}>
              <div className={styles.moviePoster} onClick={() => handleViewDetails(movie.id)}>
                <img src={"https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg"} alt={movie.title} />
                <div className={styles.playOverlay}>
                  <span className={styles.playIcon}>▶</span>
                </div>
              </div>

              <div className={styles.movieInfo}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <p className={styles.movieDirector}>{movie.director}</p>

                <div className={styles.movieActions}>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveFromLikes(movie.id)}
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

      {!isPremium && likedMovies.length > 0 && (
        <div className={styles.premiumPrompt}>
          <p>Upgrade to Premium to remove movies from your likes</p>
          <button className={styles.upgradeButton} onClick={() => navigate("/app/premium")}>
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  )
}

export default WatchlistPage