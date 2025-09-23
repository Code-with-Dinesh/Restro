import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className=''>
      <Routes>
       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Signup/>}/>
      </Routes>
     
    </div>
  )
}

export default App