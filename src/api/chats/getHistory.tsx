import { useEffect, useState } from 'react'
import { type MessageType } from './getMessages'
import { auth, db } from '../../config/firebase-config'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

export const useGetHistory = () => {
  const [message, setMessage] = useState<MessageType[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
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
        setMessage(messages);
      },
      (error) => {
        setError(error);
      }
    );

    return () => unsubscribe();
  }, [])

  return { message, error }

}