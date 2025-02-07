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

    <AppSliderHome />

    <CarouselList category="movie/upcoming" titleList="Coming Soon" />
    <CarouselList category="movie/popular" titleList="Popular Film" />
    <CarouselList category="tv/popular" titleList="Popular Series" />
    <carousel-list category="popular" titleList="Horror" genre="Horror"></carousel-list>
    <carousel-list category="popular" titleList="Comedy" genre="Comedy"></carousel-list>
    <carousel-list category="popular" titleList="Action" genre="Action"></carousel-list>
    <carousel-list category="popular" titleList="Fantasy" genre="Fantasy"></carousel-list>
    <carousel-list category="popular" titleList="Family" genre="Family"></carousel-list>

</template>







<style scoped></style>
