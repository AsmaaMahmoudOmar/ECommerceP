import React, { useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import Login from '../Login/Login';
import { useNavigate } from 'react-router-dom';


export default function ProtectedLogin({children}) {
    let Navigate= useNavigate();
    let{ isLogin }=useContext(AuthContext);
    if(isLogin){
      
    return <Login/>
    }
  
}
