const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());
app.use("/videos", express.static(path.join(__dirname, "uploads")));

const VIDEO_DB = path.join(__dirname, "videos.json");

if (!fs.existsSync(VIDEO_DB)) {
  fs.writeFileSync(VIDEO_DB, "[]", "utf-8");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const getVideos = () => {
  try {
    return JSON.parse(fs.readFileSync(VIDEO_DB));
  } catch {
    return [];
  }
};

app.post("/api/upload", upload.fields([
  { name: "video", maxCount: 1 },  
  { name: "preview", maxCount: 1 },   
]), (req, res) => {
  if (!req.files || !req.files.video || !req.files.preview) {
    return res.status(400).json({ error: "Video ve kapak fotoğrafı gereklidir!" });
  }

  const videos = getVideos();

  const newVideo = {
    id: Date.now(),
    title: req.body.title || "Bilinmeyen",
    path: `/videos/${req.files.video[0].filename}`,
    preview: `http://localhost:5001/videos/${req.files.preview[0].filename}`,
    likes: 0,
    views: 0,
  };
// or if u want, change localhost:${port}
  videos.push(newVideo);

  fs.writeFileSync(VIDEO_DB, JSON.stringify(videos, null, 2));

  res.json({ message: "Video ve preview başarıyla yüklendi!", video: newVideo });
});

app.get("/api/videos", (req, res) => {
  res.json(getVideos());
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor!`);
});
