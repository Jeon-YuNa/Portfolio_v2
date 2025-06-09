import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { VisitorsData } from "@/types/visitors";
import { db } from "@/lib/firebase";
import axios from "axios";

//방명록 리스트 가져오기
export const getVisitors = async (): Promise<VisitorsData[]> => {
  try {
    const q = query(collection(db, "visitors"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as VisitorsData)
    );
  } catch (error) {
    console.error("getVisitors 에러:", error);
    return [];
  }
};

//방명록 업데이트
export const updateVisitors = async ({
  nickname,
  content,
}: {
  nickname: string;
  content: string;
}) => {
  if (!nickname.trim() || !content.trim()) {
    return { status: 400 };
  }

  try {
    const docRef = await addDoc(collection(db, "visitors"), {
      nickname,
      content,
      createdAt: serverTimestamp(),
    });

    return { status: 201, id: docRef.id };
  } catch (error) {
    console.error("방명록 작성 실패:", error);
    return { status: 500 };
  }
};

// 오늘 하루 방문자 보내기
export const postTodayVisitor = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const { ip } = await res.json();

    const today = new Date().toISOString().slice(0, 10);

    // 중복확인인
    const snapshot = await getDocs(
      query(
        collection(db, "todayVisitors"),
        where("ip", "==", ip),
        where("date", "==", today)
      )
    );

    if (snapshot.empty) {
      await addDoc(collection(db, "todayVisitors"), { ip, date: today });
    }
  } catch (error) {
    console.error("방문자 저장 실패:", error);
  }
};

// 오늘 하루 방문자수 가져오기
export const getTodayVisitorCount = async () => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const q = query(
      collection(db, "todayVisitors"),
      where("date", "==", today)
    );
    const snapshot = await getDocs(q);

    return snapshot.size; // size = 문서 수
  } catch (error) {
    console.error("getVisitors 에러:", error);
    return 0;
  }
};
