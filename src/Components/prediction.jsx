import React from 'react'
import Branch from "./Branch";
import Utscore from "./Utscore";
import OpenElec from "./OpenElec";
import "./Prediction.css"
import { useNavigate, Link } from "react-router-dom";


const Prediction = () => {
    return (
        <>
           <div className='Predict'>
            <div className="Ut">
                <div className="Utimg">               
                <h1>UT Marks Predictor</h1>
                <Link to={"/Utscore"} className='click'>Click Here</Link>
                </div>
            </div>
            <div className="Ut">
                <div className="Branchimg">               
                <h1>Branch Change</h1>
                <Link to={"/Branch"} className='click'>Click Here</Link>
                </div>
            </div> <div className="Ut">
                <div className="Oeimg">               
                <h1>OE Predictor</h1>
                <Link to={"/OpenElec"} className='click'>Click Here</Link>
                </div>
            </div></div>
        </>
    )
}

export default Prediction;
