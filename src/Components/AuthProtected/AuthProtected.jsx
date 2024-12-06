import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'





export default function AuthProtected({children}) {

let {isLogin} =  useContext(authContext)


  return <>
  {isLogin ? <Navigate to={`/home`}/> : children}
  
  </>
}
