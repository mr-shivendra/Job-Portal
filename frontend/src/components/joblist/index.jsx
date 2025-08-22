import {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from '../navbar'
import './index.css'

const JobBoard = () => {
    const [jobs,setJobs]=useState([1,2,3,4,5,6])
    const [isRecruiter,setIsRecruiter]=useState(false)
    const url='http://localhost:2019/job'
    const token=localStorage.getItem('token')

    async function fetchJobs(){
      const jobData=await axios.get(url)
      console.log(jobData?.data?.data)
      setJobs(jobData?.data?.data)
    }

    async function applyJobs(ele){
      const jobData=await axios.put(`${url}/applied/${ele._id}`,{data:'money'},{
      headers: {
      'token': `${token}`
               }
      })
      console.log(jobData?.data)
      alert(jobData?.data)
    }

    useEffect(()=>{
     fetchJobs()
     console.log(jobs)
    },[])
  return (
    <>
    <Navbar/>
    <div className='job-box'>
        <h5>New Jobs</h5>
        <p>Here Companies are offering a lot of jobs</p>
        <div className="job-body">
          {
            jobs.map(ele=><div>
              <b>{ele.title}</b>
              <p> Company : {ele.company}</p>
              <p>Skills : {ele.description}</p>
              <div className='apply-btn'>
                 <p>Last Date :{ele.lastDate}</p>
                 <button onClick={(ele)=>applyJobs(ele)}>Apply</button>
              </div>
              
            </div>)
          }
        </div>
    </div></>
  )
}

export default JobBoard