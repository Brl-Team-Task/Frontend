import React from "react";
import { useState } from "react";

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

  const selected = processedData.find(
    (e) => 
    console.log(e.name.slice(2, -1) === selectedValue)
  );
    console.log(selected);
  return (
    <>
      <div className="dropdown">
        <label htmlFor="tt">Choose Class : </label>
        <select
          id="tt"
          name="tt"
          value={selectedValue}
          onChange={handleSelectChange}
        >
          <option value="DSTL">DSTL</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="Data structure">Data Structure</option>
          <option value="Technical Communication">Technical Communication</option>
          <option value="computer organization architecture">COA</option>
        </select>
        {selected ? (<div>{selected.present}</div>) : null}
      </div>
      
    </>
  );
};

export default Particular;
