"use client";

import { useState, useEffect } from "react";  // ✅ useEffect 추가
import { auth } from "../firebaseConfig"; // Firebase 인증 가져오기
import { saveTempTravel, requestQuotationTravel } from "../firebaseFunctions"; // Firestore 함수 가져오기

export default function ScheduleForm({ userId: propUserId }) {
  const [userId, setUserId] = useState(propUserId || null);  // ✅ 상태 선언 추가
  const [schedules, setSchedules] = useState([]); 

// ✅ Firebase에서 로그인된 사용자 ID 가져오기
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setUserId(user.uid);
    } else {
      setUserId(null);
    }
  });

  return () => unsubscribe();
}, []);
  // 📌 구글 지도 링크 열기
  const openMapLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  // 📌 새로운 일정 추가
  const addSchedule = () => {
    setSchedules([...schedules, { id: schedules.length + 1, departure: "", arrival: "", waypoints: [""], googleMapLinks: ["", ""], duration: "" }]);
  };

  // 📌 일정 삭제
  const removeSchedule = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  // 📌 경유지 추가
  const addWaypoint = (index) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index].waypoints.push("");
    updatedSchedules[index].googleMapLinks.push("");
    setSchedules(updatedSchedules);
  };

  // 📌 경유지 삭제
  const removeWaypoint = (index, wpIndex) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index].waypoints.splice(wpIndex, 1);
    updatedSchedules[index].googleMapLinks.splice(wpIndex + 1, 1);
    setSchedules(updatedSchedules);
  };

  // ✅ **임시 저장 (`tempTravel`)**
  const handleSaveTemp = async () => {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }
  
    try {
      await saveTempTravel(userId, schedules);
      alert("임시 저장되었습니다!");
    } catch (error) {
      console.error("Error saving temp travel:", error);
    }
  };
  

  // ✅ **견적 요청 (`QuotationTravel`)**
  const handleRequestQuotation = async () => {
    try {
      const requestId = await requestQuotationTravel(userId, schedules);
      console.log(`📩 견적 요청이 완료되었습니다! 요청 ID: ${requestId} (QuotationTravel)`);
      alert(`📩 견적 요청 완료! 요청 ID: ${requestId}`);
    } catch (error) {
      console.error("❌ 견적 요청 실패:", error);
      alert("⚠️ 견적 요청에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📅 일정 계획</h2>
      {schedules.map((schedule, index) => (
        <div key={schedule.id} className="w-full mb-6 p-6 border rounded-lg bg-gray-50 shadow">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">{index + 1}일차</h3>

          <div className="mb-3">
            <input
              type="text"
              placeholder="출발 장소 입력"
              value={schedule.departure}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].departure = e.target.value;
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg text-lg"
            />
            <input
              type="text"
              placeholder="구글 지도 링크"
              value={schedule.googleMapLinks[0]}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].googleMapLinks[0] = e.target.value;
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg mt-2 text-lg"
            />
            <button onClick={() => openMapLink(schedule.googleMapLinks[0])} className="text-blue-600 underline text-lg mt-2">🔗 구글 지도 확인</button>
          </div>

          {schedule.waypoints.map((waypoint, wpIndex) => (
            <div key={wpIndex} className="mt-4">
              <input
                type="text"
                placeholder={`경유지 ${wpIndex + 1} 입력`}
                value={waypoint}
                onChange={(e) => {
                  const updatedSchedules = [...schedules];
                  updatedSchedules[index].waypoints[wpIndex] = e.target.value;
                  setSchedules(updatedSchedules);
                }}
                className="w-full p-3 border rounded-lg mb-2 text-lg"
              />
              <input
                type="text"
                placeholder="구글 지도 링크"
                value={schedule.googleMapLinks[wpIndex + 1]}
                onChange={(e) => {
                  const updatedSchedules = [...schedules];
                  updatedSchedules[index].googleMapLinks[wpIndex + 1] = e.target.value;
                  setSchedules(updatedSchedules);
                }}
                className="w-full p-3 border rounded-lg text-lg"
              />
              <button onClick={() => openMapLink(schedule.googleMapLinks[wpIndex + 1])} className="text-blue-600 underline text-lg mt-2">🔗 구글 지도 확인</button>
              <button onClick={() => removeWaypoint(index, wpIndex)} className="bg-red-500 text-white p-2 rounded-lg mt-2 ml-2">❌ 삭제</button>
            </div>
          ))}

          <button onClick={() => addWaypoint(index)} className="bg-gray-600 text-white p-3 rounded-lg mt-3 w-full text-lg">➕ 경유지 추가</button>

          <div className="mt-3">
            <input
              type="text"
              placeholder="도착 장소 입력"
              value={schedule.arrival}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].arrival = e.target.value;
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg text-lg"
            />
            <input
              type="text"
              placeholder="구글 지도 링크"
              value={schedule.googleMapLinks[schedule.googleMapLinks.length - 1]}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index].googleMapLinks[schedule.googleMapLinks.length - 1] = e.target.value;
                setSchedules(updatedSchedules);
              }}
              className="w-full p-3 border rounded-lg mt-2 text-lg"
            />
            <button onClick={() => openMapLink(schedule.googleMapLinks[schedule.googleMapLinks.length - 1])} className="text-blue-600 underline text-lg mt-2">🔗 구글 지도 확인</button>
          </div>

          <input
            type="text"
            placeholder="대략적인 이용시간 입력 (예: 3시간)"
            value={schedule.duration}
            onChange={(e) => {
              const updatedSchedules = [...schedules];
              updatedSchedules[index].duration = e.target.value;
              setSchedules(updatedSchedules);
            }}
            className="w-full p-3 border rounded-lg mt-3 text-lg"
          />

          <button onClick={() => removeSchedule(index)} className="bg-red-600 text-white p-3 rounded-lg mt-3 w-full text-lg">🗑 일정 삭제</button>
        </div>
      ))}

      <button onClick={addSchedule} className="bg-blue-500 text-white p-3 rounded-lg text-lg w-full mt-4">➕ 새로운 일정 추가</button>
      <button onClick={handleSaveTemp} className="bg-yellow-500 text-white p-3 rounded-lg text-lg w-full mt-4">💾 임시 저장</button>
      <button onClick={handleRequestQuotation} className="bg-green-500 text-white p-3 rounded-lg text-lg w-full mt-2">📩 견적 요청</button>
    </div>
  );
}
