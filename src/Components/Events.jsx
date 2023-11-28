import React, { useState, useEffect } from 'react';
import './events.css';
import axios from 'axios';

const Events = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPoster, setSelectedPoster] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://erp-backend-mqly.onrender.com/api/getevent/')
      .then(response => {
        const sortedData = response.data.event_data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setData(sortedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  };

  const handlePosterClick = (imageUrl) => {
    setSelectedPoster(imageUrl);
  };

  const handleClosePoster = () => {
    setSelectedPoster(null);
  };

  return (
    <div>
      <p className='heading'>Upcoming Events</p>
      {loading && <p>Loading events...</p>}
      {error && <p>Error fetching events.</p>}
      {!loading && !error && (
        <div>
          <table>
            <thead>
              <tr className='heading'>
                <th>Event Name</th>
                <th>Date Of The Event</th>
                <th>Poster/Information</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.event_name}</td>
                  <td>{item.date}</td>
                  <td className='poster' onClick={() => handlePosterClick(item.poster)}>
                  <button>
                    View Poster
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedPoster && (
            <div className='poster-modal'>
              <div className='poster-content'>
                <span className='close-btn' onClick={handleClosePoster}>&times;</span>
                <img src={selectedPoster} alt='Poster' />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
