import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

// ✅ 임시 저장 (`tempTravel`)
export async function saveTempTravel(userId: string, schedules: any[]) {
  if (!userId) throw new Error("User ID is required");

  const userRef = collection(db, `users/${userId}/tempTravel`);
  await setDoc(doc(userRef, "latest"), { schedules, timestamp: new Date() });
}

// ✅ 견적 요청 (`QuotationTravel`)
export async function requestQuotationTravel(userId: string, schedules: any[]) {
  if (!userId) throw new Error("User ID is required");

  const userRef = collection(db, `users/${userId}/QuotationTravel`);
  const docRef = await addDoc(userRef, { schedules, requestedAt: new Date() });

  return docRef.id; // 요청 ID 반환
}

// ✅ 골프 여행 일정 임시 저장 (`tempGolfTrip`)
export async function saveTempGolfTrip(userId: string, schedules: any[]) {
  if (!userId) throw new Error("User ID is required");

  const userRef = collection(db, `users/${userId}/tempGolfTrip`);
  await setDoc(doc(userRef, "latest"), { schedules, timestamp: new Date() });
}

// ✅ 골프 여행 견적 요청 (`QuotationGolfTrip`)
export async function requestQuotationGolfTrip(userId: string, schedules: any[]) {
  if (!userId) throw new Error("User ID is required");

  const userRef = collection(db, `users/${userId}/QuotationGolfTrip`);
  const docRef = await addDoc(userRef, { schedules, requestedAt: new Date() });

  return docRef.id; // 요청 ID 반환
}





export function addBusinessTrip(tripData) {
    // Firestore에 business trip 저장하는 코드
  }