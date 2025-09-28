import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import MainLayout from "./Layout/Mainlayout"
import Home from './pages/Home'
import Menu from './pages/Menu'
import AdminLayout from './Layout/Adminlayout'
import Dashboard from './pages/Dashboard'
import Users from './pages/admin/Users'
import Orders from './pages/admin/Orders'
import Items from './pages/admin/Items'
import ProtectedRoute from './components/ProtectedRoute'
import  { Toaster } from 'react-hot-toast';
import PublicRoute from './components/PublicRoute'
import useAuthStore from './store/authstore'
import Pagenotfound from './pages/Pagenotfound'
import UserDashboard from './pages/user/UserDashboard'
import Myorder from './pages/user/Myorder'
import Setting from "./pages/user/Setting"
import Singleproduct from './pages/Singleproduct'
const App = () => {
  const {role,isAuthenticated} = useAuthStore()
  
  return (
    <>
    <Routes>
      {isAuthenticated && role === "admin" && (<Route path="/admin" element={ <ProtectedRoute requiredRole={role}><AdminLayout role={role}/> </ProtectedRoute>}>
         <Route index element={<Dashboard role={role}/>}/>
         <Route path="orders" element={<Orders/>}/>
         <Route path="restaurant-items" element={<Items/>}/>
         <Route path="users" element={<Users/>}/>
      </Route>)}
      
        
        {isAuthenticated && role === "user" && ( <Route path="/user" element={<ProtectedRoute requiredRole={role}><AdminLayout role={role} /></ProtectedRoute>}>
       <Route index element={<UserDashboard role={role}/>}/>
       <Route path='orders' element={<Myorder/>} />
       <Route path="settings" element={<Setting/>}/>
       </Route>)}
      

      {/* Routes without MainLayout */}
      <Route path="/login" element={ <PublicRoute> <Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Signup /></PublicRoute>} />

      {/* Routes with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />  
        <Route path="menu" element={<Menu />} />  
         <Route path="/fooditem/:id" element={<Singleproduct/>} />  
      </Route>

      <Route path='*' element={<Pagenotfound/>}/>
      </Routes>

    <Toaster/>
    </>
  )
}

export default App
