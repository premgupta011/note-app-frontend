import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element = {<LoginPage/>}/>
        <Route path='Signup' element = {<SignupPage/>}/>
        <Route path='Home' element = {<HomePage/>}/>
      </Routes>
      
    </div>
  )
}

export default App
