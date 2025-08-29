import {useState,useEffect,useContext} from 'react'
import { MyContext } from '../../contextapi';
import Navbar from '../../components/navbar'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import './index.css'

const SeekerProfile = () => {
    const [isEdit,setIsEdit]=useState(true)
    const token = localStorage.getItem('token');
    const {seekerDetailUrl}=useContext(MyContext)
    const [userData,setUserData]=useState({
        name:'',
        phone:0,
        email:'',
        education:'',
        skills:''
    })

    async function fetchUser(id,token){
        const res=await axios.get(`${seekerDetailUrl}/userDetail/${id}`,{
      headers: {'token': `${token}`}
      })
      setUserData(res.data)
    }

    async function handleChange(e){
        const {name,value}=e.target
        setUserData({...userData,[name]:value})
    }
    async function handleSubmit(id){
        if (!isEdit){
           console.log(userData) 
           const res= await axios.put(`${seekerDetailUrl}/userDetailEdit/${id}`,userData,{
            headers:{'token':`${token}`}
           })
           if(!res.data.error){
            setUserData(res.data.data)
            setIsEdit(!isEdit)
           }else{
            alert(res.data.error)
           }
           
        }else{
            setIsEdit(!isEdit) 
        }
           
    }

    useEffect(()=>{
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
            <button onClick={()=>handleSubmit(userData._id)}>{isEdit?'EDIT':'SAVE'}</button>
        </div>
        <div className="profile-body">
            <div>
                <b>Education</b>
                { isEdit?<p>{userData.education}</p>:<input placeholder='Enter your Educational Details' name='education' value={userData.education} onChange={(e)=>handleChange(e)}/>}
            </div>
            <div>
                <b>Skill</b>
                 { isEdit?<p>{userData.skills}</p>:<input placeholder='Enter your skill sets' name='skills' value={userData.skills} onChange={(e)=>handleChange(e)}/>}
            </div>
            <div>
                <b>Phone</b>
                 { isEdit?<p>{userData.phone}</p>:<input placeholder='Enter your Phone no.' name='phone' value={userData.phone} onChange={(e)=>handleChange(e)}/>}
            </div>
            <div>
                <b>Email</b>
                 { isEdit?<p>{userData.email}</p>:<input placeholder='Enter your Email' name='email' value={userData.email} onChange={(e)=>handleChange(e)}/>}
            </div>
        </div>
     </div>
    </>
   
  )
}

export default SeekerProfile