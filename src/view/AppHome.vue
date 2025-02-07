<script>
import AppSliderHome from '@/components/AppSliderHome.vue';
import CarouselList from '@/components/CarouselList.vue';

export default {
    components: {
        AppSliderHome,
        CarouselList
    },

}
</script>



<template>
    <main>

        <AppSliderHome />

        <CarouselList category="movie/upcoming" titleList="Film in arrivo" />
        <CarouselList category="movie/popular" titleList="Film più visti" />
        <CarouselList category="tv/popular" titleList="Serie TV più viste" />
        <carousel-list category="popular" titleList="Horror" genre="Horror"></carousel-list>

    </main>
</template>







<style scoped>
@media (min-width: 1025px) {
    main {
        padding-left: 150px;
    }
}

@media (max-width: 1024px) {
    main {
        padding-bottom: 50px;
    }
}
</style>
