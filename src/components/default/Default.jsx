import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Default = () => {
  const { theme } = useSelector((state) => state.common);
  console.log('theme', theme);
  return (
    <div>
      Hi I'm Default!;{theme}
      <Link to='/recipes'>Recipes!</Link>
    </div>
  )
}

export default Default;