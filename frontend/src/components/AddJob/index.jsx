import {useState,useRef,useContext} from 'react'
import { MyContext } from '../../contextapi'
import axios from 'axios'
import './index.css'

const AddNewJob = ({onCloseAdd}) => {
    const {isAddJob,setIsAddJob,jobsDetailUrl}=useContext(MyContext)
    const token=localStorage.getItem('token')
    const newJobRef=useRef()
    const[jobData,setJobData]=useState({
        company:'',
        title:'',
        description:'',
        lastDate:''
    })
    function handleChnage(e){
        const {name , value}=e.target
        setJobData({...jobData,[name]:value})
    }
    async function handleSubmit(e){
        e.preventDefault()
       // console.log(jobData)
    if (jobData.company && jobData.title && jobData.description && jobData.lastDate){
        const res=await axios.post(`${jobsDetailUrl}/add`,jobData,{
             headers: {'token': `${token}`}
        })
        if (!res.data.error){
            alert(res.data.data)
            setIsAddJob(false)
            window.location.reload()
        }else{
            alert(res.data.error)
        }
     }else{
        alert('Something is missing in your data')
     }
        
    }
    function closemodal(e){
        if (newJobRef.current===e.target){
            setIsAddJob(false)
        }
    }
  return (
    <div ref={newJobRef} onClick={closemodal} className='newJob-backdrop' >
        <div className='newJob-box'>
             <span onClick={()=>setIsAddJob(false)}>X</span>
             <b>Add New Job Here</b>
             <form onSubmit={handleSubmit}>
                <input type="text"  placeholder='Company Name' onChange={handleChnage} name='company' value={jobData.company} />
                <input type="text"  placeholder='Role of Opening' onChange={handleChnage} name='title' value={jobData.title} />
                <input type="text"  placeholder='Skills Need' onChange={handleChnage} name='description' value={jobData.description} />
                <input type="text"  placeholder='Last Date' onChange={handleChnage} name='lastDate' value={jobData.lastDate} />
                <input className='jobSubmit-btn'  type="submit" />
             </form>
        </div>
    </div>
  )
}

export default AddNewJob