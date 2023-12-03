import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import Date from "./date";

export default function Calender() {
  return (
    <>
      <div className="calen">
        <Date />
        <Calendar />
      </div>
    </>
  );
}
