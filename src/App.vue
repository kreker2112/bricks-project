<template>
  <div class="app">
    <FirstPage />
    <SecondPage />
    <FooterComponent />
  </div>
</template>

<script>
import FirstPage from "./views/FirstPage.vue";
import SecondPage from "./views/SecondPage.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  components: {
    FirstPage,
    SecondPage,
    FooterComponent,
  },
};
</script>

<style>
.app {
  display: flex;
  flex-direction: row;
  width: 4281px;
  height: 1080px;
}
</style>
