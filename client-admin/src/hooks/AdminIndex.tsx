import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

export interface AdminProp {
   
    email: string
    _id: string
   
}
export interface courseProp {
    _id: string,
    title: string,
    description: string,
    price: string,
    imageUrl: string,
    discount_price: string,
    discount: string,
    original_price: string

}
  

interface AuthContextProp{
    authAdmin: AdminProp | null,
    setAuthAdmin: (admin: AdminProp | null) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextProp | undefined>(undefined)


export const AdminAuthProvider = ({children}:{children:React.ReactNode}) => {

    const [authAdmin,setAuthAdmin] = useState<AdminProp | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const Backend_Url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${Backend_Url}/admin/me`, { withCredentials: true });
                console.log(res,"admin me log");
                setAuthAdmin(res.data.data);
              
            } catch (err) {
                setAuthAdmin(null)
              } finally {
                setIsLoading(false)
              }
        } 
        fetch();
    },[])


    return (
        <AuthContext.Provider value={{authAdmin, setAuthAdmin,isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAdminAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthAdmin must be used within an AuthProvider")
    }
    return context
}