import React from "react";
import "./card.css"

export default function Card({prop, data, color}){
    return (
        <div className="card" style={{backgroundColor : color}}>{prop} : {data}</div>
    );
}