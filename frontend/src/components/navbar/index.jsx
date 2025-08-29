import {useContext,useState} from 'react'
 import { MyContext } from '../../contextapi.jsx'
import AddNewJob from '../AddJob/index.jsx'
import './index.css'

const Navbar = () => {
  const role=localStorage.getItem('role')
  const {isAddJob,setIsAddJob}=useContext(MyContext)
  return (
    <div className='nav-parent'>
      {isAddJob && <AddNewJob/>}
        <div className="company-name">
            JobX
        </div>
        <div className="nav-buttons">
            <a href="/home#introduction">Home</a>
            <a href="/jobs">Jobs</a>
            <a href="/applications">Applications</a>
            {
              role==='user'?<a href="/profile">Profile</a>:<a href="#" onClick={()=>{setIsAddJob(true)}}>Add</a>
            }
            
            <a href='#introduction' onClick={()=>{
            }} >...</a>
       </div>
    </div>
  )
}

export default Navbar