import { createContext, useEffect, useState } from "react";

 export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
  
    let [isLogin,setIsLogin] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem('token') != null){
            setIsLogin(true);
        }else{
            setIsLogin(false);
    
        }
    },[]);

    return<>
    <AuthContext.Provider value={{isLogin,setIsLogin}}>
            {children}
    </AuthContext.Provider>
    
    </>

}
