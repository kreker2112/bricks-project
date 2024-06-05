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
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    FooterComponent,
  },
  setup() {
    const route = useRoute();
    const transitionName = ref("");

    watch(route, (newRoute, oldRoute) => {
      if (newRoute.name === "second-page" && oldRoute.name !== "second-page") {
        transitionName.value = "slide-right";
      } else {
        transitionName.value = "";
      }
    });

    return {
      transitionName,
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

.slide-right-enter-active,
.slide-right-leave-active {
  animation: slideRight 0.5s forwards;
}

@keyframes slideRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.slide-right-leave-active {
  animation: slideLeft 0.5s forwards;
}

@keyframes slideLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
