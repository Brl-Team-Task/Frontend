import React, { useState, useEffect } from "react";
import axios from "axios";
import  "./fdashboard.css"


function YourComponent() {
  const token = localStorage.getItem("Token");
  const [dataa, setDataa] = useState([]);

 useEffect(()=>{
  async function fetchFaculty(){
    try {
      const response = await axios.get(
        "https://erp-backend-mqly.onrender.com/api/getfaculty/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.faculty_data);
      setDataa(response.data.faculty_data);
      console.log(dataa);
   
     
    } catch (error) {
      console.log("Internal Server Error",error);
    }
  }
  fetchFaculty();
  

 },[]);
  
    
  return (
    <>
      <main className="main">

          <div className="user-info-div">
            <img src={dataa.profile_photo_url} alt="user_pic"/>
            <h2>Palak Verma</h2>
            <p>11 Sep 2004</p>
          </div>
          <div className="faculty-container">
            <h1>Faculty profile :</h1>
            <div className="faculty-data-container">
                  <div>
                  <p className='user-info-value'>FIRST NAME <strong>{dataa.first_name||"N/A"}</strong></p>
                  <p className='user-info-value'>LAST NAME <strong>{dataa.last_name||"N/A"}</strong></p>
                  <p className='user-info-value'>USER ID <strong>{dataa.user_id||"N/A"}</strong></p>
                  <p className='user-info-value'>EMAIL <strong>{dataa.email||"N/A"}</strong></p>
                  <p className='user-info-value'>PHONE NO. <strong>{dataa.phone_number||"N/A"}</strong></p>
                  <p className='user-info-value'>ROLE <strong>{dataa.role||"N/A"}</strong></p>
                  <p className='user-info-value'>POST <strong>{dataa.Post||"N/A"}</strong></p>
                  <p className='user-info-value'>DEPARTMENT <strong>{dataa.Department||"N/A"}</strong></p>
                  </div>
                  <div>
                  <p className='user-info-value'>AADHAR NO. <strong>{dataa.aadhar||"N/A"}</strong></p>
                  <p className='user-info-value'>GENDER <strong>{dataa.gender||"N/A"}</strong></p>
                  <p className='user-info-value'>ADDRESS <strong>{dataa.address||"N/A"}</strong></p>
                  </div>
                  
              </div>
          </div>

      </main>
      
    </>
  );
}

export default YourComponent;