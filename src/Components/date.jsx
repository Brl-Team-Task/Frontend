import moment from "moment/moment";
import React from "react";
import "./date.css"

const Date = () => {
  const currentDate = moment();
  const formattedDate = currentDate.format("DD MMMM, YYYY");
  return (
    <>
      <div className="date">
        <p>{formattedDate}</p>
      </div>
    </>
  );
};

export default Date;
