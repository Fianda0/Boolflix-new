<script>
export default {
    name: 'AppHeaderMobile'
}

</script>
<template>
    <nav class="navbar navbar-light bg-dark navbar-fixed-bottom">
        <ul class="navbar-nav d-flex justify-content-around flex-row  m-0 p-0">
            <li class="nav-item">
                <RouterLink to="/" class="nav-link text-white d-flex flex-column">
                    <i class="fa-solid fa-house mb-1"></i>
                    <span>Home</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/series" class="nav-link text-white  d-flex flex-column">
                    <i class="fa-solid fa-clapperboard mb-1"></i>
                    <span>Film</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/movies" class="nav-link text-white  d-flex flex-column">
                    <i class="fa-solid fa-tv mb-1"></i>
                    <span>Serie</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/search" class="nav-link text-white  d-flex flex-column">
                    <i class="fa-solid fa-magnifying-glass mb-1"></i>
                    <span>Cerca</span>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.navbar {
    z-index: 999;
    background-color: black !important;

}

/* Posiziona la navbar in fondo alla pagina */
.navbar-fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}

.navbar-nav {
    width: 100%;
}

.nav-item {
    text-align: center;
}
</style>