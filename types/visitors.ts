import { Timestamp } from "firebase/firestore";

export interface VisitorsData {
  id: string;
  nickname: string;
  content: string;
  createdAt?: Timestamp;
}
