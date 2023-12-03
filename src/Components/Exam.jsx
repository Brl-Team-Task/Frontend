import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './exams.css';

const API_URL = 'https://erp-backend-mqly.onrender.com/api/examdata/';
const token = localStorage.getItem('Token');

const Exam = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('API Response:', response.data);
      setData(response.data.exam_data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterExams = (status) => {
    const currentDate = new Date();

    return data.filter((item) => {
      const fromDateObj = new Date(item.date);
      const fromDateWithoutTime = new Date(
        fromDateObj.getFullYear(),
        fromDateObj.getMonth(),
        fromDateObj.getDate()
      );

      if (status === 'upcoming') {
        return fromDateWithoutTime >= currentDate;
      } else if (status === 'ongoing') {
        return (
          fromDateWithoutTime < currentDate &&
          fromDateObj.getTime() + item.duration * 60 * 1000 > currentDate.getTime()
        );
      } else if (status === 'past') {
        return fromDateWithoutTime < currentDate;
      }

      return false;
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='graph'>
      <div className='esec'>
        <p className='ue'>Upcoming Exams</p>
        <table>
          <tbody>
            {filterExams('upcoming').map((item) => (
              <tr key={item.id} className='ue'>
                <td>{item.exam_name}</td>
                <td>{item.total_marks} Marks</td>
                <td>{item.date}</td>
                <td>
                  {item.exam_name === 'University Exam' ? (
                    <a className='dadmitcard' href={item.admit_card} download>
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
      <div className='esec'>
        <p className='oe'>Ongoing Exams</p>
        <table>
          <tbody>
            {filterExams('ongoing').map((item) => (
              <tr key={item.id} className='oe'>
                <td>{item.exam_name}</td>
                <td>{item.total_marks} Marks</td>
                <td>{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='esec'>
        <p className='pe'>Past Exams</p>
        <table>
          <tbody>
            {filterExams('past').map((item) => (
              <tr key={item.id} className='pe'>
                <td>{item.exam_name}</td>
                <td>{item.total_marks}  Marks</td>
                <td>
                  <a className='dresult' href={item.result} download>
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


