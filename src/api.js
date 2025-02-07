import axios from 'axios';

// La chiave API e l'URL di base
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = 'https://api.themoviedb.org/3/';

// Configura Axios con un baseURL
const axiosInstance = axios.create({
    baseURL: baseURL,  // Imposta baseURL
    params: {
        api_key: apiKey,
        language: 'us-US',
    },
});

// Funzione generica per recuperare i dati (aggiungendo il parametro query per la ricerca)
export const fetchData = async (path, query = '') => {
    try {
        const response = await axiosInstance.get(path, {
            params: {
                query: query,  // Aggiungi il parametro query se esiste
            },
        });
        if (path === 'genre/movie/list') {
            return response.data.genres;  // Restituisce direttamente l'array dei generi
        }
        return response.data.results;
    } catch (error) {
        console.error('Errore nella chiamata API:', error);
        throw error;
    }
};

// 68f539d4c5f4ea12d1028971c3571838