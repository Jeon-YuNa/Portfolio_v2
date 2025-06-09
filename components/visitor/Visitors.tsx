"use client";
import { useEffect, useState } from "react";
import "../../css/visitors.css";
import TextBox from "../main/subcomponents/TextBox";
import { VisitorsData } from "@/types/visitors";
// import { getVisitors, API_URL } from "@/utils/api";
// import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { getVisitors } from "@/utils/firebaseVisitors";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Visitors = () => {
  const [visitors, setVisitors] = useState<VisitorsData[]>([]);
  const [myVisitorIds, setMyVisitorIds] = useState<string[]>([]);

  useEffect(() => {
    // 방명록 가져오기
    getVisitors().then((visitors) => setVisitors(visitors));

    const stored = JSON.parse(localStorage.getItem("myVisitorIds") || "[]");
    setMyVisitorIds(stored);
  }, []);

  // 삭제
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "visitors", id)); // Firestore에서 삭제

      const updated = myVisitorIds.filter((storedId) => storedId !== id);
      localStorage.setItem("myVisitorIds", JSON.stringify(updated));
      setMyVisitorIds(updated);

      setVisitors((prev) => prev.filter((v) => String(v.id) !== id));
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <section id="visitor" className="p-5">
      <a className="writeBtn" href="/visitors/write">
        <TextBox text="write" />
      </a>

      <div className="listWrap mt-10 gap-6 pr-6">
        <div className="mb-5 p-3 border rounded relative flex">
          <div className="w-full">
            <div className="nickname font-bold mb-2">전유나</div>
            <div className="content">
              포트폴리오에 대한 감상평이나 피드백을 편하게 적어주세요.🤗
            </div>
          </div>
        </div>
        {/* 방명록 뿌리기 */}
        {visitors.map((v) => (
          <div key={v.id} className="mb-5 p-3 border rounded relative flex">
            <div>
              <div className="nickname font-bold mb-2">{v.nickname}</div>
              <div className="content">{v.content}</div>
            </div>

            {myVisitorIds.includes(String(v.id)) && (
              <button
                onClick={() => {
                  console.log("삭제 요청 ID:", v.id);
                  handleDelete(String(v.id));
                }}
                className="absolute top-2 right-2 px-4 py-2 text-sm"
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Visitors;
