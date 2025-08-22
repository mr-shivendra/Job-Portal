import { useState } from 'react'
import JobBoard from './components/joblist'
import Registration from './pages/login'
import Home from './pages/home'
import Navbar from './components/navbar'
import Intro from './components/intro'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Application from './pages/Applications'
import SeekerProfile from './pages/profile'
import Details from './components/pop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Registration />}/>
      <Route path='/home' element={< Home/>}/>
      <Route path='/applications' element={< Application/>}/>
      <Route path='/profile' element={< SeekerProfile/>}/>
      <Route path='/Jobs' element={< JobBoard/>}/>
      <Route path='/details' element={< Details/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
