
// general.jsx : all posts less than 2 days old will be displayed here. 

// in reply to a get request, the server will query and retrieve all the posts less than 2
// days old from the 
// database and send it in the response. then each post has to be rendered in the frontend 
// according to the format in posts.jsx and then displayed here in general.jsx


import React, { useEffect, useState } from 'react';
import Post from '../components/post'; // Component to render each post

export default function General() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch('/recent-posts');
        const data = await res.json();  // we have all the recent posts, latest first
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div>
      <h2>Recent Panchayat Posts</h2>
      {posts.length === 0 ? (
        <p>No recent posts found.</p>
      ) : (
        posts.map((post) => (
          <Post              // passing of props 
            content={post.content}
            name={post.name || 'Anonymous'}
            timestamp={post.createdAt}
            showname={true}
          />
        ))
      )}
    </div>
  );
}

