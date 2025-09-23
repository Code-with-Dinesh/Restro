import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import MainLayout from "./Layout/Mainlayout"
import Home from './pages/Home'
import Menu from './pages/Menu'
import AdminLayout from './Layout/Adminlayout'
import Dashboard from './pages/Dashboard'

const App = () => {
  const role = "admin"
  return (
    <Routes>

      <Route path="/admin" element={<AdminLayout role={role}/>}>
         <Route index element={<Dashboard/>}/>
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
