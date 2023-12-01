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
      <div>
        <h1>Faculty</h1>
        
      </div>
      
    </>
  );
}

export default YourComponent;
