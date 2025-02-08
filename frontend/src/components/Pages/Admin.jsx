import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadComponent from './Upload';
import { Helmet } from 'react-helmet';

const Admin = () => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    cName: '',
    user: '',
    profilePicture: '',
    bannerPicture: '',
    channelColor: '',
    subscribe: '',
    videoNumber: '',
    description: '',
    email: '',
    about: ''
  });

  const verifyPassword = () => {
    const trueKey = "2443";
    const userInput = prompt("Please Enter Key: ");
    if (userInput === trueKey) {
      setIsAuthenticated(true);
    } else {
      alert("Wrong Password!!");
      window.location.reload();
    }
  };
  useEffect(() => {
    verifyPassword();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user')
      .then(response => {
        setUser(response.data[0]);
        setFormData(response.data[0]);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put('http://localhost:5000/api/user', formData)
      .then(response => {
        alert('User data updated!');
        setUser(formData); 
      })
      .catch(error => console.error('Error updating user data:', error));
  };

  return (
   <>
   <Helmet>
   <title>{user.user ? `${user.user} | Admin` : "Admin"}</title>
   </Helmet>
    <div className="min-h-screen bg-black-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <p className="items-center">Hello, {user.user}!</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Channel Name</label>
            <input
              type="text"
              name="cName"
              value={formData.cName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Banner Picture URL</label>
            <input
              type="text"
              name="bannerPicture"
              value={formData.bannerPicture}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Channel Color</label>
            <input
              type="text"
              name="channelColor"
              value={formData.channelColor}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subscribers</label>
            <input
              type="text"
              name="subscribe"
              value={formData.subscribe}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Videos</label>
            <input
              type="text"
              name="videoNumber"
              value={formData.videoNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className=" text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="3"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">About</label>
            <input
              type="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update User
            </button>
          </div>
        </form>
        <h2>VIDEO UPLOAD</h2>
        <UploadComponent/>
      </div>
    </div>
   </>
  );
};

export default Admin;