import {useEffect} from 'react'
import './index.css'
import intro from '../../assets/developer.png'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Intro = () => {

  useEffect(() => { AOS.init(); }, []);

  return (
    <div  id='introduction' className='intro-parent'>
        <div className="intro-text">
            <h2 data-aos='fade-up'>Welecome to <span>JobX</span> Space</h2>
            <p data-aos='fade-up'>Let's help you land your dream career</p>
            <a href="#form-column" data-aos='fade-up'><button >Check Openings</button></a>
        </div>
        <div className="intro-image" data-aos='fade-up'>
            <img src={intro} alt="this is the image of contact man" />
        </div>
    </div>
  )
}

export default Intro