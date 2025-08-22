import {useState} from 'react'
import Navbar from '../../components/navbar'
import Intro from '../../components/intro'
import JobBoard from '../../components/joblist'
import AddNewJob from '../../components/AddJob'

const Home = () => {
   const [isRecruiter,setIsRecruiter]=useState(false)
  return (
    <div>
        <Navbar/>
        <Intro/>
        <JobBoard/>
        {isRecruiter && <AddNewJob onCloseAdd={()=>setIsRecruiter(false)}/>}
    </div>
  )
}

export default Home