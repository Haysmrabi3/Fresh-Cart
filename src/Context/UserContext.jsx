import React, { createContext, useEffect, useState } from 'react'




export const userContext = createContext()




export default function UserContextProvider({children}) {



let [userRole , setUserRole] = useState(``)
const [userName , setUserName ] = useState(``)
const [userEmail , setUserEmail ] = useState(``)
const [userId , setuserId ] = useState(``)

useEffect(()=>{
  setUserRole(localStorage.getItem('UserRole'))
  setUserName(localStorage.getItem('UserName'))
  setUserEmail(localStorage.getItem('UserEmail'))
},[])


  return <>
        <userContext.Provider value={{userRole,setUserRole , userName , setUserName ,setUserEmail,  userEmail  ,setuserId , userId } }>
        {children}
        </userContext.Provider>
  
  
  </>
}

