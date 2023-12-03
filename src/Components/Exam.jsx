import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './exams.css';

const API_URL = 'https://erp-backend-mqly.onrender.com/api/examdata/';
const token = localStorage.getItem('Token');


const Exam = () => {
 const [data, setData] = useState([]); 
 const fetchData = async () => {
   try {
     const response = await axios.get(API_URL, {
       headers: {
         'Authorization': `Bearer ${token}`
       },
     });
 
     console.log('API Response:', response.data);
     setData(response.data.exam_data); 
   } catch (error) {
     console.error('Error fetching data:', error.message);
   }
 };

  useEffect(() => {
    fetchData();
  }, []);

  const getClassName = ({date}) => {
    const currentDate = new Date();
    const fromDateObj = new Date(date);

    if (fromDateObj < currentDate) {
      return 'pe';
    }
     else if (fromDateObj.getDate() === currentDate.getDate() &&
      fromDateObj.getMonth() === currentDate.getMonth() &&
      fromDateObj.getFullYear() === currentDate.getFullYear())
   {
      return 'oe';
    } 
    else 
    {
      return 'ue';
    }
  };

  return (
    <div className='graph'>
    <div>
      <p className='ue'>Upcoming Exams</p>
      <table>
        <tbody>
        {data.map((item) => (
<tr key={item.id} className={getClassName(item.date)}>
              <td>{item.exam_name}</td>
              <td>{item.total_marks}</td>
              <td>{item.date}</td>
              <td>
                {item.exam_name === 'University Exam' ? (
                  <a href={item.admit_card} download>
                    Admit Card
                  </a>
                ) : (
                  item.duration
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      <p className='oe'>Ongoing Exams</p>
      <table>
        <tbody>
        {data.map((item) => (
<tr key={item.id} className={getClassName(item.date)}>
              <td>{item.exam_name}</td>
              <td>{item.total_marks}</td>
              <td>{item.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      <p className='pe'>Past Exams</p>
      <table>
        <tbody>
        {data.map((item) => (
<tr key={item.id} className={getClassName(item.date)}>
              <td>{item.exam_name}</td>
              <td>{item.total_marks}</td>
              <td>
                <a href={item.result} download>
                  Download Result
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Exam;

