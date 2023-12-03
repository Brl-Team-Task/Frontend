import React from "react";
import Graph from "../Components/graph";
import Card from "../Components/card";
import "./attendance.css";
import Calender from "../Components/calender";

export default function Attendance({ prop }) {
  const data = prop;
  return (
    <>
      <div className="graph">
        <div className="disc">
          <div className="graph-section">
            <div>
              <p>
                Attendance Percentage of {data.name} ({data.section})
              </p>
            </div>
            <div>
              <Graph data={data} />
            </div>
          </div>
          <div className="carding">
            <div className="total">Total Lectures : {data.total_classes}</div>
            <div className="total">
              Percentage : {(data.present * 100) / data.total_classes} %
            </div>
            <div className="cardholder">
              <Card prop="Total Presents" data={data.present} color="#009BE3" />
              <Card prop="Total Absents" data={data.absent} color="#DC3C3C" />
            </div>
          </div>
        </div>
        <Calender/>
      </div>
    </>
  );
}
