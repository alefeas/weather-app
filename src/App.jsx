import { WeatherInfo } from "./components/WeatherInfo.jsx";
import { ToastContainer } from 'react-toastify';
import video from '../src/videos/background-video.mp4'
import '../src/styles.scss'

export const App = () => {

  return (
    <div className='appContainer'>
      <video className="backgroundVideo" autoPlay muted loop>
        <source src={video} type="video/mp4"/>
      </video>
      <div className='weatherCreditsContainer'>
        <WeatherInfo/>
        <div className="creditsContainer">
          <span>Copyright © 2023 - ∞</span>
          <span className="credits">Developed & Design by Alejo Feas Matej</span>
        </div>
      </div>
      <ToastContainer/>
      </div>
  );
};