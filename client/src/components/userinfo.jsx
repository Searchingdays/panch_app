import { useEffect, useState } from 'react';

import Post from './post';

// this is to be used to show or not show the user name in the home page or any other page

export default function UserInfo({showname}) {
  const [user, setUser] = useState(null); // null = unknown, {} = not logged in
  const [id, setid] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me', {
          credentials: 'include', // needed if using HTTP-only cookies
        });
        if (res.ok && {showname}) {
          const data = await res.json();
          setUser(data.name); 
          setid(data._id);

        } else if(res.ok && !{showname}) {
          setUser({});
          const data = await res.json();
          setid(data._id);

        }
      } catch (err) {
        console.error('Failed to fetch user info', err);
        setUser({});
      }
    };

    fetchUser();
  }, [showname]);

  return (
    <div style={{ padding: '10px', background: '#eee', fontSize: '14px' }}>
      <strong>User:</strong>{' '}
      <Post
       id={id}
      name = {user ? user : <span style={{ color: '#999' }}>Guest</span>}
      />
    </div>
  );
}
