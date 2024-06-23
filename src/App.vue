<template>
  <div id="app">
    <div class="page-container">
      <router-view v-slot="{ Component }">
        <transition
          :name="initialLoad ? '' : 'slide-left'"
          @after-enter="afterEnter"
        >
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";
import { ref } from "vue";

export default {
  components: {
    FooterComponent,
  },
  setup() {
    const initialLoad = ref(true);

    const afterEnter = () => {
      if (initialLoad.value) {
        initialLoad.value = false;
      }
    };

    return {
      initialLoad,
      afterEnter,
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

.page-container {
  width: 100vw;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.page {
  height: 100%;
  width: 100vw;
  position: absolute;
  transition: all 1s;
  overflow-y: auto;
  overflow-x: hidden;
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
@media (max-width: 767px) {
  .page-container {
    width: 100% !important;
    height: 932px !important;
    overflow-y: auto !important;
  }
}
</style>
