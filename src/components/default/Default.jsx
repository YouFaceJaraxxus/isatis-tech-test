import React from 'react';
import { Link } from 'react-router-dom';

const Default = () => {
  console.log('DEFAULT');
  return(
    <div>
      Hi I'm Default!;
      <Link to='/posts'>Posts!</Link>
    </div>
  )
}

export default Default;