import { onAuthStateChanged, signInAnonymously, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../config/firebase-config";
import LoadingComponent from "../components/Loading/LoadingComponent";


type AuthChangedContextType = {
    isLoading: boolean;
    user: User | null;
}

const AuthChangedContext = createContext<AuthChangedContextType | undefined>(undefined)

export const AuthChangedProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | null>(null)

    console.log(user)

    useEffect(() => {
        const unsub = onAuthStateChanged((auth), async (currentUser) => {
            setIsLoading(false)
            if (!currentUser) {
                const newUser = await signInAnonymously(auth)
                console.log(newUser)
                setUser(newUser.user)
            }else{
                setUser(currentUser)
            }

            
        })

        return () => unsub() //cleanup
    }, [])

    if (isLoading) return <LoadingComponent />
    console.log(user)
    return <AuthChangedContext.Provider value={{ isLoading, user }}>
        {children}
    </AuthChangedContext.Provider>
}

export const useGetAuthChanged = () => {
    const context = useContext(AuthChangedContext)

    if (!context) throw new Error("useGetAuthChanged must be used within AuthChangedProvider");

    return context
}