"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../styles/onboardingPage.module.css"

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

  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      localStorage.setItem("userPreferences", JSON.stringify(formData))
      navigate("/app/swipe")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleOptionToggle = (category, value) => {
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
          <div className={styles.stepContent}>
            <h2>What type of content do you like?</h2>
            <div className={styles.optionsGrid}>
              {["Movies", "TV Shows", "Documentaries", "Animation", "Anime", "Short Films"].map((type) => (
                <div
                  key={type}
                  className={`${styles.optionCard} ${formData.contentTypes.includes(type) ? styles.selected : ""}`}
                  onClick={() => handleOptionToggle("contentTypes", type)}
                >
                  {type}
                  {formData.contentTypes.includes(type) && <span className={styles.checkmark}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>Which film industries do you prefer?</h2>
            <div className={styles.optionsGrid}>
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
                <div
                  key={industry}
                  className={`${styles.optionCard} ${formData.filmIndustries.includes(industry) ? styles.selected : ""}`}
                  onClick={() => handleOptionToggle("filmIndustries", industry)}
                >
                  {industry}
                  {formData.filmIndustries.includes(industry) && <span className={styles.checkmark}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>Which genres do you enjoy?</h2>
            <div className={styles.optionsGrid}>
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
                <div
                  key={genre}
                  className={`${styles.optionCard} ${formData.genres.includes(genre) ? styles.selected : ""}`}
                  onClick={() => handleOptionToggle("genres", genre)}
                >
                  {genre}
                  {formData.genres.includes(genre) && <span className={styles.checkmark}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className={styles.stepContent}>
            <h2>Which time periods do you prefer?</h2>
            <div className={styles.optionsGrid}>
              {["Recent/2020s", "2010s", "2000s", "1990s", "1980s", "Classic/Pre-1980s"].map((period) => (
                <div
                  key={period}
                  className={`${styles.optionCard} ${formData.timePeriods.includes(period) ? styles.selected : ""}`}
                  onClick={() => handleOptionToggle("timePeriods", period)}
                >
                  {period}
                  {formData.timePeriods.includes(period) && <span className={styles.checkmark}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className={styles.stepContent}>
            <h2>Any favorite actors, actresses, or directors?</h2>
            <textarea
              name="favorites"
              value={formData.favorites}
              onChange={handleInputChange}
              placeholder="e.g., Christopher Nolan, Tom Hanks, Meryl Streep"
              className={styles.textInput}
            />
          </div>
        )

      case 6:
        return (
          <div className={styles.stepContent}>
            <h2>What's your favorite movie of all time?</h2>
            <input
              type="text"
              name="favoriteMovie"
              value={formData.favoriteMovie}
              onChange={handleInputChange}
              placeholder="e.g., The Godfather, Pulp Fiction"
              className={styles.textInput}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={styles.onboardingContainerWrapper}>
      <div className={styles.onboardingContainer}>
        <div className={styles.progressBar}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`${styles.progressStep} ${index + 1 === step ? styles.active : index + 1 < step ? styles.completed : ""}`}
            >
              <div className={styles.stepNumber}>{index + 1}</div>
              {index < totalSteps - 1 && <div className={styles.stepConnector}></div>}
            </div>
          ))}
        </div>

        <div className={styles.onboardingContent}>
          {renderStepContent()}

          <div className={styles.navigationButtons}>
            {step > 1 && (
              <button className={styles.backButton} onClick={handleBack}>
                Back
              </button>
            )}

            <button className={styles.nextButton} onClick={handleNext}>
              {step === totalSteps ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage

