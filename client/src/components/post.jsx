// each of the post will be rendered in this format. 

// using props get the content from the postform.jsx and the user's name or anonymous from userinfo.jsx
import React, {useState} from 'react';




export default function Post({content, showname, name, id, timestamp}) {


  let c = 0;   // just a variable to store the supportcount

  const formattedTime = new Date(timestamp).toLocaleString();

  // const [supportcount, setSupportCount] = useState();
  const [supported, setSupported] = useState(false);

    const handleSupport = async () => {
    if (supported){

     return;

     } // prevent multiple clicks

     
    const res = await fetch(`/api/posts/${id}/support`, {
      method: 'PATCH'
    });
    const data = await res.json();
    if (data.success) {
      data.supportcount = data.supportcount + 1 ;
      c = data.supportcount;
      setSupported(true);
    }
  };

  return (
    <div style={styles.card}>
      if ({showname}) {
      <h4 style={styles.author}>Posted by: {name}</h4> // when showname is false, delete the
}

else {      
                                                  
      <h4 style={styles.author}>Posted by: {}</h4>
}
      <p style={styles.description}>{content}</p>
      <small style={styles.time}>Posted on: {formattedTime}</small>
      <button onClick={handleSupport} disabled={supported}>
         I Support {c}
      </button>


    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
    padding: '16px',
    marginBottom: '12px',
    borderRadius: '6px',
    boxShadow: '1px 1px 4px rgba(0,0,0,0.1)'
  },
  author: {
    margin: 0,
    color: '#333'
  },
  description: {
    fontSize: '15px',
    margin: '8px 0'
  },
  time: {
    fontSize: '12px',
    color: '#666'
  }
};
