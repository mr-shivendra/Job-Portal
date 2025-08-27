import {createContext,useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const MyContext=createContext();

 const ContextProvider = ({children}) => {
    const [contacts,setContact]=useState([])
    const seekerDetailUrl='http://localhost:2019/app'
    const jobsDetailUrl='http://localhost:2019/job'
    
     const [isPopup,setIsPopup]=useState(false)
    const [asUser,setAsUser]=useState(false)
    const [isRecruiter,setIsRecruiter]=useState(false)
    const [isAdmin,setIsAdmin]=useState(false)
    const [isEdit,setIsEdit]=useState(false)
    const [idx,setIdx]=useState('')
    const [popId,setPopId]=useState('')
    const [jobId,setJobId]=useState('')
    const [isLogin,setIsLogin]=useState(true)
    const [isJobDetails,setIsJobDetails]=useState(false)
    const [isDelete,setIsDelete]=useState(false)
    const [isAddJob,setIsAddJob]=useState(false)
    const stateSnippet={isEdit,setIsEdit,isLogin,setIsLogin,isRecruiter,setIsRecruiter,
      seekerDetailUrl,jobsDetailUrl,isPopup,setIsPopup,popId,setPopId,
      jobId,setJobId,isJobDetails,setIsJobDetails,isAddJob,setIsAddJob}
  return (
    <MyContext.Provider value={stateSnippet}>
        {children}
    </MyContext.Provider>
  )
}

export default ContextProvider