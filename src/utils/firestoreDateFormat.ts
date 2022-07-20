import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function firestoreDateFormat(
  timestamp?: FirebaseFirestoreTypes.Timestamp | null,
): string {
  let date = new Date();

  if (timestamp) {
    date = timestamp.toDate();
  }

  const day = date.toLocaleDateString("pt-BR");
  const hour = date.toLocaleTimeString("pt-BR");

  return `${day} às ${hour}`;
}
