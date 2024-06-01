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
  width: 1862px;
  height: 1080px;
}

.left-side {
  width: 1129px;
  height: 959px;
  background-color: #002d6e;
  position: relative;
}

.right-side {
  width: 733px;
  height: 959px;
  display: flex;
  flex-direction: column;
}

.right-side > div {
  margin-bottom: 20px;
}

.funnel {
  width: 397.2px;
  height: 397.2px;
  margin: 155px 0 16.8px 336px;
}

.checkboxes {
  width: 289px;
  height: 249px;
  margin: 248px 44px 72px 407px;
}
</style>
