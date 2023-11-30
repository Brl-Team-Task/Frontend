import React, { useState, useEffect } from 'react';
import axios from 'axios';

function YourComponent() {
  const [newData, setData] = useState([]);

    async function fetchData() {
      try {
        const token = localStorage.getItem('Token');
         console.log(token);
         
        if (!token) {
          console.log("no token value found"); 
          console.log(token);
        }
        const response = await axios.get('https://erp-backend-mqly.onrender.com/api/getfaculty/', 
        {
          headers: {
            token: `Bearer ${token}`,
          },
        },{data:{
          token
        }}
        );
        console.log("response of api->",response);
        setData(response.data);
        console.log("data of api",newData);
      } 
      catch(error) {
          console.log('response:', error.response);
          console.error('error hai:', error);
      }
    }

    fetchData();
 

  return (
    <div>
      <h1>Faculty</h1>
      <ul>
        {newData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default YourComponent;
