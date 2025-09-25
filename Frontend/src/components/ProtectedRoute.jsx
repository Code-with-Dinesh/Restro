import React, { Children } from 'react'
import useAuthStore from '../store/authstore.js'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children,requiredRole}) => {
    const {isAuthenticated ,user} = useAuthStore()
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    if(requiredRole && user.role !== requiredRole){
        return <Navigate to="/" replace/>
    }
    return children
}

export default ProtectedRoute