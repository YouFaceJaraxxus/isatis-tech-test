import React from 'react';
import { Link } from 'react-router-dom';

const Default = () => {
  return(
    <div>
      Hi I'm Default!;
      <Link to='/posts'>Posts!</Link>
    </div>
  )
}

export default Default;