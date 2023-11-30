import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

export default function Graph({ data }) {
  const processedData = [];
  
  for (const subjectTeacher in data.data) {
    const [subject, teacher] = subjectTeacher.split(", ");
    let presentCount = 0;
    let absentCount = 0;

    for (const attendanceRecord of data.data[subjectTeacher]) {
      if (attendanceRecord[1]) {
        presentCount++;
      } else {
        absentCount++;
      }
    }

    processedData.push({
      name: subject + "(" + teacher + ")",
      percentage: (presentCount * 100) / (presentCount + absentCount),
    });
  }
  return (
      <PieChart width={400} height={350}>
        <Pie
          dataKey="percentage"
          isAnimationActive={false}
          data={processedData}
          cx={200}
          cy={200}
          outerRadius={140}
          fill="#DC3C3C"
          label
        />
        <Tooltip />
      </PieChart>
  );
}
