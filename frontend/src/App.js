import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import Header from './components/Pages/Header';
import View from './components/Channel/View';
import Videos from './components/Channel/Videos';
import axios from 'axios';

const App = () => {

    const [user, setUser] = useState(null);
    useEffect(() => {
      axios.get('http://localhost:5000/api/user')
        .then(response => setUser(response.data[0]))
        .catch(error => console.error('Error fetching user data:', error));
    }, []);
  
    if (!user) return <div>Loading...</div>;

  return (
    <>
      <Helmet>
     <title>Yourtube | @{user.user ? `${user.user} | YourTube` : "YourTube"}</title>
     </Helmet>
     <Header/>
     <View/>
     <Videos/>
    </>
  )
}

export default App;