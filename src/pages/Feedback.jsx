import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackItem = ({ feedbackItem, handleRatingChange }) => {
  return (
    <li>
      <p>Subject Code: {feedbackItem.subject_code}</p>
      <p>Faculty ID: {feedbackItem.faculty_id}</p>
      {[1, 2, 3, 4].map((questionNumber) => (
        <div key={questionNumber}>
          <p>Question {questionNumber}: {feedbackItem[`question_${questionNumber}`]}</p>
          {/* You can render rating options here and handle changes */}
          {[1, 2, 3, 4, 5].map((ratingOption) => (
            <label key={ratingOption}>
              <input
                type="radio"
                name={`rating_${feedbackItem.subject_code}_${feedbackItem.faculty_id}_${questionNumber}`}
                value={ratingOption}
                checked={feedbackItem[`question_${questionNumber}`] === ratingOption}
                onChange={(e) =>
                  handleRatingChange(
                    feedbackItem.subject_code,
                    feedbackItem.faculty_id,
                    questionNumber,
                    e.target.value
                  )
                }
              />
              {ratingOption}
            </label>
          ))}
        </div>
      ))}
    </li>
  );
};

const Feedback = () => {
  const token = localStorage.getItem('Token'); // Replace 'your_token_key' with the actual key used to store the token


  const [feedbackData, setFeedbackData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send the feedback data to the API
        const feedbackResponse = await axios.post(
          'https://erp-backend-mqly.onrender.com/api/feedbackform/',
          {
            token: token,
            feedback: [
              {
                subject_code: '', // Leave it empty for now, we'll update it below
                faculty_id: 1,
                question_1: 0,
                question_2: 0,
                question_3: 0,
                question_4: 0,
              },
              {
                subject_code: '',
                faculty_id: 2,
                question_1: 0,
                question_2: 0,
                question_3: 0,
                question_4: 0,
              },
            ],
          },
          {
            // headers: {
            //   Authorization: `Bearer ${token}`, // Use the retrieved token from local storage
            //   // Other headers if needed
            // },
          }
        );

        // Update the subject codes based on the received response
        const updatedFeedback = feedbackResponse.data.feedback.map((feedbackItem, index) => ({
          ...feedbackItem,
          subject_code: feedbackResponse.data.subject_data[index].subject_code,
        }));

        setFeedbackData({ ...feedbackResponse.data, feedback: updatedFeedback });
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [token]);

  const handleRatingChange = (subjectCode, facultyId, questionNumber, rating) => {
    // Update the feedbackData state with the new rating
    setFeedbackData((prevData) => {
      const newData = { ...prevData };
      const feedbackItem = newData.feedback.find(
        (item) => item.subject_code === subjectCode && item.faculty_id === facultyId
      );

      if (feedbackItem) {
        feedbackItem[`question_${questionNumber}`] = parseInt(rating, 10);
      }

      return newData;
    });
  };

  return (
    <>
      <div>Feedback Form</div>
      {error && (
        <div>
          <p>Error: {error.message}</p>
        </div>
      )}
      {feedbackData && (
        <div>
          <h2>User Data:</h2>
          {/* Display user data here */}
          <p>Token: {feedbackData.token}</p>

          <h2>Feedback Form:</h2>
          <ul>
            {feedbackData.feedback.map((feedbackItem, index) => (
              <FeedbackItem
                key={index}
                feedbackItem={feedbackItem}
                handleRatingChange={handleRatingChange}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Feedback;
