import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Homepage from './components/homepage/Homepage'
import Metamask from './components/metmask/Metamask'
import RegisterationPage from './pages/complaint/RegistrationPage'
import ResolvePage from './pages/resolve/ResolvePage'
function App() {
 
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/registration' element={<RegisterationPage/>}/>
      <Route path='/resolve' element={<ResolvePage/>}/>
      
    </Routes>
  )
}

export default App
