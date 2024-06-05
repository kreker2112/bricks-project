<!-- App.vue -->
<template>
  <div id="app">
    <div class="page-container" ref="pageContainer">
      <div class="page first-page">
        <transition name="slide-left" mode="out-in">
          <router-view v-if="$route.name === 'first-page'" />
        </transition>
      </div>
      <div class="page second-page">
        <transition name="slide-left" mode="out-in">
          <router-view v-if="$route.name === 'second-page'" />
        </transition>
      </div>
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
  display: flex;
  flex-direction: row;
  width: 200vw; /* 100vw для каждой страницы */
  height: 100%;
  overflow: hidden;
}

.page {
  width: 100vw;
  height: 100%;
  flex-shrink: 0;
}

.first-page {
  opacity: 1; /* Пример цвета для первой страницы */
}

.second-page {
  opacity: 1; /* Пример цвета для второй страницы */
}

.slide-left-enter-active,
.slide-left-leave-active {
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
