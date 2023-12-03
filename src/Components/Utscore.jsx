import React, { useState } from "react";
import axios from "axios";

const Utscore = () => {
  const [Chemistry, setChemistry] = useState("");
  const [Maths, setMaths] = useState("");
  const [Electronics, setElectronics] = useState("");
  const [Mechanical, setMechanical] = useState("");
  const [SoftSkills, setSoftSkills] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [totalScore, setTotalScore] = useState(0); 
  const [percentage, setPercentage] = useState(0); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const chemistryScore = Number(Chemistry) || 0;
      const mathsScore = Number(Maths) || 0;
      const electronicsScore = Number(Electronics) || 0;
      const mechanicalScore = Number(Mechanical) || 0;
      const softSkillsScore = Number(SoftSkills) || 0;

      const total = chemistryScore + mathsScore + electronicsScore + mechanicalScore + softSkillsScore;
      setTotalScore(total);

      const totalSubjects = 5; 
      const maxScorePerSubject = 100; 
      const totalMaxScore = totalSubjects * maxScorePerSubject;
      const percentage = (total / totalMaxScore) * 100;
      setPercentage(percentage);

      const data = {
        features: [chemistryScore, mathsScore, electronicsScore, mechanicalScore, softSkillsScore],
      };

      const response = await axios.post(
        "https://aryanshmlpredictormodel-1.onrender.com/predictUT",
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
        <label>Chemistry</label>
        <input
          type="text"
          value={Chemistry}
          onChange={(e) => setChemistry(e.target.value)}
          required
          placeholder="Chemistry"
        />
        <label>Maths</label>
        <input
          type="text"
          value={Maths}
          onChange={(e) => setMaths(e.target.value)}
          required
          placeholder="Maths"
        />
        <label>Electronics</label>
        <input
          type="text"
          value={Electronics}
          onChange={(e) => setElectronics(e.target.value)}
          required
          placeholder="Electronics"
        />
        <label>Mechanical </label>
        <input
          type="text"
          value={Mechanical}
          onChange={(e) => setMechanical(e.target.value)}
          required
          placeholder="Mechanical"
        />
        <label>Soft Skills: </label>
        <input
          type="text"
          value={SoftSkills}
          onChange={(e) => setSoftSkills(e.target.value)}
          required
          placeholder="SoftSkills"
        />
        <button className="submit" type="submit">
          Predict
        </button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
      <p>Total Score: {totalScore}</p>
      <p>Percentage: {percentage}%</p>
    </>
  );
};

export default Utscore;