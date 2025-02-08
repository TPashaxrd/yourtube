import { useState } from 'react';

const UploadForm = ({ onUpload }) => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [previewImage, setPreviewImage] = useState(null); 

  const handleUpload = async () => {
    if (!video || !previewImage) {
      alert("Lütfen video ve kapak fotoğrafı seçin!");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title); 
    formData.append("preview", previewImage);

    const response = await fetch("http://localhost:5001/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      alert("Video ve preview başarıyla yüklendi!");
      onUpload();
    } else {
      alert("Hata: " + data.error);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <input
        type="text"
        placeholder="Video Başlığı"
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="video/*"
        className="border p-2 w-full mt-2"
        onChange={(e) => setVideo(e.target.files[0])}
      />

      <input
        type="file"
        accept="image/*"
        className="border p-2 w-full mt-2"
        onChange={(e) => setPreviewImage(e.target.files[0])}
      />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 mt-2 w-full">
        Yükle
      </button>
    </div>
  );
};

export default UploadForm;
