import React from 'react';


const Rank = ({name, points}) =>{
  return(
    <div>
      <div className=' f3'>
        {`${name}, your current upload total is...`}
      </div>
      <div className=' f1'>
        {points}
      </div>
    </div>
  );
}

export default Rank;