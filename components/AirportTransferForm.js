"use client";

import { useState } from "react";

const airportList = ["노이바이 국제공항", "깟비 국제공항", "반돈 국제공항"];

export default function AirportTransferForm() {
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

  const openMapLink = (index) => {
    if (transferDetails.googleMapLinks[index]) {
      window.open(transferDetails.googleMapLinks[index], "_blank");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">🚖 공항 픽업 / 샌딩</h2>
      
      <div className="flex w-full gap-4">
        {/* 픽업 옵션 */}
        <div className="w-1/2 p-4 border rounded-lg text-gray-90 bg-gray-100 shadow">
          <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
            <input type="checkbox" checked={transferDetails.isPickup} onChange={() => setTransferDetails({ ...transferDetails, isPickup: !transferDetails.isPickup })} />
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
              <button onClick={() => openMapLink(0)} className="text-blue-600 underline text-lg mt-2">🔗 구글 지도 확인</button>
              <input
                type="text"
                placeholder="항공편 번호 (예: VN123)"
                value={transferDetails.pickupFlightNumber}
                onChange={(e) => setTransferDetails({ ...transferDetails, pickupFlightNumber: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              />
              <input
                type="time"
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
            <input type="checkbox" checked={transferDetails.isDropoff} onChange={() => setTransferDetails({ ...transferDetails, isDropoff: !transferDetails.isDropoff })} />
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
              <button onClick={() => openMapLink(1)} className="text-blue-600 underline text-lg mt-2">🔗 구글 지도 확인</button>
              <select
                value={transferDetails.dropoffAirport}
                onChange={(e) => setTransferDetails({ ...transferDetails, dropoffAirport: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              >
                <option value="">공항 선택</option>
                {airportList.map((airport, index) => (
                  <option key={index} value={airport}>{airport}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="항공편 번호 (예: VN123)"
                value={transferDetails.dropoffFlightNumber}
                onChange={(e) => setTransferDetails({ ...transferDetails, dropoffFlightNumber: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              />
              <input
                type="time"
                value={transferDetails.dropoffTime}
                onChange={(e) => setTransferDetails({ ...transferDetails, dropoffTime: e.target.value })}
                className="w-full p-3 border rounded-lg mt-2 text-lg"
              />
            </>
          )}
        </div>
      </div>
      
      <button disabled={!transferDetails.isPickup && !transferDetails.isDropoff} className={`mt-6 p-4 text-lg w-full rounded-lg text-white ${transferDetails.isPickup || transferDetails.isDropoff ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}>
        📩 견적 요청
      </button>
    </div>
  );
}