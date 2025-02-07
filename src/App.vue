<script>
import AppHeader from './components/AppHeader.vue';
import AppHeaderMobile from './components/AppHeaderMobile.vue';

export default {
  components: {
    AppHeader,
    AppHeaderMobile
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
  }
}
</script>

<template>
  <AppHeader class="d-none d-lg-block" />

  <AppHeaderMobile class="d-lg-none" />

  <main>
    <router-view />
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
