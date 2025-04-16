import { useState } from "react";
import axios from "axios";

const InstagramPosts = () => {
    const [username, setUsername] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPosts = async () => {
        if (!username) {
            setError("Please enter a username");
            return;
        }

        setLoading(true);
        setError("");

        const options = {
            // method: "GET",
            // url: "https://instagram230.p.rapidapi.com/user/posts",
            // params: { username },
            // headers: {
            //     "x-rapidapi-key": '8f6c168fb1msh3889346dd5bcdc3p107b8cjsnf71614ea3fe8',
            //     "x-rapidapi-host": "instagram230.p.rapidapi.com",
            // },
            method: 'GET',
  url: 'https://real-time-instagram-scraper-api1.p.rapidapi.com/v1/reels_by_keyword',
  params: {username},
  headers: {
    'x-rapidapi-key': '8f6c168fb1msh3889346dd5bcdc3p107b8cjsnf71614ea3fe8',
    'x-rapidapi-host': 'real-time-instagram-scraper-api1.p.rapidapi.com'
  }
        };

        try {
            const response = await axios.request(options);
            setPosts(response.data.posts || []); // Store posts in state
        } catch (err) {
            setError("Failed to fetch posts. Please check the username.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const downloadMedia = (url, type) => {
        const fileExtension = type === "video" ? "mp4" : "jpg";
        const a = document.createElement("a");
        a.href = url;
        a.download = `instagram_post.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Instagram Posts Viewer</h1>
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Enter Instagram Username"
                    className="px-4 py-2 border rounded-lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button
                    onClick={fetchPosts}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    {loading ? "Loading..." : "Fetch Posts"}
                </button>
            </div>

            {error && <p className="text-red-500 mt-3">{error}</p>}

            <div className="grid grid-cols-3 gap-4 mt-6">
                {posts.map((post, index) => (
                    <div key={index} className="border p-2 rounded-lg shadow-md">
                        {post.media_type === "video" ? (
                            <video src={post.media_url} controls className="w-40 h-40" />
                        ) : (
                            <img src={post.media_url} alt="Post" className="w-40 h-40" />
                        )}
                        <button
                            onClick={() => downloadMedia(post.media_url, post.media_type)}
                            className="bg-green-500 text-white px-3 py-1 mt-2 rounded-lg w-full"
                        >
                            Download
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstagramPosts;
