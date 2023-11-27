import React, { useState } from
 
'react';
import axios from
 
'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const PassConfirm = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const isPasswordsMatch = newPassword === confirmPassword;

//   const handleShowNewPassword = () => {
//     setShowNewPassword((prev) => !prev);
//   };

//   const handleShowConfirmPassword = () => {
//     setShowConfirmPassword((prev) => !prev);
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     if (!newPassword || !confirmPassword) {
//       toast.error('Please enter both new password and confirm password');
//       return;
//     }

//     if ((newPassword.length||confirmPassword.length) < 8) {
//         toast.error('Password must be at least 8 characters long');
//         return;
//       }

//     if (!isPasswordsMatch) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     try {
//       const data = {
//         newPassword,
//       };

//       const response = await axios.post('https://erp-backend-mqly.onrender.com/api/password/reset/{headers}', data);
// console.log(response.data)
//       if (response.status === 200) {
//         toast.success('Password successfully reset');
//         // Redirect to login page using useNavigate
//         navigate('/login');
//       } else {
//         const errorData = response.data;
//         toast.error(errorData.error || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Internal Server Error');
//     }
//   };

//   return (
//     <div className='VerifyLayout'>
//       <h1>Reset Password</h1>

//       <form onSubmit={handleResetPassword}>
//         <label>New Password:</label>
//         <input
//           type={showNewPassword ? 'text' : 'password'} // Toggle password type for new password
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <button type="button" onClick={handleShowNewPassword}>
//           {showNewPassword ? 'Hide New Password' : 'Show New Password'}
//         </button>

//         <label>Confirm Password:</label>
//         <input
//           type={showConfirmPassword ? 'text' : 'password'} // Toggle password type for confirm password
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button type="button" onClick={handleShowConfirmPassword}>
//           {showConfirmPassword ? 'Hide Confirm Password' : 'Show Confirm Password'}
//         </button>

//         <button type="submit" disabled={!isPasswordsMatch}>Reset Password</button>
//       </form>

//       <ToastContainer />
//     </div>
//   );
// };

// export default PassConfirm;
const PassConfirm = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isPasswordsMatch = newPassword === confirmPassword;

  const handleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Please enter both new password and confirm password');
      return;
    }

    if ((newPassword.length || confirmPassword.length) < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (!isPasswordsMatch) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const data = {
        newPassword,
      };

      const headers = {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      };

      const response = await axios.post('https://erp-backend-mqly.onrender.com/api/password/reset/', { headers });

      if (response.status === 200) {
        toast.success('Password successfully reset');
        // Redirect to login page using useNavigate
        navigate('/login');
      } else {
        const errorData = response.data;
        toast.error(errorData.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error('Internal Server Error');
    }
  };

  return (
    <div className='VerifyLayout'>
      <h1>Reset Password</h1>

      <form onSubmit={handleResetPassword}>
        <label>New Password:</label>
        <input
          type={showNewPassword ? 'text' : 'password'} // Toggle password type for new password
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="button" onClick={handleShowNewPassword}>
          {showNewPassword ? 'Hide New Password' : 'Show New Password'}
        </button>

        <label>Confirm Password:</label>
        <input
          type={showConfirmPassword ? 'text' : 'password'} // Toggle password type for confirm password
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="button" onClick={handleShowConfirmPassword}>
          {showConfirmPassword ? 'Hide Confirm Password' : 'Show Confirm Password'}
        </button>

        <button type="submit" disabled={!isPasswordsMatch}>Reset Password</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default PassConfirm;