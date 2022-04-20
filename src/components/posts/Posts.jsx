import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFetchingPosts } from '../../redux/reducers/postsSlice';
import { get } from '../../services/common/baseService';

const Posts = () => {
  const { posts, fetchingPosts } = useSelector((state) => state.posts);

  useEffect(() => {
    get('posts').then((response) => console.log('response.data', response.data));
  }, [])
  const dispatch = useDispatch();
  const toggleFetchingPosts = () => {
    dispatch(setFetchingPosts(!fetchingPosts));
  }
  return (
    <div>
      Hi I'm Posts!;
      <Link to='/main'>Hello</Link>
      <button onClick={toggleFetchingPosts}>TOGGLE FETCHING</button>
      {
        fetchingPosts ?
          (
            <div>FETCHING POSTS</div>
          )
          :
          (
            <div>NOT FETCHING POSTS</div>
          )
      }
    </div>
  )
}

export default Posts;