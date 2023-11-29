import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TimeTable.css';

const downloadImage = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const data = new Blob([response.data]);
    const url = window.URL.createObjectURL(data);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'timetable.png';
    link.click();
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};


const Timetable= () => {
 
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        
        const response = await axios.get('https://erp-backend-mqly.onrender.com/api/gettimetable/');
        
       
        setTimetableData(response.data.timetable_data);
      } catch (error) {
      
        
      } finally {
     
        setLoading(false);
      }
    };

    
    fetchTimetableData();
  }, []); 

 
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  
  const selectedTimetable = timetableData.find(timetable => timetable.section === selectedValue);

  return (
    <div>
      <div className='dropdown'>
        <label htmlFor="tt">Choose Class:</label>
        <select id="tt" name="tt" value={selectedValue} onChange={handleSelectChange}>
        <option value="">Select Class</option>
          <option value="CSE-1">CSE-1</option>
          <option value="CSE-2">CSE-2</option>
          <option value="CSE3">CSE-3</option>
          <option value="CSE(DS)-1">CSE(DS)-1</option>
          <option value="CSE(DS)-2">CSE(DS)-2</option>
          <option value="CSE(AIML)-1">CSE(AIML)-1</option>
          <option value="CSE(AIML)-2">CSE(AIML)-2</option>
          <option value="CS-1">CS-1</option>
          <option value="CS-2">CS-2</option>
        </select>
      </div>
      {selectedTimetable ? (
        <div>
          <p className='head'>Class: {selectedTimetable.section}</p>
          <p><img src={selectedTimetable.time_table_url} alt="Timetable" /></p>
          <button onClick={() => downloadImage(selectedTimetable.time_table_url)}>
            Download Timetable
          </button>
        </div>
      ) : (
        <p className='head'>Please select a class to view the timetable.</p>
      )}
    </div>
  );
};


export default Timetable;


