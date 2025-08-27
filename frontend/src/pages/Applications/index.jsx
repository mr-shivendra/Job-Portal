import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../../components/navbar'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import Details from '../../components/pop'
import './index.css'
import { MyContext } from '../../contextapi'
import { useContext } from 'react';

const Application = () => {
    const {isRecruiter,seekerDetailUrl,jobsDetailUrl,setPopId,
        isPopup,setIsPopup,idx,setIdx,setJobId}=useContext(MyContext)
    const [listedJobs,setListedJobs]=useState([])
    const navi=useNavigate()
    const [applications,setApplications]=useState([
    {
        company:'Technoship',
        status:'Rejected',
        message:'Missing Skills'
    },
    {
        company:'Alphatech',
        status:'applied',
        message:''
    },
    {
        company:'Microsoft',
        status:'Accept',
        message:'Your interview schduled at 5pm tommaro IST'
    }
  

    ])
    // const applicationsurls='http://localhost:2019/app/userDetail'
    const role=localStorage.getItem('role')

    async function fetchJobbyRecruiter(id){
        const res=await axios.get(`${jobsDetailUrl}/recruiter/${id}`)
       // console.log(res.data.data)
        setListedJobs(res.data.data)

    }

    async function fetchApplicationDetails(id,token){
        const res=await axios.get(`${seekerDetailUrl}/userDetail/${id}`,{
            headers: {'token': `${token}`}
        })
       // console.log(res.data)
        setApplications(res.data.appliedDetails)
    }

    function checkApplicants(id){
       // setIdx(id)
       setJobId(id)
       console.log(id)
        navi(`/applicants/${id}`)
    }

    useEffect(()=>{
             const token = localStorage.getItem('token'); // or from response
             const decoded=jwtDecode(token)
            if (token) {
                 if (role==='recruiter'){
                    fetchJobbyRecruiter(decoded.payload._id)
                 }else{
                   fetchApplicationDetails(decoded.payload._id,token)
                 }
            }
            
        },[])
  return (
    <>
    <Navbar/>
    <div className='application-box'>
        {isPopup?<Details onClose={()=>setIsPopup(false)}/>:''}
        {role==='recruiter'?<h5>Jobs You Listed</h5>:<h5>Applications</h5>}
        {role==='recruiter'?<p>Here the Details That You Listed for Openings </p>:<p>Here the Details Where You been  Applied</p>}
        {role==='recruiter'?<div className='listed-job-div'>
            {listedJobs.length>0? <div className='job-listed'>
                {listedJobs.map(ele=><div> 
                    <b>{ele.title}</b> 
                    <div>
                        <p>Last Date : {ele.lastDate}</p> 
                        <button onClick={()=>checkApplicants(ele._id)}>Check Applicants</button>
                    </div>
                   
                </div>)}
            </div>:<div className='applied-not'>You have not Listed Jobs Yet</div>        
        }
        </div>
        :<div className="application-body">
            {
                applications.length>0?applications.map(ele=><div className='application-status'>
                    <b>{ele.company}</b>
                    <p>{ele.message}</p>
                    <div className='job-details'>
                        <p>{ele.status}</p>
                        <button onClick={()=>{setPopId(ele.jobId),setIsPopup(true)}}>Job Details</button>
                    </div>
                </div>):<div className='applied-not'>Not Applied Yet</div>
            }
        </div>}
        </div></>
  )
}

export default Application