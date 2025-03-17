"use client";

import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { saveTempAirportTransfer, requestQuotationAirportTransfer } from "../firebaseFunctions";
import { loadTempAirportTransfer } from "../firebaseFunctions"; // 이 줄 추가


const airportList = ["노이바이 국제공항", "깟비 국제공항", "반돈 국제공항"];

export default function AirportTransferForm() {
  const [userId, setUserId] = useState(null);
  const [transferDetails, setTransferDetails] = useState({
    isPickup: true,
    isDropoff: true,
    pickupAirport: "",
    pickupCustomLocation: "",
    pickupFlightNumber: "",
    pickupTime: "",
    dropoffAirport: "",
    dropoffCustomLocation: "",
    dropoffFlightNumber: "",
    dropoffTime: "",
    googleMapLinks: ["", ""]
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);

        // Firestore에서 임시 저장된 데이터 불러오기
        const savedData = await loadTempAirportTransfer(user.uid);
        if (savedData) {
          setTransferDetails(savedData);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSaveTemp = async () => {
    if (!userId) {
      alert("⚠️ 로그인 후 이용해 주세요!");
      return;
    }

    try {
      await saveTempAirportTransfer(userId, transferDetails);
      alert("✅ 공항 픽업/샌딩 예약이 임시 저장되었습니다!");
    } catch (error) {
      console.error("❌ 임시 저장 실패:", error);
      alert("⚠️ 임시 저장 중 오류가 발생했습니다.");
    }
  };

  const handleRequestQuotation = async () => {
    if (!userId) {
      alert("⚠️ 로그인 후 이용해 주세요!");
      return;
    }

    if (!transferDetails.isPickup && !transferDetails.isDropoff) {
      alert("⚠️ 최소한 하나의 옵션(픽업 또는 샌딩)을 선택해야 합니다.");
      return;
    }

    try {
      const requestId = await requestQuotationAirportTransfer(userId, transferDetails);
      alert(`✅ 견적 요청 완료! 요청 ID: ${requestId}`);
    } catch (error) {
      console.error("❌ 견적 요청 실패:", error);
      alert("⚠️ 견적 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">🚖 공항 픽업 / 샌딩</h2>
      
      <div className="flex w-full gap-4">
        {/* 픽업 옵션 */}
        <div className="w-1/2 p-4 border rounded-lg bg-gray-100 shadow">
          <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
            <input
              type="checkbox"
              checked={transferDetails.isPickup}
              onChange={() => setTransferDetails({ ...transferDetails, isPickup: !transferDetails.isPickup })}
            />
            <span>공항 픽업</span>
          </label>
          {transferDetails.isPickup && (
            <>
              <select
                value={transferDetails.pickupAirport}
                onChange={(e) => setTransferDetails({ ...transferDetails, pickupAirport: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              >
                <option value="">공항 선택</option>
                {airportList.map((airport, index) => (
                  <option key={index} value={airport}>{airport}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="목적지 입력"
                value={transferDetails.pickupCustomLocation}
                onChange={(e) => setTransferDetails({ ...transferDetails, pickupCustomLocation: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              />
              <input
                type="text"
                placeholder="✈️ 비행기편 번호"
                value={transferDetails.pickupFlightNumber}
                onChange={(e) => setTransferDetails({ ...transferDetails, pickupFlightNumber: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              />
              <input
                type="time"
                placeholder="도착 시간"
                value={transferDetails.pickupTime}
                onChange={(e) => setTransferDetails({ ...transferDetails, pickupTime: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              />
            </>
          )}
        </div>

        {/* 샌딩 옵션 */}
        <div className="w-1/2 p-4 border rounded-lg bg-gray-100 shadow">
          <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
            <input
              type="checkbox"
              checked={transferDetails.isDropoff}
              onChange={() => setTransferDetails({ ...transferDetails, isDropoff: !transferDetails.isDropoff })}
            />
            <span>공항 샌딩</span>
          </label>
          {transferDetails.isDropoff && (
            <>
              <input
                type="text"
                placeholder="출발지 입력"
                value={transferDetails.dropoffCustomLocation}
                onChange={(e) => setTransferDetails({ ...transferDetails, dropoffCustomLocation: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              />
              <input
                type="text"
                placeholder="✈️ 비행기편 번호"
                value={transferDetails.dropoffFlightNumber}
                onChange={(e) => setTransferDetails({ ...transferDetails, dropoffFlightNumber: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              />
              <input
                type="time"
                placeholder="출발 시간"
                value={transferDetails.dropoffTime}
                onChange={(e) => setTransferDetails({ ...transferDetails, dropoffTime: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              />
            </>
          )}
        </div>
      </div>

      {/* 구글 지도 링크 입력 */}
      <div className="w-full mt-4">
        <input
          type="text"
          placeholder="🗺️ 목적지 구글 지도 링크"
          value={transferDetails.googleMapLinks[0]}
          onChange={(e) =>
            setTransferDetails({
              ...transferDetails,
              googleMapLinks: [e.target.value, transferDetails.googleMapLinks[1]],
            })
          }
          className="w-full p-3 border rounded-lg text-lg"
        />
      </div>

      <button onClick={handleSaveTemp} className="bg-yellow-500 text-white p-3 rounded-lg text-lg w-full mt-4">
        💾 임시 저장
      </button>
      <button
        onClick={handleRequestQuotation}
        className="bg-green-500 text-white p-3 rounded-lg text-lg w-full mt-4"
      >
        📩 견적 요청
      </button>
    </div>
  );
}
