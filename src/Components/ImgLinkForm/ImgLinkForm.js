import React from 'react';
import './ImgLinkForm.css'


const ImgLinkForm = ({ onInputChange, onImportSubmit}) =>{
  return(
    <div>
      <p className = 'f3' >
      {'Will use clarifai api to Detect Faces in your imported images'}
      </p>
      <div className='center'>
        <div className = 'form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type = "tex" onChange={ onInputChange }/>
          <button className='w-30 grow f4 link ph3 pv2 dib  bg-light-blue' 
          onClick={onImportSubmit}>Import</button>
      </div>
      </div>
    </div>
  );
}

export default ImgLinkForm;