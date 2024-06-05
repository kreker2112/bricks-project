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
</style>
