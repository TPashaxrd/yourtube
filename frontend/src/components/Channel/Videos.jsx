import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VideoCard = ({ video, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer w-72"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="relative">
        {video.preview && !imageError ? (
          <img
            className="w-full h-48 object-cover"
            src={video.preview}
            alt={video.title}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            Görsel Yok
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-all">
          {video.title}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Likes: {video.likes} | Views: {video.views}
        </p>
      </div>
    </motion.div>
  );
};

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/videos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Gelen videolar:", data);
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openVideoDetail = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoDetail = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="w-12 h-12 bg-blue-500 rounded-full"
          animate={{ scale: [1, 1.5, 1], rotate: [0, 360] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {selectedVideo && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg w-full md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 p-4 relative max-w-screen-lg max-h-screen overflow-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeVideoDetail}
            >
              ✕
            </button>
            <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
              <video
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                controls
                autoPlay
                src={`http://localhost:5001${selectedVideo.path}`}
                onError={(e) => console.error("Video yüklenemedi:", e)}
                onCanPlay={() => console.log("Video yüklendi ve oynatıma hazır.")}
              />
            </div>
            <h2 className="text-2xl font-semibold mt-4">{selectedVideo.title}</h2>
            <p className="text-gray-500 mt-2">
              Likes: {selectedVideo.likes} | Views: {selectedVideo.views}
            </p>
          </motion.div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            video={video}
            onClick={() => openVideoDetail(video)}
          />
        ))}
      </div>
    </div>
  );
};

export default Videos;