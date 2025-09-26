import React from 'react'
import useAuthStore from '../store/authstore'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
   const {isAuthenticated} = useAuthStore()
   if(isAuthenticated){
     return  <Navigate to="/" />
   }
   return children
}

export default PublicRoute