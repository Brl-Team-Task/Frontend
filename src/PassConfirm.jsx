import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PassConfirm = () => {
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [showconfirm_password, setShowconfirm_password] = useState(false);

  const isPasswordsMatch = password === confirm_password;

  const handleShowpassword = () => {
    setShowpassword((prev) => !prev);
  };

  const handleShowconfirm_password = () => {
    setShowconfirm_password((prev) => !prev);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirm_password) {
      toast.error("Please enter both new password and confirm password");
      return;
    }

    if ((password.length || confirm_password.length) < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!isPasswordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    const token = localStorage.getItem('Token');

    try {
      const data = {
        password, confirm_password, token
      };

      const headers = {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      };

      const response = await axios.patch(
        "https://erp-backend-mqly.onrender.com/api/password/reset/",
        { headers, data }
      );

      if (response.status === 200) {
        toast.success("Password successfully reset");
        // Redirect to login page using useNavigate
        navigate("/login");
      } else {
        const errorData = response.data;
        toast.error(errorData.error || "Something went wrong");
      }
    } catch (error) {
      console.error("This is the error", error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="VerifyLayout">
      <h1>Reset Password</h1>

      <form onSubmit={handleResetPassword}>
        <label>New Password:</label>
        <input
          type={showpassword ? "text" : "password"} // Toggle password type for new password
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
        />
        <button type="button" onClick={handleShowpassword}>
          {showpassword ? "Hide New Password" : "Show New Password"}
        </button>

        <label>Confirm Password:</label>
        <input
          type={showconfirm_password ? "text" : "password"} // Toggle password type for confirm password
          value={confirm_password}
          onChange={(e) => setconfirm_password(e.target.value)}
          required
        />
        <button type="button" onClick={handleShowconfirm_password}>
          {showconfirm_password
            ? "Hide Confirm Password"
            : "Show Confirm Password"}
        </button>

        <button type="submit" disabled={!isPasswordsMatch}>
          Reset Password
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default PassConfirm;
