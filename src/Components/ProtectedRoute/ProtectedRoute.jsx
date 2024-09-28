import React, { useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import Login from '../Login/Login';


export default function ProtectedRoute({children}) {
    let{ isLogin }=useContext(AuthContext);
    
    if(isLogin){
        return children;
    }
    else
    {
    return <Login/>
    }
  
}
