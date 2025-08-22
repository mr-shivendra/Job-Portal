import {useState,useRef} from 'react'
import './index.css'

const AddNewJob = ({onCloseAdd}) => {
    const newJobRef=useRef()
    const[jobData,setJobData]=useState({
        company:'',
        role:'',
        description:'',
        lastDate:''
    })
    function handleChnage(e){
        const {name , value}=e.target
        setJobData({...jobData,[name]:value})
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(jobData)
    }
    function closemodal(e){
        if (newJobRef.current===e.target){
            onCloseAdd()
        }
    }
  return (
    <div ref={newJobRef} onClick={closemodal} className='newJob-backdrop' >
        <div className='newJob-box'>
             <span onClick={onCloseAdd}>X</span>
             <b>Add New Job Here</b>
             <form onSubmit={handleSubmit}>
                <input type="text"  placeholder='Company Name' onChange={handleChnage} name='company' value={jobData.company} />
                <input type="text"  placeholder='Role of Opening' onChange={handleChnage} name='role' value={jobData.role} />
                <input type="text"  placeholder='Skills Need' onChange={handleChnage} name='description' value={jobData.description} />
                <input type="text"  placeholder='Last Date' onChange={handleChnage} name='lastDate' value={jobData.lastDate} />
                <input className='jobSubmit-btn' type="submit" />
             </form>
        </div>
    </div>
  )
}

export default AddNewJob