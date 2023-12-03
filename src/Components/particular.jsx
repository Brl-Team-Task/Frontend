import React from "react";
import { useState } from "react";
import "./particular.css";

const Particular = ({ data }) => {
  const processedData = [];
  const [selectedValue, setSelectedValue] = useState("DSTL");

  for (const subjectTeacher in data.data) {
    const [subject, teacher] = subjectTeacher.split(",");
    let presentCount = 0;
    let absentCount = 0;

    for (const attendanceRecord of data.data[subjectTeacher]) {
      if (attendanceRecord[1]) {
        presentCount++;
      } else {
        absentCount++;
      }
    }
    console.log(processedData);

    processedData.push({
      name: subject,
      teacher: teacher,
      present: presentCount,
      absent: absentCount,
    });
  }
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  function capitalizeFirstLetter(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  let capitalizedStr = "";
  if (selectedValue !== "DSTL") {
    capitalizedStr = capitalizeFirstLetter(selectedValue);
  }

  console.log(capitalizedStr);

  const selected = processedData.find(
    (e) => e.name.slice(2, -1) === selectedValue
  );
  console.log(selected);
  return (
    <>
      <div className="particular">
        <div className="flexbox">
          <div className="left">
            <select
              id="tt"
              name="tt"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="DSTL">Subject : DSTL</option>
              <option value="Cyber Security">Subject : Cyber Security</option>
              <option value="Data structure">Subject : Data Structure</option>
              <option value="Technical Communication">
                Subject : Technical Communication
              </option>
              <option value="computer organization architecture">
                Subject : COA
              </option>
            </select>
          </div>
          {selected ? (
            <>
              <div className="data">
                <div className="sub">{selectedValue === "DSTL" ? selectedValue : capitalizedStr}</div>
                <div className="teach">~ {selected.teacher.slice(2, -2)}</div>
                <div className="atten">
                  Attendance : {selected.present} / {selected.present + selected.absent}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Particular;
