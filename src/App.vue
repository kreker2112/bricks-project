<template>
  <div id="app">
    <div class="page-container" ref="pageContainer">
      <div class="page first-page" :style="pageStyle('first-page')">
        <transition name="slide-left" mode="out-in">
          <router-view v-if="$route.name === 'first-page'" />
        </transition>
      </div>
      <div class="page second-page" :style="pageStyle('second-page')">
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
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  components: {
    FooterComponent,
  },
  setup() {
    const route = useRoute();

    const isSecondPage = computed(() => route.name === "second-page");

    const pageStyle = (pageName) => {
      if (isSecondPage.value && pageName === "second-page") {
        return {
          width: "100vw",
        };
      } else if (isSecondPage.value && pageName === "first-page") {
        return {
          width: "0",
        };
      } else {
        return {
          width: "100vw",
        };
      }
    };

    return {
      isSecondPage,
      pageStyle,
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
  display: flex;
  flex-direction: row;
  width: 200vw; /* 100vw для каждой страницы */
  height: 100%;
  overflow: hidden;
}

.page {
  height: 100%;
  flex-shrink: 0;
  transition: width 0.5s;
}

.first-page {
  opacity: 1; /* Пример цвета для первой страницы */
}

.second-page {
  opacity: 1; /* Пример цвета для второй страницы */
}

/* .slide-left-enter-active,
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
} */
</style>
