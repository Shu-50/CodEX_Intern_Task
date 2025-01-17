import { useState } from 'react'

const SongDownloader = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);

        try {
            const apiUrl = `https://spotify-downloader6.p.rapidapi.com/spotify?spotifyUrl=${encodeURIComponent(url)}`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    // 'Content-Type' : 'application/json',
                    'X-RapidAPI-Key': '762efc4a52msh625104a068fd0b5p1b244fjsn05a712e43a48',
                    'X-RapidAPI-Host': ''
                },
                // body: JSON.stringify({url})
            });

            if (!response.ok) throw new Error('Download failed');

            const data = await response.json();
            console.log(data)
            const link = document.createElement('a');
            link.href = data.download_link;
            link.download = `${data.title}.mp3`;
            link.click();
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Failed to download song. Check the URL or try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='min-w-md  mx-auto bg-black border shadow-lg rounded-lg p-6'>
                <h2 className='text-2xl font-semibold text-center mb-4 text-white'>Spotify Song Downloader</h2>
                <input
                    type='text'
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder='Enter Spotify song URL'
                    className='w-full p-2 border border-gray-300 rounded-md mb-4 text-white'
                />
                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className='w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 disabled:bg-gray-400'
                >
                    {loading ? 'Downloading...' : 'Download Song'}
                </button>
                {error && <p className='text-red-500 mt-4 text-center'>{error}</p>}
            </div>
        </>
    )
}

export default SongDownloader