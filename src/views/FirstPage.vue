<template>
  <div class="first-page-content" ref="firstPage">
    <div class="left-side">
      <FallingBricks />
    </div>
    <div class="right-side">
      <ServiceSelection @apply-selection="handleApplySelection" />
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
  methods: {
    handleApplySelection() {
      this.$refs.firstPage.classList.add("slide-left-leave-active");
      setTimeout(() => {
        this.$router.push("/second-page");
      }, 500); // Длительность анимации в миллисекундах
    },
  },
};
</script>

<style scoped>
.first-page-content {
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
  .first-page-content {
    flex-direction: column;
  }
}
</style>
