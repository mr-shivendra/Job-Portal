import {useState,useEffect} from 'react'
import Navbar from '../../components/navbar'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import Details from '../../components/pop'
import './index.css'

const Application = () => {
    const [applications,setApplications]=useState([{
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
    const [isPopup,setIsPopup]=useState(false)
    const applicationsurls='http://localhost:2019/app/userDetail'

    async function fetchApplicationDetails(id,token){
        const res=await axios.get(`${applicationsurls}/${id}`,{
            headers: {
      'token': `${token}`
               }
        })
        console.log(res.data)
        setApplications(res.data.appliedDetails)
    }

    useEffect(()=>{
             const token = localStorage.getItem('token'); // or from response
            if (token) {
                 const decoded = jwtDecode(token);
                // fetchApplicationDetails(decoded.payload._id,token)
            }
        },[])
  return (
    <>
    <Navbar/>
    <div className='application-box'>
        {isPopup?<Details onClose={()=>setIsPopup(false)}/>:''}
        <h5>Application</h5>
        <p>Here the Details Where You been  Applied</p>
        <div className="application-body">
            {
                applications.length>0?applications.map(ele=><div className='application-status'>
                    <b>{ele.company}</b>
                    <p>{ele.message}</p>
                    <div className='job-details'>
                        <p>{ele.status}</p>
                        <button onClick={()=>setIsPopup(true)}>Job Details</button>
                    </div>
                </div>):<div className='applied-not'>Not Applied Yet</div>
            }
        </div>
        </div></>
  )
}

export default Application