import React from 'react';
import { Link } from 'react-router-dom';

const Posts = () => {
  console.log('POSTS');
  return(
    <div>
      Hi I'm Posts!;
      <Link to='/main'>Hello</Link>
    </div>
  )
}

export default Posts;