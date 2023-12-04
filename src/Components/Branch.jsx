import React, { useState } from "react";
import axios from "axios";
import "./Branch.css";

const Branch = () => {
  const [id, setUserId] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        features: [Number(id)],
      };

      const response = await axios.post(
        "https://aryanshmlpredictormodel-1.onrender.com/predict",
        data
      );

      setPrediction(response.data.prediction_text);
      console.log(response.data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <>
      <div className="backrr">
        <div className="Utbg">
          <h1>BRANCH CHANGE</h1>
          <div className="UtLayout">
            <div className="Ut">
              <form onSubmit={handleSubmit}>
                <label>PUT Percentage:</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  placeholder="PUT Percentage"
                />
                <button className="submit" type="submit">
                  Predict
                </button>
              </form>
              {prediction && <p>Prediction: {prediction}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Branch;
