import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return(
    <div>
      Hi I'm Main!;
      <Link to='/recipes'>Recipes!</Link>
    </div>
  )
}

export default Main;