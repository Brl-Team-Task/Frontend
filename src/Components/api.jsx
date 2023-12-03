import React, { useState } from "react";
import axios from "axios";

const Api = () => {
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
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setUserId(e.target.value)}
          required
          placeholder="Username"
        />
        <button className="submit" type="submit">
          Predict
        </button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}

    </>
  );
};

export default Api;
