import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";

export type MessageType = {
  id?: string;
  text: string;
  sender: string;
  createdAt: Timestamp;
};

type GetAllMessagesType = {
  onData: (messages: MessageType[]) => void;
  onError: (error: Error) => void;
};

export const getAllMessages = ({
  onData,
  onError,
}: GetAllMessagesType) => {
  const userId = auth.currentUser?.uid;

  if (!userId) return;

  const q = query(
    collection(db, "users", userId, "chats", userId, "messages"),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<MessageType, "id">),
      }));
      onData(messages);
    },
    (error) => {
      onError(error);
    }
  );

  return unsubscribe;
};


export const getTwoPrevMsg = ({
  onData,
  onError,
}: GetAllMessagesType) => {
  const userId = auth.currentUser?.uid;

  if (!userId) return;

  const q = query(
    collection(db, "users", userId, "chats", userId, "messages"),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const messages = querySnapshot.docs.slice(-2).map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<MessageType, "id">),
      }));
      onData(messages);
    },
    (error) => {
      onError(error);
    }
  );

  return unsubscribe;
};

