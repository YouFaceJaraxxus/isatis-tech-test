import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  console.log('MAIN');
  return(
    <div>
      Hi I'm Main!;
      <Link to='/posts'>Posts!</Link>
    </div>
  )
}

export default Main;