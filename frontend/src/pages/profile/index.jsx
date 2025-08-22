import {useState,useEffect} from 'react'
import Navbar from '../../components/navbar'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import './index.css'

const SeekerProfile = () => {
    const [isEdit,setIsEdit]=useState(true)
    const [userData,setUserData]=useState({
        name:'surya',
        phone:900409034,
        email:'surya@gmail.com',
        education:'B.tech in cse',
        skill:'python,nodejs,react'
    })
    const userDetails='http://localhost:2019/app/userDetail'

    async function fetchUser(id,token){
        const res=await axios.get(`${userDetails}/${id}`,
            {
      headers: {
      'token': `${token}`
               }
      }
        )
        //setUserData(res?.data)
    }

    useEffect(()=>{
         const token = localStorage.getItem('token'); // or from response
        if (token) {
             const decoded = jwtDecode(token);
            
             fetchUser(decoded.payload._id,token)
        }
    },[])
  return (
    <>
    <Navbar/>
     <div className='profile-box'>
        <h5>Hey! {userData.name}</h5>
        <div className="edit-btn">
            <p>Here Your Profile Details </p>
            <button onClick={()=>setIsEdit(!isEdit)}>{isEdit?'EDIT':'SAVE'}</button>
        </div>
        <div className="profile-body">
            <div>
                <b>Education</b>
                { isEdit?<p>{userData.education}</p>:<input/>}
            </div>
            <div>
                <b>Skill</b>
                 { isEdit?<p>{userData.skill}</p>:<input/>}
            </div>
            <div>
                <b>Phone</b>
                 { isEdit?<p>{userData.phone}</p>:<input/>}
            </div>
            <div>
                <b>Email</b>
                 { isEdit?<p>{userData.email}</p>:<input/>}
            </div>
        </div>
     </div>
    </>
   
  )
}

export default SeekerProfile