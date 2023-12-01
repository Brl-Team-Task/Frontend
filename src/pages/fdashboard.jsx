import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <main className="wrapper">
          <div className="user-info-div"></div>
          <div className="faculty-container">
            <h1>Faculty profile :</h1>
            <p>FIRST NAME <strong>{dataa.first_name}</strong></p>
            <p>LAST NAME <strong>{dataa.last_name}</strong></p>
            <p>USER ID <strong>{dataa.user_id}</strong></p>
            <p>EMAIL <strong>{dataa.email}</strong></p>
            <p>PHONE NO. <strong>{dataa.phone_number}</strong></p>
            <p>ROLE <strong>{dataa.role}</strong></p>
            <p>POST <strong>{dataa.Post}</strong></p>
            <p>DEPARTMENT <strong>{dataa.Department}</strong></p>
            <p>AADHAR NO. <strong>{dataa.aadhar}</strong></p>
            <p>GENDER <strong>{dataa.gender}</strong></p>
            <p>ADDRESS <strong>{dataa.address}</strong></p>
            
          </div>

      </main>
      
    </>
  );
}

export default YourComponent;
