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
      <h1 className="text-2xl font-bold mb-4">자유여행 </h1>
      {schedule.map((day, index) => (
        <ScheduleForm key={index} day={day} index={index} updateDay={updateDay} />
      ))}
     
    </div>
  );
}
