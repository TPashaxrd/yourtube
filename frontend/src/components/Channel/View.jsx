import React, { useState, useEffect } from "react";
import { BellIcon, CheckIcon } from '@heroicons/react/solid'; 
import axios from "axios";

const View = () => {
  const [user, setUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(() => {
    const savedSubscription = localStorage.getItem('isSubscribed');
    return savedSubscription === 'true';
  });

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubscribe = () => {
   const newSubscriptionState = !isSubscribed; 
    setIsSubscribed(newSubscriptionState);
    localStorage.setItem('isSubscribed', newSubscriptionState);
  };;
  

  const reportToToast = () => {
    console.log("Report? Oh. Can u send me e-mail?");
    alert("Report is unavailable");
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/user')
      .then(response => setUser(response.data[0]))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <div className="container">
        <div className="banner">
          <img
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '0',
              userSelect: "none",
            }}
            src={user.bannerPicture}
            alt="Banner"
          />
        </div>
        <div className="all-channel" style={{ backgroundColor: user.channelColor }}>
          <div className="profile-section">
            <div className="profile-img-container">
              <img
                style={{
                  borderRadius: '50%',
                  height: '150px',
                  width: '150px',
                  objectFit: 'cover',
                  userSelect: "none",
                  marginTop: '-35px',
                }}
                className="profile-pic"
                src={user.profilePicture}
                alt="Profile"
              />
            </div>
            <div className="info">
              <h2 style={{ fontFamily: 'Space Grotesk, serif' }}>
                {user.cName}<br />
                <a style={{ fontFamily: 'Roboto Condensed, serif', fontSize: '15px', color: '#101114' }}><div className="flex">
                  &nbsp;@{user.user} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7" style={{ marginTop: '-3px' }}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
                  &nbsp;
                  </div>
                  <a href={`mailto:${user.email}`}><i className="fa-solid fa-flag" style={{ cursor: 'pointer' }} onClick={reportToToast}></i></a><br />
                  <p>
                    {isExpanded
                      ? user.description
                      : `${user.description.slice(0, 20)}...`}
                    <button onClick={handleToggle} style={{ cursor: 'pointer', color: 'blue' }}>
                      {isExpanded ? ' less' : ' more'}
                    </button>
                  </p>
                  <p>
                   <div style={{ color: 'gray', fontFamily: 'Space Grotesk, serif' }}>{user.about}. ~  {user.user}</div>
                  </p>
                  <br />
                  <a style={{ color: '#91a3b0', fontFamily: 'Space Grotesk, serif' }}>{user.subscribe}</a> Abone
                  &nbsp;<a style={{ color: "#91a3b0" }}>{user.videoNumber}</a> Video
                </a>
              </h2>
              <div className="flex channel-buttons">
              <button onClick={handleSubscribe} className={`flex items-center ${
              isSubscribed
             ? 'bg-gray-400 hover:bg-gray-500'
             : 'bg-red-600 hover:bg-red-700' } text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`} > {isSubscribed ? ( <> <span>Subscribed</span> <CheckIcon className="w-5 h-5 mr-2" />  </> ) : ( <> <span>Subscribe</span><BellIcon className="w-5 h-5 mr-2" /> </> )} </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <a href="/admin" className="flex" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                Manage Channel</a></button>
             </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;