import React from 'react';


const Navigation = ({routeChange, isIn}) =>{
    if(isIn){
      return(
        <div> 
    <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() =>routeChange('signout')}className='f3 link dim underline pa3 pointer'>Sign Out</p>
    </nav>
    </div>
      );
    }else{
      return(
        <div>
          <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() =>routeChange('register')}className='f3 link dim underline pa3 pointer'>Register</p>
          <p onClick={() =>routeChange('signin')}className='f3 link dim underline pa3 pointer'>Signin</p>
          </nav>
      </div>
      );

    }
}

export default Navigation;