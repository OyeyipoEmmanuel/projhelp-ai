import { signInAnonymously } from "firebase/auth"
import { auth } from "../../config/firebase-config"


export const signInAnony = async ()=>{
    try {
        const res = await signInAnonymously(auth)

        return res
    } catch (error) {
        return new Error("Error")
    }
}