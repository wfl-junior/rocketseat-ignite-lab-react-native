import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { OrderStatus } from "../components/Order";

export interface OrderDTO {
  user_uid: string;
  patrimony: string;
  description: string;
  status: OrderStatus;
  solution?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;
}
