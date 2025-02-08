import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user')
      .then(response => setUser(response.data[0]))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.cName}</h1>
          <img src={user.profilePicture} alt="Profile" />
          <img src={user.bannerPicture} alt="Banner" />
          <p>{user.description}</p>
          <p>Email: {user.email}</p>
          <p>Subscribers: {user.subscribe}</p>
          <p>Videos: {user.videoNumber}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;