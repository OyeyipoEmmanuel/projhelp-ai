import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";

export const sendAiOutputToDb = async (outputText: string) => {
  const userId = auth.currentUser?.uid;

  if (!userId) return;

  const q = collection(db, "users", userId, "chats", userId, "messages");

  try {
    await addDoc(q, {
      sender: "bot",
      text: outputText,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error("Something went wrong! Please try again.");
  }
};
