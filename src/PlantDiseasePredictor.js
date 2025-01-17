import React, { useState } from "react";
import axios from "axios";

function PlantDiseasePredictor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState("");

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setPrediction(""); // Clear the previous prediction
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please upload an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { predicted_class } = response.data;
      setPrediction(predicted_class);
    } catch (error) {
      console.error("Error occurred during prediction:", error);
      setPrediction("Error predicting the class. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Plant Disease Predictor</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.fileInput}
          />
          {imagePreview && (
            <div style={styles.previewContainer}>
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                style={styles.imagePreview}
              />
            </div>
          )}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#3E8E41")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Predict Disease
          </button>
        </form>
        {prediction && (
          <div style={styles.result}>
            <h2 style={styles.resultTitle}>Prediction Result:</h2>
            <p style={styles.resultText}>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    marginTop: "20px",
  },
  fileInput: {
    display: "block",
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  previewContainer: {
    margin: "20px auto",
    textAlign: "center",
  },
  imagePreview: {
    maxWidth: "100%",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  result: {
    marginTop: "30px",
    padding: "15px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
  },
  resultTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#555",
  },
  resultText: {
    fontSize: "18px",
    color: "#333",
  },
};

export default PlantDiseasePredictor;
