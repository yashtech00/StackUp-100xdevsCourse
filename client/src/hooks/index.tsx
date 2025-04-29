import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

export interface UserProp {
    username: string,
    email: string
    _id: string
    role: string;
    purchased:string[]
  }
  

interface AuthContextProp{
    authUser: UserProp | null,
    setAuthUser: (user: UserProp | null) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextProp | undefined>(undefined)


export const AuthProvider = ({children}:{children:React.ReactNode}) => {

    const [authUser,setAuthUser] = useState<UserProp | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const Backend_Url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${Backend_Url}/user/me`, { withCredentials: true });
                console.log(res,"me log");
                setAuthUser(res.data.data);
              
            } catch (err) {
                setAuthUser(null)
              } finally {
                setIsLoading(false)
              }
        } 
        fetch();
    },[])


    return (
        <AuthContext.Provider value={{authUser, setAuthUser,isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}