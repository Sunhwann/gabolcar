"use client";

import { useState } from "react";

export default function TravelSchedule() {
  const [schedule, setSchedule] = useState([
    { day: 1, departure: "", googleMapLink: "", duration: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index][field] = value;
    setSchedule(updatedSchedule);
  };

  const addDay = () => {
    setSchedule([...schedule, { day: schedule.length + 1, departure: "", googleMapLink: "", duration: "" }]);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">자유여행 일정</h2>
      {schedule.map((day, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <h3 className="font-bold mb-2">{day.day}일차</h3>
          <input
            type="text"
            placeholder="출발 장소 입력"
            className="border p-2 w-full rounded"
            value={day.departure}
            onChange={(e) => handleInputChange(index, "departure", e.target.value)}
          />
          <input
            type="text"
            placeholder="구글 지도 링크 입력"
            className="border p-2 w-full mt-2 rounded"
            value={day.googleMapLink}
            onChange={(e) => handleInputChange(index, "googleMapLink", e.target.value)}
          />
          {day.googleMapLink && (
            <iframe
              src={day.googleMapLink}
              width="100%"
              height="200"
              className="mt-2"
              allowFullScreen
            />
          )}
          <input
            type="text"
            placeholder="이용 시간 입력 (예: 2시간)"
            className="border p-2 w-full mt-2 rounded"
            value={day.duration}
            onChange={(e) => handleInputChange(index, "duration", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addDay} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        일정 추가
      </button>
    </div>
  );
}
