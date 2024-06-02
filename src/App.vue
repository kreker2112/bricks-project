<template>
  <div id="app">
    <div class="main-content">
      <router-view />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";

export default {
  components: {
    FooterComponent,
  },
};
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
}

.footer {
  flex-shrink: 0; /* Ensures footer does not shrink and occupies fixed space */
}
</style>
