import React, { Children, createContext, useState } from 'react'





export const authContext = createContext()





export default function AuthContextProvider({children}) {



    const [isLogin , setIsLogin ] = useState(Boolean(localStorage.getItem(`userToken`)))





    

  return <>
        <authContext.Provider value={{isLogin, setIsLogin }}>
            {children}
        </authContext.Provider>
    
  </>
}
