import React from "react";
import './Logo.css'
import 'tachyons';
import Tilt from 'react-tilt'
import Brain from './brain-100.png'

const Logo = () =>{
  return(
    <div id = "Logo_div" className = "">
      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa3"> <img id = "brain_img" src= {Brain} alt = "brain"></img> </div>
      </Tilt>

    </div>
  );
}

export default Logo;