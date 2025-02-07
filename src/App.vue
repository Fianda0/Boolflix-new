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

  <router-view />

</template>

<style scoped></style>
