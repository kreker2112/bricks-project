<template>
  <div id="app">
    <div class="main-content">
      <transition-group name="slide" tag="div" class="app-container">
        <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.path" class="view" />
        </router-view>
      </transition-group>
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

/* Добавляем стили для анимации */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter, .slide-leave-to /* .slide-leave-active в версиях до 2.1.8 */ {
  transform: translateX(100%);
}
</style>
