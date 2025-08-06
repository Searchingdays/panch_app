import PostForm from '../components/postform'

import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import React, { useEffect, useState } from 'react';
import Post from '../components/post';
import UserInfo from '../components/userinfo';

export default function Home() {

  // const navigate = useNavigate();

  // const handleCreatePost = () => {
  //   const isLoggedIn = localStorage.getItem('token'); 
  //   if (isLoggedIn) {
  //     navigate('/postform');
  //   } else {
  //     const choice = window.confirm('You need to log in or sign up first. Go to login?');
  //     if (choice) navigate('/api/login');
  //   }
  // };


  const [popularposts, setPopularPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPopularPosts = async () => {
  //     try {
  //       const res = await fetch('/api/popular-posts');
  //       const data = await res.json();

  //       setPopularPosts(data);
  //       console.log(data);
  //     } catch (err) {
  //       console.error('Error loading popular posts:', err);
  //     }
  //   };

  //   fetchPopularPosts();
  // }, []);

  const handleCreatePost = () => {}

  return (
        <>
      {/* <NavBar />
      <UserInfo /> */}
      <h1>Welcome to the Panchayat App</h1>
      <div>

      <h3>Create a new post</h3>
        
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    <div>
      <h2> Popular Posts</h2>
      {popularposts.length === 0 ? (
        <p></p>
      ) : (
        popularposts.map((post) => (
          <Post
            name={post.name}
            content={post.content}
            timestamp={post.timestamp}
            
          />
        ))
      )}
    </div>
    </>
  );
}

 



