import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/fdashboard.css";

function StudentComponent() {
  const token = localStorage.getItem("Token");
  const [dataa, setDataa] = useState([]);

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const response = await axios.get(
          "https://erp-backend-mqly.onrender.com/api/getstudent/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDataa(response.data.student_data);
      } catch (error) {
        console.log("Internal Server Error", error);
      }
    }
    fetchFaculty();
  }, []);
  return (
    <>
      <main className="main">
        <div className="user-info-div">
          <img src={dataa.profile_photo_url || "N/A"} alt="user_pic" />
          <h2>{dataa.first_name + "" + dataa.last_name || "N/A"}</h2>
          <p>DOB:{dataa.dob || "N/A"}</p>
        </div>
        <div className="faculty-container">
          <h1>Student profile :</h1>
          <div className="faculty-data-container">
            <div>
              <p className="user-info-value">
                FIRST NAME <strong>{dataa.first_name || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                LAST NAME <strong>{dataa.last_name || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                BRANCH <strong>{dataa.Branch || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                SECTION <strong>{dataa.section || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                SEMESTER <strong>{dataa.semester || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                YEAR <strong>{dataa.Year || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                USER ID <strong>{dataa.user_id || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                EMAIL <strong>{dataa.email || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                PHONE NO. <strong>{dataa.phone_number || "N/A"}</strong>
              </p>
            </div>
            <div>
              <p className="user-info-value">
                ROLE <strong>{dataa.role || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                ADMISSION DATE <strong>{dataa.admission_date || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                AADHAR NO. <strong>{dataa.aadhar || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                RELIGION <strong>{dataa.religion || "N/A"}</strong>
              </p>
              <p className="user-info-value">
                ADDRESS <strong>{dataa.address || "N/A"}</strong>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default StudentComponent;
