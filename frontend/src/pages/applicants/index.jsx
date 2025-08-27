import {useState,useEffect,useContext} from 'react'
import {useParams} from 'react-router-dom'
import { MyContext } from '../../contextapi'
import axios from 'axios'
import './index.css'
import Navbar from '../../components/navbar'
import Details from '../../components/pop'

const Applicants = () => {
    const [applicants,setApplicants]=useState([1,3,4,5])
    const {jobsDetailUrl,isPopup,setIsPopup,setPopId,
            setJobId,setIsJobDetails,jobId}=useContext(MyContext)
    const {id} = useParams()
    

    function handleProfile(idx){
        console.log(jobId)
        setIsJobDetails(false)
        setPopId(idx)
        setIsPopup(true)
    }

    async function fetchJobDetails(id){
        setJobId(id)
        const res=await axios.get(`${jobsDetailUrl}/${id}`)
        console.log(res.data.data[0].appliedId)
        setApplicants(res.data.data[0].appliedId)
    }
    useEffect(()=>{
        if (id){
            console.log(id)
            fetchJobDetails(id)
        }
    },[])
  return (
    <>
    <Navbar/>
    {isPopup && <Details  />}
    <div className='applicants-box'>
        <h5>The Applicants</h5>
        <p>Here's The Applicants How Applied to this Role</p>
        {applicants.length>0?<div className='applicants-body'>
            {applicants.map(ele=><div className='applicants-data'>
             <b> {ele} </b>
            <button onClick={()=>handleProfile(ele)} >Check Profile</button>
        </div>)}
        </div>:<div className='applied-not'>   
            No-One applied Yet
            </div>}
    </div>
    </>
    
  )
}

export default Applicants