import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'http://localhost:3001'
});

function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    axiosInstance.get('/home', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUsername(response.data.username);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <div>
        <h1>Welcome {username}</h1>
      </div>
    </>
  );
}

export default Home;