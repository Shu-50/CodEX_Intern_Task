// import React, { useState } from "react";
// import axios from "axios";

// const InputForm = ({ setError }) => {
//   const [URL, setURL] = useState("");
//   const [loading, setLoading] = useState(false);

//   const extractVideoId = (url) => {
//     const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   const handleInput = (e) => {
//     setURL(e.target.value);
//     setError(""); // Clear errors when input changes
//   };

//   const downloadVideo = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const videoId = extractVideoId(URL);
//     if (!videoId) {
//       setError("Invalid YouTube URL. Please enter a valid URL.");
//       setLoading(false);
//       return;
//     }

//     const options = {
//       method: "GET",
//       url: 'https://youtube-media-downloader.p.rapidapi.com/v2/misc/list-items',
//       params: { id: videoId },
//       headers: {
//         'x-rapidapi-key': '8f6c168fb1msh3889346dd5bcdc3p107b8cjsnf71614ea3fe8',
//         'x-rapidapi-host': 'youtube-media-downloader.p.rapidapi.com',
//         'Content-Type': 'application/x-www-form-urlencoded'
//         // "content-type": "application/json",
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       const downloadUrl = response?.data?.formats?.[0]?.url;
//       if (downloadUrl) {
//         window.location.href = downloadUrl;
//       } else {
//         setError("Failed to fetch download URL. Please try again.");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching video data. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={downloadVideo}
//       className="flex items-center justify-center gap-x-3 w-full"
//     >
//       <input
//         type="url"
//         placeholder="Paste YouTube URL here..."
//         className="h-12 w-96 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
//         value={URL}
//         onChange={handleInput}
//       />
//       <button
//         type="submit"
//         className={`h-12 px-6 rounded-lg font-medium text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         disabled={loading}
//       >
//         {loading ? "Loading..." : "Download"}
//       </button>
//     </form>
//   );
// };

// export default InputForm;




import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ setError }) => {
  const [URL, setURL] = useState("");
  const [loading, setLoading] = useState(false);

  const extractVideoId = (url) => {
    const regex = /(?:v=|\/|vi\/|youtu\.be\/|embed\/|shorts\/|watch\?v=)([0-9A-Za-z_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleInput = (e) => {
    setURL(e.target.value);
    setError(""); // Clear errors when input changes
  };

  const downloadVideo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const videoId = extractVideoId(URL);
    if (!videoId) {
      setError("Invalid YouTube URL. Please enter a valid URL.");
      setLoading(false);
      return;
    }

    const options = {

      method: 'GET',
      url: 'https://yt-api.p.rapidapi.com/video/info',
      params: { id: 'arj7oStGLkU' },
      headers: {
        'x-rapidapi-key': '8f6c168fb1msh3889346dd5bcdc3p107b8cjsnf71614ea3fe8',
        'x-rapidapi-host': 'yt-api.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const formats = response?.data?.videos || [];

      if (formats.length > 0) {
        const bestQuality = formats.find((format) => format.quality === "hd" || format.quality === "sd") || formats[0];
        const downloadUrl = bestQuality.url;

        if (downloadUrl) {
          window.open(downloadUrl, "_blank"); // Opens download in a new tab
        } else {
          setError("Download link not found. Try a different video.");
        }
      } else {
        setError("No downloadable formats found.");
      }
    } catch (err) {
      setError("Error fetching video data. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={downloadVideo}
      className="flex items-center justify-center gap-x-3 w-full"
    >
      <input
        type="url"
        placeholder="Paste YouTube URL here..."
        className="h-12 w-96 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
        value={URL}
        onChange={handleInput}
      />
      <button
        type="submit"
        className={`h-12 px-6 rounded-lg font-medium text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Download"}
      </button>
    </form>
  );
};

export default InputForm;
