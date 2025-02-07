<script>
import { fetchData } from '../api.js'; // Mantieni l'importazione della funzione fetchData

export default {
    data() {
        return {
            popularContent: [], // Un array per film e serie TV combinati
            loading: false,
            sliderIndex: 0, // Indice per lo slider
        };
    },
    computed: {
        // Calcola quante stelle devono essere riempite in base al voto
        filledStars() {
            const vote = this.popularContent[this.sliderIndex]?.vote_average || 0; // Usa "this" per accedere a popularContent
            return Math.round(vote / 2); // Divide per 2 per ottenere un voto tra 0 e 5
        },
        contentType() {
            // Determina se è un film o una serie
            return this.popularContent[this.sliderIndex]?.title ? 'FILM' : 'SERIES';
        },
    },
    created() {
        // Carica i film e le serie TV popolari quando il componente viene creato
        this.fetchPopularContent();
        this.startSlider();
    },
    methods: {
        async fetchPopularContent() {
            this.loading = true;
            try {
                // Esegui entrambe le chiamate in parallelo usando Promise.all
                const [movies, tvShows] = await Promise.all([
                    fetchData('movie/popular'),  // Recupera i film popolari
                    fetchData('tv/popular')      // Recupera le serie TV popolari
                ]);

                // Combina i risultati dei film e delle serie TV e mischiali
                this.popularContent = [...movies, ...tvShows];
                this.popularContent = this.shuffleArray(this.popularContent); // Mischia i contenuti

                this.loading = false;
            } catch (error) {
                console.error('Errore nel recupero dei contenuti popolari:', error);
                this.loading = false;
            }
        },
        startSlider() {
            // Cambia immagine ogni 5 secondi
            setInterval(() => {
                this.sliderIndex = (this.sliderIndex + 1) % this.popularContent.length;
            }, 5000);
        },
        // Funzione per mischiare l'array
        shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5); // Mischia casualmente gli elementi
        },
    },
};
</script>


<template>
    <!-- Slider automatico per la copertura a tutto schermo con film e serie TV mischiate -->
    <div class="slider" v-if="popularContent.length > 0">
        <div class="slider-item">
            <!-- L'immagine con un effetto gradiente sopra di essa -->
            <div class="slider-image-container">
                <img class="slider-image"
                    :src="`https://image.tmdb.org/t/p/original${popularContent[sliderIndex].backdrop_path}`"
                    alt="Slider Image" />
                <div class="slider-overlay"></div> <!-- Sovrapposizione nera con gradiente -->
            </div>
            <div class="slider-text">
                <!-- Aggiungi la scritta FILM o TV sopra il titolo -->
                <p>
                    <span class="my-text-red fw-bold">B</span>
                    <span class="content-type">{{ contentType }}</span>
                </p>


                <h2>{{ (popularContent[sliderIndex].title || popularContent[sliderIndex].name).toUpperCase() }}</h2>

                <!-- Visualizzazione delle stelle -->
                <div class="stars">
                    <span v-for="index in 5" :key="index" class="star" :class="{ 'filled': index <= filledStars }">
                        &#9733; <!-- Carattere per la stella vuota -->
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
.slider {
    width: 100%;
    height: 80vh;
    /* Mantieni l'altezza a 50vh */
    background-color: black;
    position: relative;
}

.slider-item {
    position: relative;
    width: 100%;
    height: 100%;
}

.slider-image-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.slider-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Fa sì che l'immagine copra completamente l'area */
    object-position: top;
    /* Centra l'immagine */
    transition: opacity 1s ease-in-out;
}

.content-type {
    font-size: 20px;
    letter-spacing: 5px;

    text-transform: uppercase;
    color: white;
    padding: 0 1rem;
    /* Colore dorato */
    margin-bottom: 10px;
}

.slider-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Mantieni metà dell'altezza */
    background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    /* Gradiente che sfuma da sinistra verso destra */
    z-index: 1;
}

@media (max-width: 1024) {

    .slider-image {

        object-position: top center;
    }
}




.slider-text {
    position: absolute;
    bottom: 30px;
    /* Spazio dal basso per il titolo */
    left: 20px;
    /* Posiziona il titolo a sinistra */
    color: white;
    font-size: 36px;
    /* Aumenta la dimensione del titolo */
    /* Aggiungi uno sfondo semi-trasparente */
    padding: 15px;
    max-width: 80%;
    /* Limita la larghezza massima per non coprire troppo dell'immagine */
    line-height: 1.2;
    /* Aggiusta la spaziatura delle righe per una migliore leggibilità */
    text-transform: uppercase;
    /* Rende il testo tutto maiuscolo */
    z-index: 2;
    /* Porta il titolo sopra l'overlay */
}

.stars {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
}

.star {
    font-size: 24px;
    /* Dimensione della stella */
    color: #d3d3d3;
    /* Colore della stella vuota (grigio) */
    margin-right: 5px;
}

.star.filled {
    color: #ffd700;
    /* Colore della stella riempita (oro) */
}
</style>