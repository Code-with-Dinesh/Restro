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
const App = () => {
  const role = "admin"
  return (
    <Routes>

      <Route path="/admin" element={<AdminLayout role={role}/>}>
         <Route index element={<Dashboard role={role}/>}/>
         <Route path="/admin/orders" element={<Orders/>}/>
         <Route path="/admin/restaurant-items" element={<Items/>}/>
         <Route path="/admin/users" element={<Users/>}/>
      </Route>
      {/* Routes without MainLayout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      {/* Routes with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />  
        <Route path="menu" element={<Menu />} />  
      </Route>
    </Routes>
  )
}

export default App
