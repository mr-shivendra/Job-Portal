import {useContext,useState} from 'react'
// import { MyContext } from '../../contextapi.jsx'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Navbar = () => {
  const navi=useNavigate()
const [asUser,setAsUser]=useState(false)
//   const {setWantLogout,setIsEdit,isEdit}=useContext(MyContext)
  return (
    <div className='nav-parent'>
        <div className="company-name">
            JobX
        </div>
        <div className="nav-buttons">
            <a href="/home#introduction">Home</a>
            <a href="/jobs">Jobs</a>
            <a href="/applications">Applications</a>
            {
              asUser?<a href="/profile">Profile</a>:<a href="#form-column">Add</a>
            }
            
            <a href='#introduction' onClick={()=>{
            //    setWantLogout(true)
            }} >...</a>
       </div>
    </div>
  )
}

export default Navbar