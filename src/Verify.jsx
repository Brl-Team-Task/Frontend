import React, { useState } from 'react';
import axios from 'axios';
import './Style.css'
import VerifyImg from '../src/VerifyImg.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verify = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, otp };

    try {
      const response = await axios.post('https://erp-backend-mqly.onrender.com/api/verifyotp/', data);
console.log(response.data);
      if (response.data.status === 200) {
      toast.success('OTP verified. You can now sign in.');
      }
      else if (response.data.status===400){
        toast.error("Invalid Credentials")
      }
      else{
        toast.error('Something went wrong')
      }

    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='Signimage'>
      <div className='VerifyLayout'>
      <div className='VerifyImage'>
          <img src={VerifyImg} alt="" /></div>
  
        <div className='Verify'>
      <h1>OTP Verification</h1>
      <form onSubmit={handleSubmit}>
<label>Enter the OTP sent to the mail</label>

        
<input   className='VerifyInput'
type="email"  
required  
value={email} placeholder='Email'
onChange={(e) => setEmail(e.target.value)}
        />
        <br />
<label>OTP:</label>
        <input className='VerifyInput'
          type="text"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <br />
        <button type="submit" className='VerifyButton'>Verify</button>
      </form></div> </div>  </div>
     
  );
};

export default Verify;
