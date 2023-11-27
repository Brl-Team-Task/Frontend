import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Attendance() {
  const token = localStorage.getItem("Token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      token,
    };

    try {
      const response = await axios.post(
        "https://erp-backend-mqly.onrender.com/api/attendance/",
        { headers, data }
      );
      console.log(response.data);

      if (response.data.status === 201) {
        toast.success("Attendance submitted successfully");
      } else {
        toast.error("Failed to submit attendance. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <>
      <div>
        <button onClick={handleSubmit}>Click here</button>
      </div>
      <ToastContainer />
    </>
  );
}
