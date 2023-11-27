import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Verify from './Verify';
import Forgot from './Forgot'
import PassConfirm from './PassConfirm';
function Shifa() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Verify" element={<Verify />} />
      <Route path="/Forgot" element={<Forgot />} />
      <Route path="/PassConfirm" element={<PassConfirm />} />
    </Routes>
  </BrowserRouter>
  )
}

export default Shifa