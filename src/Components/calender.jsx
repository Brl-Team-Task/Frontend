import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import Date from "./date";
import Particular from "./particular";

export default function Calender({data}) {
  return (
    <>
      <div className="calen">
        <Particular data={data} />
        <Date />
        <Calendar />
      </div>
    </>
  );
}
