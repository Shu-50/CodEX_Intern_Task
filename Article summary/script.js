document.getElementById('summarize-btn').addEventListener('click', summarizeArticle);

async function summarizeArticle() {
    const apiKey = 'cb5a0922bcmshb08c8a843419ea4p1888bajsnbf17edc3e6db';  // Replace with your actual RapidAPI key
    const apiUrl = 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize';
    
    const articleUrl = document.getElementById('article-url').value;
    
    if (!articleUrl) {
        displayError('Please enter a valid URL.');
        return;
    }

    // Show loading spinner
    showLoading();

    // Headers for the API request
    const headers = {
        'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com',
        'X-RapidAPI-Key': apiKey
    };

    // API parameters
    const params = new URLSearchParams({
        url: articleUrl,
        length: '3' // Length of the summary (can be adjusted)
    });

    try {
        // Send the API request using fetch
        const response = await fetch(`${apiUrl}?${params}`, { headers });

        // Hide loading spinner
        hideLoading();

        if (response.ok) {
            const data = await response.json();
            displaySummary(data.title, data.summary);
        } else {
            throw new Error('Failed to fetch summary. Please try again.');
        }
    } catch (error) {
        hideLoading();
        displayError(error.message);
    }
}

// Function to show the loading spinner
function showLoading() {
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');

    // Hide other containers while loading
    document.getElementById('summary-container').classList.add('hidden');
    document.getElementById('error-container').classList.add('hidden');
}

// Function to hide the loading spinner
function hideLoading() {
    const loading = document.getElementById('loading');
    loading.classList.add('hidden');
}

// Function to display the summary
function displaySummary(title, summary) {
    const summaryContainer = document.getElementById('summary-container');
    const summaryText = document.getElementById('summary-text');
    
    summaryText.textContent = summary;
    summaryContainer.classList.remove('hidden');
}

// Function to display errors
function displayError(message) {
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = message;
    errorContainer.classList.remove('hidden');
}
