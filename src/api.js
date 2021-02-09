const BASE_URL = 'https://api.themoviedb.org/'
const API_KEY = process.env.REACT_APP_API_KEY;
const SECURE_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

function makeRequest(url) {
    url.searchParams.append('api_key', API_KEY);
    return window.fetch(url, {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }).then(r => r.json());
}

export function buildImageUrl(path, size = 'w500') {
    return `${SECURE_IMAGE_BASE_URL}/${size}/${path}`;
}

export function getGenres(type = 'movie') {
    const url = new URL(`/3/genre/${type}/list`, BASE_URL);

    return makeRequest(url);
}

export function searchMovies(queryString, page = 1) {
    const url = new URL(`/3/search/movie`, BASE_URL);
    url.searchParams.append('query', queryString);
    url.searchParams.append('page', page);
    
    return makeRequest(url);
}