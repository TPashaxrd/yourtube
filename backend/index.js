const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let userData = [
  {
    "cName": "LaptopluGezgin",
    "user": "LaptopluGezgin",
    "profilePicture": "https://yt3.googleusercontent.com/OQChY1WskGq9Brv9rkClA-fh-YhetQxznzEqhcN2AjqUJoI7Lel9s536svUw4WnEJkWsb6q3=s900-c-k-c0x00ffffff-no-rj",
    "bannerPicture": "https://yt3.googleusercontent.com/-g6Lu3lzKLEZxGj4PU2xGWKZyvoNJ33NNk9TMcqIZUcg5UK4D6B4u5wwgzW_THjoXW_zTEAL=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
    "channelColor": "white",
    "subscribe": "426 B",
    "videoNumber": "857",
    "description": "Kendini geliştirip HERKESTEN FARKLI ve ÖZGÜN biri olmak istiyorsan takip et.. eğlence arıyorsan burda yok! Instagram : laptoplugezgin Twitter : laptoplugezgin tiktok : laptoplugezgin twitch: laptoplugezgin Spotify : laptoplugezgin",
    "email": "altintoprak@gmail.com",
    "about": "İ don't know how but I'm trying every way i can think of."
  }
];

app.get('/api/user', (req, res) => {
  res.json(userData);
});

app.put('/api/user', (req, res) => {
  const updatedUser = req.body;
  userData[0] = updatedUser; 
  res.json({ message: 'User updated successfully', userData });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
