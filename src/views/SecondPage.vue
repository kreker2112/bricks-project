<template>
  <div class="second-page">
    <div class="left-section">
      <div class="upper-row">
        <div class="image" v-for="i in 2" :key="i"></div>
      </div>
      <div class="lower-row">
        <div class="image" v-for="i in 4" :key="i"></div>
      </div>
    </div>
    <FormComponent />
  </div>
</template>

<script>
import FormComponent from "../components/FormComponent.vue";

export default {
  components: {
    FormComponent,
  },
};
</script>

<style scoped>
.second-page {
  display: flex;
  flex-direction: row;
  width: 2419px;
  height: 1080px;
}

.left-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.upper-row {
  display: flex;
  height: 374px;
}

.lower-row {
  display: flex;
  height: 342px;
}

.image {
  flex: 1;
  background-color: #ccc;
  margin: 10px;
}
</style>
