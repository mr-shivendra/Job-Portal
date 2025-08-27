import {useState, useEffect,useContext} from 'react'
import { MyContext } from '../../contextapi'
import axios from 'axios'
import Navbar from '../navbar'
import './index.css'

const JobBoard = () => {
    const [jobs,setJobs]=useState([1,2,3,4,5,6])
    const [isRecruiter,setIsRecruiter]=useState(false)
    const {jobsDetailUrl}=useContext(MyContext)
    const token=localStorage.getItem('token')

    async function fetchJobs(){
      const jobData=await axios.get(jobsDetailUrl)
      setJobs(jobData?.data?.data)
    }

    async function applyJobs(ele){
      const jobData=await axios.put(`${jobsDetailUrl}/applied/${ele._id}`,{data:'money'},{
      headers: {
      'token': `${token}`
               }
      })
      alert(jobData?.data)
    }

    useEffect(()=>{
     fetchJobs()
    },[])
  return (
    <>
    <Navbar/>
    <div className='job-box'>
        <h5>New Jobs</h5>
        <p>Here Companies are offering a lot of jobs</p>
        <div className="job-body">
          {jobs.length>0? <div>
          {jobs.map(ele=><div>
              <b>{ele.title}</b>
              <p> Company : {ele.company}</p>
              <p>Skills : {ele.description}</p>
              <div className='apply-btn'>
                 <p>Last Date :{ele.lastDate}</p>
                 <button onClick={()=>applyJobs(ele)}>Apply</button>
              </div>
              
            </div> )}
            </div>:'There is no Jobs Listed'
          }
        </div>
    </div>
    </>
  )
}

export default JobBoard