<!-- FirstPage.vue -->
<template>
  <div class="first-page">
    <div class="left-side">
      <FallingBricks />
    </div>
    <div class="right-side">
      <ServiceSelection />
    </div>
  </div>
</template>

<script>
import FallingBricks from "../components/FallingBricks.vue";
import ServiceSelection from "../components/ServiceSelection.vue";

export default {
  components: {
    FallingBricks,
    ServiceSelection,
  },
};
</script>

<style scoped>
.first-page {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.left-side {
  width: 60%;
  background-color: #002d6e;
  position: relative;
}

.right-side {
  width: 40%;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1200px) {
  .left-side,
  .right-side {
    width: 100%;
  }
  .first-page {
    flex-direction: column;
  }
}
.slide-right-enter-active {
  animation: slideRight 0.5s forwards;
}
</style>
