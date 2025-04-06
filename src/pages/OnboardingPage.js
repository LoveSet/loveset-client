"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/onboardingPage.css"

const OnboardingPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    contentTypes: [],
    filmIndustries: [],
    genres: [],
    timePeriods: [],
    favorites: "",
    favoriteMovie: "",
  })

  const totalSteps = 6

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Save preferences and redirect to swiping page
      localStorage.setItem("userPreferences", JSON.stringify(formData))
      navigate("/app/swipe")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleCheckboxChange = (category, value) => {
    setFormData((prev) => {
      const updated = { ...prev }

      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter((item) => item !== value)
      } else {
        updated[category] = [...updated[category], value]
      }

      return updated
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content">
            <h2>What type of content do you like?</h2>
            <div className="checkbox-group">
              {["Movies", "TV Shows", "Documentaries", "Animation", "Anime", "Short Films"].map((type) => (
                <label key={type} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.contentTypes.includes(type)}
                    onChange={() => handleCheckboxChange("contentTypes", type)}
                  />
                  <span className="checkbox-text">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="step-content">
            <h2>Which film industries do you prefer?</h2>
            <div className="checkbox-group">
              {[
                "Hollywood/American",
                "British",
                "European",
                "Korean",
                "Japanese",
                "Indian",
                "Other Asian",
                "International",
              ].map((industry) => (
                <label key={industry} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.filmIndustries.includes(industry)}
                    onChange={() => handleCheckboxChange("filmIndustries", industry)}
                  />
                  <span className="checkbox-text">{industry}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="step-content">
            <h2>Which genres do you enjoy?</h2>
            <div className="checkbox-group">
              {[
                "Action/Adventure",
                "Comedy",
                "Drama",
                "Thriller/Mystery",
                "Horror",
                "Science Fiction",
                "Fantasy",
                "Romance",
                "Crime",
                "Documentary",
                "Family/Children's",
              ].map((genre) => (
                <label key={genre} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.genres.includes(genre)}
                    onChange={() => handleCheckboxChange("genres", genre)}
                  />
                  <span className="checkbox-text">{genre}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="step-content">
            <h2>Which time periods do you prefer?</h2>
            <div className="checkbox-group">
              {["Recent/2020s", "2010s", "2000s", "1990s", "1980s", "Classic/Pre-1980s"].map((period) => (
                <label key={period} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.timePeriods.includes(period)}
                    onChange={() => handleCheckboxChange("timePeriods", period)}
                  />
                  <span className="checkbox-text">{period}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="step-content">
            <h2>Any favorite actors, actresses, or directors?</h2>
            <textarea
              name="favorites"
              value={formData.favorites}
              onChange={handleInputChange}
              placeholder="e.g., Christopher Nolan, Tom Hanks, Meryl Streep"
              className="text-input"
            />
          </div>
        )

      case 6:
        return (
          <div className="step-content">
            <h2>What's your favorite movie of all time?</h2>
            <input
              type="text"
              name="favoriteMovie"
              value={formData.favoriteMovie}
              onChange={handleInputChange}
              placeholder="e.g., The Godfather, Pulp Fiction"
              className="text-input"
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="onboarding-container">
      <div className="progress-bar">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`progress-step ${index + 1 === step ? "active" : index + 1 < step ? "completed" : ""}`}
          >
            <div className="step-number">{index + 1}</div>
            {index < totalSteps - 1 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>

      <div className="onboarding-content">
        {renderStepContent()}

        <div className="navigation-buttons">
          {step > 1 && (
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
          )}

          <button className="next-button" onClick={handleNext}>
            {step === totalSteps ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage

