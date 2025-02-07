<script>
export default {
    name: 'MovieModal',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        movie: {
            type: Object,
            required: true
        }
    },
    watch: {
        show(newVal) {
            if (newVal) {
                document.body.style.overflow = 'hidden'; // Blocca lo scroll
            } else {
                document.body.style.overflow = 'auto';   // Riattiva lo scroll
            }
        }
    },

    computed: {
        getPosterUrl() {
            return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
        },
        getBackdropUrl() {
            return `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`;
        },
        getReleaseYear() {
            const date = this.movie.release_date || this.movie.first_air_date;
            return date ? new Date(date).getFullYear() : '';
        }, contentType() {
            // Se il titolo esiste, è un film; altrimenti, è una serie TV
            return this.movie.title ? 'FILM' : 'SERIES';
        },

    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>

<template>
    <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <!-- Fondo con immagine di copertura del film -->
            <div class="modal-background" :style="{ backgroundImage: `url(${getBackdropUrl})` }">
                <button class="close-button" @click="closeModal">
                    <span>&times;</span>
                </button>

                <!-- Sfumatura dal basso verso l'alto -->
                <div class="gradient-overlay">
                    <p class="d-flex justify-content-center">
                    <h2 class="my-text-red fw-bold">B</h2>
                    <h2 class="content-type">{{ contentType }}</h2>
                    </p>


                    <h1 class="movie-title">{{ movie.title || movie.name }}</h1>
                    <p class="movie-description">{{ movie.overview }}</p>
                </div>
            </div>
        </div>
    </div>
</template>




<style scoped>
.content-type {
    letter-spacing: 5px;
    text-transform: uppercase;
    color: white;
    padding: 0 1rem;
    /* Colore dorato */
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    /* Sovrapposizione scura per l'intero schermo */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow-y: auto;
}

.modal-content {
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    background-color: transparent;
    border-radius: 0;
    overflow-y: auto;
    position: relative;
    margin: 0;
}

/* Fondo a schermo intero con immagine di copertura */
.modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* Posiziona il contenuto in basso */
}

/* Sfumatura dal basso verso l'alto */
.gradient-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    padding: 20px;
    color: white;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: start;
    justify-content: end;
}

/* Titolo del film */
.movie-title {
    font-size: 3rem;
    font-weight: bold;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Descrizione del film */
.movie-description {
    font-size: 1.2rem;
    margin-top: 10px;
    line-height: 1.6;
    font-weight: 300;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* Pulsante di chiusura */
.close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    background: none;
}

/* Adattamenti responsivi per schermi più piccoli */
@media (max-width: 768px) {
    .movie-title {
        font-size: 2rem;
    }

    .movie-description {
        font-size: 1rem;
    }
}
</style>
