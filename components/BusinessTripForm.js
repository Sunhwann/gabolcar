"use client";

import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { addBusinessTrip, saveTempBusinessTrip, loadTempBusinessTrip } from "../firebaseFunctions";

export default function BusinessTripForm() {
  const [userId, setUserId] = useState(null);
  const [tripDetails, setTripDetails] = useState({
    title: "",
    schedules: [{ departure: "", destinations: [""], meetingTime: "", duration: "" }]
  });

  /** ✅ 1. 로그인한 사용자 가져오기 */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        console.log("✅ 로그인된 userId:", user.uid);
      } else {
        setUserId(null);
        console.log("❌ 로그인 안 됨");
      }
    });

    return () => unsubscribe();
  }, []);

  /** ✅ 2. 최근 데이터 불러오기 */
  useEffect(() => {
    const fetchTempData = async () => {
      if (!userId) return;
      console.log("🔄 최근 임시 저장 데이터 불러오는 중...");
      const savedData = await loadTempBusinessTrip(userId);
      if (savedData) {
        console.log("📌 불러온 데이터:", savedData);
        setTripDetails(savedData);
      }
    };

    fetchTempData();
  }, [userId]);

  /** 입력 변경 핸들러 */
  const handleChange = (index, key, value) => {
    setTripDetails((prevTripDetails) => {
      const updatedSchedules = [...prevTripDetails.schedules];
      updatedSchedules[index] = { ...updatedSchedules[index], [key]: value };
      return { ...prevTripDetails, schedules: updatedSchedules };
    });
  };

  /** ✅ 3. 목적지 추가 */
  const addDestination = (index) => {
    setTripDetails((prevTripDetails) => {
      const updatedSchedules = [...prevTripDetails.schedules];
      updatedSchedules[index].destinations.push("");
      return { ...prevTripDetails, schedules: updatedSchedules };
    });
  };

  /** ✅ 4. 목적지 삭제 */
  const removeDestination = (index, destIndex) => {
    setTripDetails((prevTripDetails) => {
      const updatedSchedules = [...prevTripDetails.schedules];
      updatedSchedules[index].destinations.splice(destIndex, 1);
      return { ...prevTripDetails, schedules: updatedSchedules };
    });
  };

  /** ✅ 5. 임시 저장 */
  const handleSaveTemp = async () => {
    if (!userId) {
      console.error("❌ User ID가 없음.");
      return;
    }
    try {
      await saveTempBusinessTrip(userId, tripDetails);
      alert("📌 임시 저장 완료!");
    } catch (error) {
      console.error("❌ 임시 저장 실패:", error);
    }
  };

  /** ✅ 6. 견적 요청 (최종 저장) */
  const handleRequestQuote = async () => {
    if (!userId) {
      console.error("❌ User ID가 없음.");
      return;
    }
    try {
      const tripId = await addBusinessTrip(userId, tripDetails);
      alert(`🚀 견적 요청 완료! Trip ID: ${tripId}`);
    } catch (error) {
      console.error("❌ 견적 요청 실패:", error);
    }
  };

  if (!userId) {
    return <p className="text-red-500">❌ 로그인 후 이용해 주세요.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">👔 비즈니스 트립</h2>

      {tripDetails.schedules.map((schedule, index) => (
        <div key={index} className="p-4 border rounded-lg bg-gray-100 mb-4">
          <input
            type="text"
            placeholder="출발 장소"
            value={schedule.departure}
            onChange={(e) => handleChange(index, "departure", e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
          />

          {schedule.destinations.map((dest, destIndex) => (
            <div key={destIndex} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="목적지"
                value={dest}
                onChange={(e) => {
                  setTripDetails((prevTripDetails) => {
                    const updatedSchedules = [...prevTripDetails.schedules];
                    updatedSchedules[index].destinations[destIndex] = e.target.value;
                    return { ...prevTripDetails, schedules: updatedSchedules };
                  });
                }}
                className="w-full p-2 border rounded-lg mb-2"
              />
              <button onClick={() => removeDestination(index, destIndex)} className="text-red-500">❌</button>
            </div>
          ))}

          <button onClick={() => addDestination(index)} className="text-blue-500">➕ 목적지 추가</button>

          <input
            type="time"
            value={schedule.meetingTime}
            onChange={(e) => handleChange(index, "meetingTime", e.target.value)}
            className="w-full p-2 border rounded-lg mt-2"
          />

          <input
            type="text"
            placeholder="예상 이용시간 (예: 4시간)"
            value={schedule.duration}
            onChange={(e) => handleChange(index, "duration", e.target.value)}
            className="w-full p-2 border rounded-lg mt-2"
          />
        </div>
      ))}

      <button onClick={handleSaveTemp} className="mt-4 p-3 text-lg w-full rounded-lg bg-yellow-500 text-white">
        💾 임시 저장
      </button>

      <button onClick={handleRequestQuote} className="mt-4 p-3 text-lg w-full rounded-lg bg-green-500 text-white">
        📩 견적 요청
      </button>
    </div>
  );
}
