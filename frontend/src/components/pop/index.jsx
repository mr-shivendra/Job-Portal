import {useState,useRef} from 'react'
import './index.css'
import Seeker from '../../assets/JobSeeker.png'

const Details = ({onClose}) => {
  const [isJobDetails,setIsJobDetails]=useState(true)
  const popupRef =useRef()

  function popupClose(e){
    if (popupRef.current===e.target){
      onClose()
    }
  }
  return (
    <div  ref={ popupRef}  onClick={popupClose} className="details-backdrop">
      <div className='details-box'>
        <span onClick={onClose}>X</span>
         <div className="seeker-photo">
          <img src={Seeker} alt="this is seeker photo" />
          {isJobDetails?"":<div className="edit-btn">
              <button>Accept</button>
              <button>Reject</button>
             </div>}
          </div> 
         {isJobDetails?<div className='details-Job'>
               <h6>Microsoft</h6>
               <b>Backend Development</b>
               <p>Skills : Python,Java</p>
               <p>Last Date: August'30'2025</p>

         </div>:<div className="details-seeker">
              <h6>Name's Profile</h6>
              <div>
                <b>Education</b>
              <p>education details</p>
              </div>
              <div><b>Skill</b>
              <p>skill details</p></div>
              <div><b>Phone</b>
              <p>Phone details</p></div>
              <div>
                 <b>Email</b>
              <p>email details</p>
              </div>
         </div>}

    </div>
    </div>
  
  )
}

export default Details