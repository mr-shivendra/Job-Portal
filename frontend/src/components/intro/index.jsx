import {useEffect,useState} from 'react'
import './index.css'
import intro from '../../assets/developer.png'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Intro = () => {
  const [asRecruiter,setAsRecruiter]=useState(false)

  useEffect(() => { AOS.init(); }, []);

  return (
    <div  id='introduction' className='intro-parent'>
        <div className="intro-text">
            <h2 data-aos='fade-up'>Welecome to <span>JobX</span> Space</h2>
            {asRecruiter?<p data-aos='fade-up'>Let's help you land your dream career</p>:<p data-aos='fade-up'>
              You are now part of a powerful platform designed to simplify your hiring process. Post jobs, review applications, and discover qualified candidates all in one place
              </p>}
            <a href="#form-column" data-aos='fade-up'><button >{asRecruiter?'Check Openings':'Post Jobs'}</button></a>
        </div>
        <div className="intro-image" data-aos='fade-up'>
            <img src={intro} alt="this is the image of contact man" />
        </div>
    </div>
  )
}

export default Intro