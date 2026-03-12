import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import { AuthProvider } from './context/Authcontext.jsx'
import LandingPage from "./pages/Landing.jsx"
import Authentication from './pages/Authentication.jsx'
import HomeComponent from './pages/Home.jsx';
import Videomeet from './pages/videomeet.jsx';
import History from './pages/History.jsx'

function App() {
return (
  <>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/'element={<LandingPage/>}/>
        <Route path='/auth'element={<Authentication/>}/>
        <Route path='/home' element={<HomeComponent />} />
        <Route path='/history' element={<History/>} />
        <Route path='/:url'element={<Videomeet/>}/>

      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </>
)
}

export default App
