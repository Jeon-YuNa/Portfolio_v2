import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ProjectData } from "@/components/project/data/projectData";

//프로젝트 목록
export const getProjects = async (): Promise<ProjectData[]> => {
  try {
    const snapshot = await getDocs(collection(db, "projects"));
    return snapshot.docs.map((doc) => ({
      id: +doc.id, // Firestore 문서 ID
      ...doc.data(),
    })) as ProjectData[];
  } catch (error) {
    console.error("getProjects Firebase 에러:", error);
    return [];
  }
};
//프로젝트 좋아요 업데이트
export const updateProjectLikes = async (
  projectId: number
): Promise<ProjectData> => {
  try {
    const snapshot = await getDocs(collection(db, "projects"));

    const docToUpdate = snapshot.docs.find(
      (doc) => doc.data().id === projectId
    );

    if (!docToUpdate) {
      throw new Error("해당 ID의 프로젝트를 찾을 수 없습니다.");
    }

    const ref = doc(db, "projects", docToUpdate.id);

    await updateDoc(ref, {
      likes: increment(1),
    });

    const updatedSnap = await getDoc(ref);
    return {
      id: updatedSnap.data()?.id,
      ...updatedSnap.data(),
    } as ProjectData;
  } catch (error) {
    console.error("updateProjectLikes 에러:", error);
    throw error;
  }
};
