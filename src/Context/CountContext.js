import { createContext, useEffect, useState } from "react";
import axios from 'axios'

 export const CountContext = createContext();

export default function CountContextProvider({children}) {
  
    let [cartCount,setCartCount] = useState(0);
    
  useEffect(()=>{
    getAllCarts();
},[]);

    async function getAllCarts(){
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
          headers:{
            token:localStorage.getItem('token')
          }
        })
        setCartCount(data.numOfCartItems);
    
      }

    

    return<>
    <CountContext.Provider value={{cartCount,setCartCount}}>
            {children}
    </CountContext.Provider>
    
    </>

}
