import { getFirestore, collection, addDoc, doc, setDoc , getDoc } from "firebase/firestore";

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


// ✅ 공항 픽업/샌딩 임시 저장 (`tempAirportTransfer`)

export const saveTempAirportTransfer = async (userId: string, transferDetails: any) => {
  try {
    // ✅ 문서를 "users/{userId}/tempAirportTransfer/latest" 형태로 저장
    const docRef = doc(db, `users/${userId}/tempAirportTransfer/latest`); 
    await setDoc(docRef, { ...transferDetails, timestamp: new Date() });

    console.log("✅ 공항 픽업/샌딩 임시 저장 완료");
  } catch (error) {
    console.error("❌ 공항 픽업/샌딩 임시 저장 실패:", error);
  }
};

// ✅ 공항 픽업/샌딩 견적 요청 (`QuotationAirportTransfer`)
export async function requestQuotationAirportTransfer(userId: string, transferDetails: any[]) {
  if (!userId) throw new Error("User ID is required");

  const docRef = await addDoc(collection(db, `users/${userId}/QuotationAirportTransfer`), {
    transferDetails,
    requestedAt: new Date(),
  });

  return docRef.id; // 요청 ID 반환
}

export const loadTempAirportTransfer = async (userId : string) => {
  try {
    const docRef = doc(db, `users/${userId}/tempAirportTransfer/latest`); // ✅ 세그먼트 4개
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("❌ 임시 데이터 불러오기 실패:", error);
    return null;
  }
};
// ✅ 1. 비즈니스 트립 임시 저장

export const saveTempBusinessTrip = async (userId: string, tripDetails: any) => {
  if (!userId) throw new Error("User ID가 필요합니다.");

  const tripRef = doc(db, "users", userId, "tempBusinessTrip", "data"); // ✅ 문서 경로 수정

  try {
    await setDoc(tripRef, tripDetails, { merge: true });
    console.log("📌 임시 데이터 저장 완료!");
  } catch (error) {
    console.error("❌ 임시 데이터 저장 실패:", error);
  }
};


/**
 * ✅ 2. 비즈니스 트립 최종 저장 (견적 요청)
 */
export const addBusinessTrip = async (userId: string, tripDetails: any[]) => {
  try {
    const collectionRef = collection(db, `users/${userId}/businessTrips`);
    const docRef = await addDoc(collectionRef, { ...tripDetails, createdAt: new Date() });

    console.log("✅ 견적 요청 완료! Trip ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ 견적 요청 실패:", error);
    throw error;
  }
};

/**
 * ✅ 3. 최근 비즈니스 트립 데이터 불러오기
 */
export const loadTempBusinessTrip = async (userId: string) => {
  if (!userId) throw new Error("User ID가 필요합니다.");

  // ✅ Firestore 문서 참조 경로 수정
  const tripRef = doc(db, "users", userId, "tempBusinessTrip", "data"); 

  try {
    const docSnap = await getDoc(tripRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("ℹ️ 저장된 임시 데이터 없음.");
      return null;
    }
  } catch (error) {
    console.error("❌ 임시 데이터 불러오기 실패:", error);
    return null;
  }
};