"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/watchlistPage.css"

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
    <div className="watchlist-container">
      <div className="watchlist-header">
        <h1 className="watchlist-title">My Likes</h1>
        <p className="watchlist-subtitle">Movies and shows you've liked</p>
      </div>

      {likedMovies.length === 0 ? (
        <div className="empty-watchlist">
          <div className="empty-icon">🎬</div>
          <h2 className="empty-title">No liked movies yet</h2>
          <p className="empty-text">Start swiping to discover movies you'll love</p>
          <button className="discover-button" onClick={() => navigate("/app/discover")}>
            Discover Movies
          </button>
        </div>
      ) : (
        <div className="movie-grid">
          {likedMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <div className="movie-poster" onClick={() => handleViewDetails(movie.id)}>
                <img src={movie.poster || "/placeholder.svg"} alt={movie.title} />
                <div className="play-overlay">
                  <span className="play-icon">▶</span>
                </div>
              </div>

              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-director">{movie.director}</p>

                <div className="movie-actions">
                  <button
                    className="remove-button"
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
        <div className="premium-prompt">
          <p>Upgrade to Premium to remove movies from your likes</p>
          <button className="upgrade-button" onClick={() => navigate("/app/premium")}>
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  )
}

export default WatchlistPage

