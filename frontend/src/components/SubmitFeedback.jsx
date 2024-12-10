import React, { useState } from "react";

const SubmitFeedback = ({ onSurveyComplete }) => {
  const [feedback, setFeedback] = useState({
    starRating: 0,
    satisfaction: "moderate",
    recommendation: "3",
    likedFeatures: "",
    improvements: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0); // Track hovered star

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleStarRating = (rating) => {
    setFeedback({ ...feedback, starRating: rating });
  };

  const handleStarHover = (star) => {
    setHoveredStar(star); // Track which star is hovered
  };

  const handleStarLeave = () => {
    setHoveredStar(0); // Reset hover state when mouse leaves
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissionStatus(data.message);
        setFeedback({
          starRating: 0,
          satisfaction: "moderate",
          recommendation: "3",
          likedFeatures: "",
          improvements: "",
        });
      } else {
        setSubmissionStatus("Error submitting feedback.");
      }
    } catch (error) {
      setSubmissionStatus("An error occurred while submitting feedback.");
    }
  };

  return (
    <div className="feedback-form">
      <h2>Submit Your Feedback</h2>
      {submissionStatus ? (
        <div>
          <p>{submissionStatus}</p>
          <button onClick={onSurveyComplete}>Back to Main Program</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <label>
            Rate the app:
            <div
              className="star-container"
              onMouseLeave={handleStarLeave} // Reset hover state on mouse leave
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${
                    feedback.starRating >= star || hoveredStar >= star
                      ? "filled"
                      : ""
                  }`}
                  onMouseEnter={() => handleStarHover(star)} // Light up on hover
                  onClick={() => handleStarRating(star)} // Set the star rating
                >
                  ★
                </span>
              ))}
            </div>
          </label>
          <br />
          {/* Satisfaction Level */}
          <label>
            How satisfied were you with the app?
            <select
              name="satisfaction"
              value={feedback.satisfaction}
              onChange={handleInputChange}
            >
              <option value="very satisfied">Very Satisfied</option>
              <option value="satisfied">Satisfied</option>
              <option value="moderate">Moderate</option>
              <option value="not satisfied">Not Satisfied</option>
              <option value="very not satisfied">Very Not Satisfied</option>
            </select>
          </label>
          <br />
          {/* Recommendation */}
          <label>
            How likely are you to recommend this app to friends? (1 = Very Likely, 5 = Very Unlikely)
            <select
              name="recommendation"
              value={feedback.recommendation}
              onChange={handleInputChange}
            >
              <option value="1">1 - Very Likely</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 - Very Unlikely</option>
            </select>
          </label>
          <br />
          {/* Liked Features */}
          <label>
            What features did you like the most?
            <textarea
              name="likedFeatures"
              rows="4"
              value={feedback.likedFeatures}
              onChange={handleInputChange}
            />
          </label>
          <br />
          {/* Improvements */}
          <label>
            What can be improved?
            <textarea
              name="improvements"
              rows="4"
              value={feedback.improvements}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default SubmitFeedback;
