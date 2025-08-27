import {useState,useRef,useContext,useEffect} from 'react'
import axios from 'axios'
import './index.css'
import Seeker from '../../assets/JobSeeker.png'
import { MyContext } from '../../contextapi'

const Details = ({id}) => {
  const {setIsPopup,popId,seekerDetailUrl,jobId,isJobDetails,jobsDetailUrl}=useContext(MyContext)
  const [profileDetails,setProfileDetails]=useState({})
  const token=localStorage.getItem('token')
  const popupRef =useRef()
  const role=localStorage.getItem('role')

  function popupClose(e){
    if (popupRef.current===e.target){
      setIsPopup(false)
    }
  }

  async function acceptProfile(){
    const res=await axios.put(`${jobsDetailUrl}/accept/${jobId}`,{
      id:popId
    },{
      headers: {'token': `${token}`}
    })
    alert(res.data)
    window.location.reload()
  }

  async function rejectProfile(){
    const res=await axios.put(`${jobsDetailUrl}/reject/${jobId}`,{
      id:popId
    },{
      headers: {'token': `${token}`}
    })
    alert(res.data)
    window.location.reload()
  }

  async function profileFetch(token){
    if (role==='recruiter'){
       const res=await axios.get(`${seekerDetailUrl}/userDetail/${popId}`,{
      headers: {'token': `${token}`}
    })
    setProfileDetails(res.data)
    }else{
      const res=await axios.get(`${jobsDetailUrl}/jobid/${popId}`,{
      headers: {'token':`${token}`}
    })
    if (res.data.error){
      setIsPopup(false)
      alert(res.data.error)
    }else{
      console.log(res.data.data)
       setProfileDetails(res.data.data)
    }
    }
  }

  useEffect(()=>{
    if (popId.length>0 && token){
        profileFetch(token)
    }
  },[])
  return (
    <div  ref={ popupRef}  onClick={popupClose} className="details-backdrop">
      <div className='details-box'>
        <span onClick={()=>setIsPopup(false)}>X</span>
         <div className="seeker-photo">
          <img src={Seeker} alt="this is seeker photo" />
          {role!=='recruiter'?"":<div className="edit-btn">
              <button onClick={()=>acceptProfile()}>Accept</button>
              <button onClick={()=>rejectProfile()}>Reject</button>
             </div>}
          </div> 
         {role!=='recruiter'?<div className='details-Job'>
               <h6>{profileDetails.title}</h6>
               <b>{profileDetails.company}</b>
               <p>Skills : {profileDetails.description}</p>
               <p>Last Date: {profileDetails.lastDate}</p>

         </div>:<div className="details-seeker">
              <h6>{profileDetails.name} Profile</h6>
              <div>
                <b>Education</b>
                <p>{profileDetails.education}</p>
              </div>
              <div><b>Skill</b>
              <p>{profileDetails.skill}</p></div>
              <div><b>Phone</b>
              <p>{profileDetails.phone}</p></div>
              <div>
                 <b>Email</b>
              <p>{profileDetails.email}</p>
              </div>
         </div>}

    </div>
    </div>
  
  )
}

export default Details