import {useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import formimage from '../../assets/intro.png'
import axios from 'axios'
import Navbar from '../../components/navbar'
// import Footer from '../footer'
import AOS from 'aos';
import 'aos/dist/aos.css';

import { MyContext } from '../../contextapi'

const Registration = () => {
  const {isLogin,setIsLogin,setAsUser,setIsRecruiter}=useContext(MyContext)
  const urls='http://localhost:2019/app'
  const [user,setUser]=useState({
    name:'',
    phone:'',
    password:'',
    email:'',
    role:'',
    rePassword:''
  })
  const [logins,setLogin]=useState({
    phone:'',
    password:''
  })

  const navi=useNavigate()
  async function registr(e){
        e.preventDefault()
        if (isLogin){
          try {
            const res= await axios.post(`${urls}/Registration`,user)
            if (res.data.error.length===0){
              setIsLogin(!isLogin)
              alert(`${res.data.data}`)
            }else{
              alert(`${res.data.error}`)
            }         
        } catch (error) {
            alert(`${error}`)
        }
        }else{
          try {
            const res= await axios.post(`${urls}/login`,logins)
            if (res.data.error.length===0){
              localStorage.setItem('token',res.data.token)
              localStorage.setItem('role',res.data.role)
              navi('/home')
            }else{
              alert(res.data.error)
            }
        } catch (error) {
            alert(`${error}`)
        }
         }
    }
   function fillValues(e){
        const {name,value}=e.target
        isLogin?setUser({...user,[name]:value}):setLogin({...logins,[name]:value})
    }
    useEffect(() => { 
        AOS.init(); 
      }, []);
  return(<>
  <Navbar/>
   {isLogin?<div id='form-column' className='form-div'>
          <h3 data-aos='fade-up' >Create Your Accout</h3>
          <div className='regitr-div'>
              <div className='form-image'>
                  <img  data-aos='fade-up' src={formimage} alt="this is a image of formtaker" />
              </div>
              <form class='registar-form' onSubmit={registr} >
              <input type="text" data-aos='fade-up' placeholder='Name' onChange={fillValues} name='name' value={user.name} />
              <input type="number" data-aos='fade-up' placeholder='Phone No.' onChange={fillValues} name='phone' value={user.phone} />
              <input type="text" data-aos='fade-up' placeholder='Password.' onChange={fillValues} name='password' value={user.password} />
              <input type="text" data-aos='fade-up' placeholder='Email' onChange={fillValues} name='email' value={user.email} />
              <input type="text" data-aos='fade-up' placeholder='Role (Optional)' onChange={fillValues} name='role' value={user.role} />
              <input type="text" data-aos='fade-up' placeholder='Re-password' onChange={fillValues} name='rePassword' value={user.rePassword} />
              <input className='submit-btn' type="submit"  />
          </form>
          </div>
          <h4>If you have Registared User Then <span onClick={()=>setIsLogin(!isLogin)}> Click to Login </span> </h4>
    </div>:
    <div id='form-column' className='form-div'>
          <h3 data-aos='fade-up' > Login Here</h3>
          <div className='regitr-div'>
              <div className='form-image'>
                  <img  data-aos='fade-up' src={formimage} alt="this is a image of formtaker" />
              </div>
              <form class='login-form' onSubmit={registr} >
             {isLogin? <input type="text" data-aos='fade-up' placeholder='Name' onChange={fillValues} name='name' value={user.name} />:''}
              <input type="number" data-aos='fade-up' placeholder='Phone No.' onChange={fillValues} name='phone' value={logins.phone} />
              <input type="text" data-aos='fade-up' placeholder='Password.' onChange={fillValues} name='password' value={logins.password} />
              <input type="submit" className='submit-btn'  data-aos='fade-up' />
          </form>
          </div>
           <h4>If you are New User  Then <span onClick={()=>setIsLogin(!isLogin)}> Click to Registartion</span> </h4>
    </div>
    }
     {/* <Footer/> */}
    </>
  )
}

export default Registration