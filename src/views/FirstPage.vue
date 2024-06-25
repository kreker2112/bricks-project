<template>
  <div class="first-page-content page">
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
      this.$router.push("/second-page");
    },
  },
};
</script>

<style scoped>
.first-page-content {
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow-x: hidden;
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

@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 1366px) and (max-height: 1366px) {
  .first-page-content {
    flex-direction: column;
    gap: 0;
    height: 100vh;
  }

  .left-side {
    width: 100%;
    height: 31%;
  }

  .right-side {
    width: 100%;
    height: 69%;
  }
}

@media only screen and (min-width: 820px) and (max-width: 820px) and (min-height: 1180px) and (max-height: 1180px) {
  .first-page-content {
    flex-direction: column;
    gap: 0;
    height: 100vh;
  }

  .left-side {
    width: 100%;
    height: 31%;
  }

  .right-side {
    width: 100%;
    height: 69%;
  }
}

@media only screen and (min-width: 768px) and (max-width: 768px) and (max-height: 1024px) and (min-height: 1024px) {
  .first-page-content {
    flex-direction: column;
    gap: 0;
    height: 100vh;
  }

  .left-side {
    width: 100%;
    height: 31%;
  }

  .right-side {
    width: 100%;
    height: 69%;
  }
}

@media (max-width: 767px) {
  .first-page-content {
    flex-direction: column;
    gap: 0;
    height: 100vh; /* Ensure full height */
    overflow-y: auto;
  }
  .left-side {
    width: 100%;
    height: 31%;
  }
  .right-side {
    width: 100%;
    height: 69%;
  }
}
</style>
