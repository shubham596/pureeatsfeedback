import React, { useState } from "react";

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [hover2, setHover2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [hover3, setHover3] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData();
    formData.append("access_key", "f7769608-d547-4dd7-a789-a0e34b9d24c1");
    formData.append("food experience", rating);
    formData.append("delivery experience", rating2);
    formData.append("packaging experience", rating3);
    formData.append("feedback", feedback);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        setSubmitted(true);
      } else {
        console.error("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Submission error", error);
      setResult("An error occurred while submitting the form.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Feedback</h1>

      {!submitted ? (
        <form
          style={{
            maxWidth: "400px",
            margin: "0 auto",
            background: "#f9f9f9",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onSubmit={handleSubmit}
        >
          {[{ label: "How was your food?", state: [rating, setRating], hover: [hover, setHover] },
            { label: "How was your delivery experience?", state: [rating2, setRating2], hover: [hover2, setHover2] },
            { label: "How was the packaging?", state: [rating3, setRating3], hover: [hover3, setHover3] }].map(
            ({ label, state: [stateValue, setState], hover: [hoverValue, setHoverValue] }, idx) => (
              <div key={idx} style={{ textAlign: "center", marginBottom: "20px" }}>
                <p style={{ marginBottom: "10px", fontSize: "18px" }}>{label}</p>
                <div>
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name={`rating${idx}`}
                          value={ratingValue}
                          style={{ display: "none" }}
                          onClick={() => setState(ratingValue)}
                        />
                        <svg
                          onMouseEnter={() => setHoverValue(ratingValue)}
                          onMouseLeave={() => setHoverValue(0)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={
                            ratingValue <= (hoverValue || stateValue)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          style={{ width: "40px", cursor: "pointer" }}
                        >
                          <path d="M12 .587l3.668 7.431 8.214 1.195-5.938 5.788 1.4 8.168L12 18.897l-7.344 3.872 1.4-8.168L.118 9.213l8.214-1.195L12 .587z" />
                        </svg>
                      </label>
                    );
                  })}
                </div>
              </div>
            )
          )}

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="feedback"
              style={{
                display: "block",
                marginBottom: "10px",
                fontSize: "18px",
              }}
            >
             
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="If you have any other suggestions, please do let us know here."
              style={{
                width: "100%",
                height: "80px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                padding: "10px",
                fontSize: "16px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          <p style={{ marginTop: "10px", color: "#555" }}>{result}</p>
        </form>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px", color: "green" }}>
          Thank you for your feedback!
        </p>
      )}
    </div>
  );
}

export default App;
