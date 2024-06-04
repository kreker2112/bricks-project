<template>
  <div id="app">
    <div class="main-content">
      <transition name="slide-right" mode="out-in">
        <router-view />
      </transition>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    FooterComponent,
  },
  setup() {
    const route = useRoute();
    const activeRouteName = ref(route.name);

    watch(route, (newRoute) => {
      activeRouteName.value = newRoute.name;
    });

    return {
      activeRouteName,
    };
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
  overflow-x: hidden;
  overflow-y: hidden;
  scroll-behavior: smooth;
}

.app-container {
  display: flex;
  width: 200vw; /* 100vw для каждой страницы */
  height: 100%;
}

.view {
  width: 100vw;
  height: 100%;
}

.footer {
  flex-shrink: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  animation: slideRight 0.5s forwards;
}
</style>
