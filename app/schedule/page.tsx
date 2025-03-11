"use client";

import { useState } from "react";
import ScheduleForm from "../../components/ScheduleForm";

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([{ day: 1, departure: "", googleMapLink: "", duration: "" }]);

  const addDay = () => {
    setSchedule([...schedule, { day: schedule.length + 1, departure: "", googleMapLink: "", duration: "" }]);
  };

  const updateDay = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">자유여행 일정 계획</h1>
      {schedule.map((day, index) => (
        <ScheduleForm key={index} day={day} index={index} updateDay={updateDay} />
      ))}
      <button onClick={addDay} className="mt-4 p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        + 일정 추가
      </button>
    </div>
  );
}
