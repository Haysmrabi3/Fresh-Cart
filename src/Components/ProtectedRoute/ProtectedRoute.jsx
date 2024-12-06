import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'
import { authContext } from '../../Context/AuthContext'

















export default function ProtectedRoute({children}) {

       let {isLogin} = useContext(authContext)
        
  return <>
  {isLogin? children : <Navigate to={"/Login"} />}
  </>
}
