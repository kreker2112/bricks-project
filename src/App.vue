<template>
  <div id="app">
    <div class="page-container">
      <transition name="slide-left" mode="">
        <router-view :key="$route.fullPath" />
      </transition>
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

.page-container {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.page {
  height: 100%;
  width: 100vw;
  position: absolute;
  transition: all 1s;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 1s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
