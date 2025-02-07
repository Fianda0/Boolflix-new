<script>
export default {
    name: 'AppHeader'
}

</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark flex-column vh-100 p-3">
        <!-- Logo Netflix -->
        <RouterLink to="/" class="navbar-brand text-center mb-4">
            <span class="text-danger fs-2 fw-bold">B</span>oolflix
        </RouterLink>

        <!-- Menu di navigazione verticale -->
        <ul class="navbar-nav flex-column w-100">
            <li class="nav-item">
                <RouterLink to="/search" class="nav-link text-white">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/" class="nav-link text-white">
                    <span>Home</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/series" class="nav-link text-white">
                    <span>Film</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/movies" class="nav-link text-white">
                    <span>Serie</span>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
/* Barra laterale verticale */
.navbar {
    width: 150px;
    background-color: black !important;
    /* Colore di sfondo scuro come Netflix */
    height: 100vh;
    /* Altezza che occupa tutta la schermata */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

/* Logo personalizzato */
.navbar-brand {
    font-size: 30px;
    font-weight: bold;
    color: red !important;
}

/* Stile per i link di navigazione */
.nav-link {
    font-size: 16px;
    padding: 15px;
    transition: color 0.3s ease;
}

/* Hover per i link */
.nav-link:hover {
    background-color: rgba(255, 0, 0, 0.7);
    /* Colore rosso quando hover */
    color: white;
}

/* Spaziatura tra i link */
.nav-item+.nav-item {
    margin-top: 15px;
}

a {
    border-radius: 10px;
}
</style>