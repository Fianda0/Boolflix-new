<script>
import { fetchData } from '@/api.js'; // Importa la funzione per chiamare l'API

export default {
    props: {
        category: {
            type: String,
            required: true
        },
        titleList: {
            type: String
        },
        genre: {
            type: String,
            default: null // Può essere null se non si passa un genere
        }
    },
    data() {
        return {
            movies: [],           // Array per i film
            tvShows: [],          // Array per le serie TV
            scrollPosition: 0,    // Posizione di scorrimento
            scrollAmount: 300     // Quantità di scorrimento
        };
    },
    methods: {
        // Chiamata all'API per recuperare i film della categoria passata come prop
        async fetchMovies() {
            try {
                const response = await fetchData(`${this.category}`);
                this.movies = response;
            } catch (error) {
                console.error('Errore nel recupero dei film:', error);
            }
        },

        // Funzione per ottenere i film e le serie TV di un determinato genere
        async fetchMoviesByGenre() {
            try {
                // Recupera la lista dei generi
                const genres = await fetchData('genre/movie/list');

                // Trova l'ID del genere corrispondente al nome
                const genreId = this.getGenreId(this.genre, genres); // Passa anche la lista dei generi
                console.log(genres);

                if (genreId) {
                    // Esegui la chiamata per recuperare film e serie TV
                    const [moviesResponse, tvShowsResponse] = await Promise.all([
                        fetchData(`discover/movie?with_genres=${genreId}`), // Film per il genere
                        fetchData(`discover/tv?with_genres=${genreId}`)      // Serie TV per il genere
                    ]);

                    // Unisci i risultati dei film e delle serie TV
                    this.movies = [...moviesResponse, ...tvShowsResponse];
                } else {
                    console.error('Genere non trovato!');
                }
            } catch (error) {
                console.error('Errore nel recupero dei film e serie TV per il genere:', error);
            }
        },

        // Funzione per ottenere l'ID del genere in base al nome
        getGenreId(genreName, genres) {
            // Trova il genere corrispondente dal risultato dell'API
            const genre = genres.find(g => g.name === genreName);
            return genre ? genre.id : null; // Restituisce l'ID del genere o null se non esiste
        },

        // Funzione helper per ottenere l'URL dell'immagine
        getImg(path) {
            return path ? `https://image.tmdb.org/t/p/original${path}` : '/placeholder.jpg';
        },

        // Scorrimento a sinistra
        scrollLeft() {
            const carousel = this.$refs.carouselContainer;

            if (carousel.scrollLeft <= 0) {
                // Torna direttamente all'ultima card
                const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
            } else {
                // Scorre normalmente a sinistra
                carousel.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
            }
        },

        // Scorrimento a destra con ritorno alla prima card se necessario
        scrollRight() {
            const carousel = this.$refs.carouselContainer;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            if (carousel.scrollLeft >= maxScroll - 10) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
            }
        }
    },
    mounted() {
        if (this.genre) {
            this.fetchMoviesByGenre(); // Se c'è un genere, chiama la funzione per il genere
        } else {
            this.fetchMovies(); // Altrimenti, chiama la funzione normale
        }
    }
};
</script>


<template>
    <div class="upcoming-movies">
        <div class="section-title">{{ titleList }}</div>
        <div class="carousel-container">
            <!-- Pulsante sinistro per scorrere indietro -->
            <button class="carousel-button carousel-button-left" @click="scrollLeft">&#8592;</button>

            <!-- Contenitore delle card -->
            <div class="movie-cards-container" ref="carouselContainer">
                <div v-for="(movie, index) in movies" :key="index" class="movie-card">
                    <span class="my-text-red fw-bold b-movie">B</span>
                    <img :src="getImg(movie.poster_path)" alt="Poster" class="movie-poster">
                </div>
            </div>

            <!-- Pulsante destro per scorrere avanti -->
            <button v-if="movies.length > 0" class="carousel-button carousel-button-right" @click="scrollRight">
                &#8594;
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Stili per la sezione Upcoming Movies */
.upcoming-movies {
    padding: 20px;
    background-color: black;
    color: white;
}

/* Titolo della sezione */
.section-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

/* Contenitore del carosello */
.carousel-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

/* Pulsanti per navigare il carosello */
.carousel-button {
    position: absolute;
    top: 50%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    cursor: pointer;
    transform: translateY(-50%);
    font-size: 24px;
    height: 100%;
    padding: 0 20px;
}

.carousel-button-left {
    left: 0;
}

.carousel-button-right {
    right: 0;
}

/* Contenitore delle card del carosello */
.movie-cards-container {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 20px;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    scrollbar-width: none;
    justify-content: flex-start;
}

/* Nascondi la scrollbar nei browser moderni */
.movie-cards-container::-webkit-scrollbar {
    display: none;
}

/* Card individuali */
.movie-card {
    width: 250px;
    flex-shrink: 0;
    background-color: #333;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
    transition: transform 0.3s ease;
    cursor: pointer;
    position: relative;
}

.movie-card:hover {
    transform: scale(1.05);
}

/* Immagine del poster */
.movie-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Titolo sopra l'immagine */
.b-movie {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.5rem;
}

/* Media query per dispositivi mobili */
@media (max-width:1024px) {
    .carousel-button {
        display: none;
    }

    .movie-card {
        width: 30%;
        height: 100%;
    }

    .movie-cards-container {
        display: flex;
        flex-wrap: nowrap;
        gap: 10px;
        overflow-x: scroll;
        justify-content: flex-start;
    }
}
</style>
