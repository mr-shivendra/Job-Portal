import { useState } from 'react'
import JobBoard from './components/joblist'
import Registration from './pages/login'
import Home from './pages/home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Application from './pages/Applications'
import SeekerProfile from './pages/profile'
import Details from './components/pop'
import Applicants from './pages/applicants'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Registration />}/>
      <Route path='/home' element={< Home/>}/>
      <Route path='/applications' element={< Application/>}/>
      <Route path='/profile' element={< SeekerProfile/>}/>
      <Route path='/Jobs' element={< JobBoard/>}/>
      <Route path='/details' element={< Details/>}/>
      <Route path='/applicants/:id' element={< Applicants/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
