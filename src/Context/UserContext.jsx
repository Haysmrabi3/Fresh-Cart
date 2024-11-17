import React, { createContext, useState } from 'react'




export const userContext = createContext()




export default function UserContextProvider({children}) {


let [userRole , setUserRole] = useState(``)
const [userName , setUserName ] = useState(``)
const [userEmail , setUserEmail ] = useState(``)
const [userId , setuserId ] = useState(``)


  return <>
        <userContext.Provider value={{userRole,setUserRole , userName , setUserName ,setUserEmail,  userEmail  ,setuserId , userId } }>
        {children}
        </userContext.Provider>
  
  
  </>
}

