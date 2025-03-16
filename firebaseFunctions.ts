// firebaseFunctions.ts
import { db } from "./firebaseConfig";
import { collection, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";

interface TripData {
  userId: string;
  type: "freeTravel" | "golfTrip" | "airportTransfer" | "businessTrip";
  title: string;
  schedules: Array<{
    departure: string;
    destinations: string[];
    meetingTime?: string;
    duration?: string;
    flightNumber?: string; // 공항 픽업/샌딩 전용
  }>;
}



// 🔹 1. Firestore에 새로운 예약 추가
export const addTrip = async (tripData: TripData) => {
  try {
    const userTripsRef = collection(db, `users/${tripData.userId}/trips`);
    await addDoc(userTripsRef, tripData);
    console.log("🚀 예약 추가 완료!", tripData);
  } catch (error) {
    console.error("🔥 예약 추가 실패:", error);
  }
};

// 🔹 2. 예약 수정
export const updateTrip = async (userId: string, tripId: string, tripData: TripData) => {
  try {
    const tripRef = doc(db, `users/${userId}/trips/${tripId}`);
    await setDoc(tripRef, tripData, { merge: true });
    console.log("✅ 예약 수정 완료!");
  } catch (error) {
    console.error("⚠️ 예약 수정 실패:", error);
  }
};

// 🔹 3. 예약 삭제
export const deleteTrip = async (userId: string, tripId: string) => {
  try {
    const tripRef = doc(db, `users/${userId}/trips/${tripId}`);
    await deleteDoc(tripRef);
    console.log("🗑️ 예약 삭제 완료!");
  } catch (error) {
    console.error("❌ 예약 삭제 실패:", error);
  }
};

// ✅ 비즈니스 트립 추가 함수
export async function addBusinessTrip(userId, tripDetails) {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/businessTrips`), tripDetails);
      console.log("Business trip added with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding business trip: ", error);
      throw error;
    }
  }
  
  // ✅ 비즈니스 트립 삭제 함수
  export async function deleteBusinessTrip(userId, tripId) {
    try {
      await deleteDoc(doc(db, `users/${userId}/businessTrips/${tripId}`));
      console.log("Business trip deleted:", tripId);
    } catch (error) {
      console.error("Error deleting business trip: ", error);
      throw error;
    }
  }
