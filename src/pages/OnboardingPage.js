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

  const totalSteps = 6

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
          <div className={styles.stepContent}>
            <h2>What type of content do you like?</h2>
            <div className={styles.checkboxGroup}>
              {["Movies", "TV Shows", "Documentaries", "Animation", "Anime", "Short Films"].map((type) => (
                <label key={type} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.contentTypes.includes(type)}
                    onChange={() => handleCheckboxChange("contentTypes", type)}
                  />
                  <span className={styles.checkboxText}>{type}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>Which film industries do you prefer?</h2>
            <div className={styles.checkboxGroup}>
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
                <label key={industry} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.filmIndustries.includes(industry)}
                    onChange={() => handleCheckboxChange("filmIndustries", industry)}
                  />
                  <span className={styles.checkboxText}>{industry}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>Which genres do you enjoy?</h2>
            <div className={styles.checkboxGroup}>
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
                <label key={genre} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.genres.includes(genre)}
                    onChange={() => handleCheckboxChange("genres", genre)}
                  />
                  <span className={styles.checkboxText}>{genre}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className={styles.stepContent}>
            <h2>Which time periods do you prefer?</h2>
            <div className={styles.checkboxGroup}>
              {["Recent/2020s", "2010s", "2000s", "1990s", "1980s", "Classic/Pre-1980s"].map((period) => (
                <label key={period} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.timePeriods.includes(period)}
                    onChange={() => handleCheckboxChange("timePeriods", period)}
                  />
                  <span className={styles.checkboxText}>{period}</span>
                </label>
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
