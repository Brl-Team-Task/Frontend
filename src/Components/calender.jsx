import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import { useState } from "react";

export default function Calender() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div className="calen">
        <Calendar
          onChange={setDate}
          value={date}
        />
      </div>
    </>
  );
}
