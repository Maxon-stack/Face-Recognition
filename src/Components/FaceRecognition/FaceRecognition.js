import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageURL, box}) =>{
  return(
    <div className='center ma'>
      <div className='absolute mt2'>
        {imageURL ? <img id = "test_img" src = {imageURL} alt={''} display = "none"  /> : <p></p>}
        
        
        <div className="bounding-box" style={{top: box.top, right: box.right, left: box.left, bottom: box.bottom}}>

        </div>
      </div>
    </div>
  );
}

export default FaceRecognition;