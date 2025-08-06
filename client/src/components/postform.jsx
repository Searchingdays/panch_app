import React, { useState } from 'react';
import Login from '../pages/login';
import Post from './post';      // this is the child component 
import UserInfo from './userinfo';


export default function PostForm() {
  const [content, setContent] = useState('');
  const [showname, setshowname] = useState(false);


const handleSubmit = async () => {
   await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Don't send name/phone from frontend!
    },
    body: JSON.stringify({
      content,
      showname 

    }),
    credentials: 'include' // important if using cookie-based auth
  });
}

  return (
    <>

  <Post 
  content = {content}            // passing of props to child elements. Now these can be used 
  showname = {showname}
  />

  <UserInfo 
  showname = {showname}
  />

    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write out your post.."
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <button onClick={() => setshowname(true)}>Include name</button>
      <button onClick={() => setshowname(false)}>Do not include name</button>
      <button type="submit">Post</button>
    </form>
    </>
  );
}
