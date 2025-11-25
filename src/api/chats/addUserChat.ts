import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../../config/firebase-config"

export const addUserChat = async(prompt: string)=>{
    const userId = auth.currentUser?.uid

    if(!userId) return;

    const c = (collection(db, "users", userId, "chats", userId, "messages"))

    try {
        await addDoc(c, {
            sender:"user",
            text: prompt,
            createdAt: serverTimestamp()
        })
    } catch (error) {
        throw new Error("Something went wrong! Please try again.")
    }

    // addDoc()
}