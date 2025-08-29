import {useState} from 'react'
import Navbar from '../../components/navbar'
import Intro from '../../components/intro'
import JobBoard from '../../components/joblist'
import AddNewJob from '../../components/AddJob'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Intro/>
        <JobBoard/>
    </div>
  )
}

export default Home