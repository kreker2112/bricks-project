<template>
  <div class="second-page">
    <div class="left-section">
      <div class="upper-row">
        <div class="image" v-for="i in 2" :key="i"></div>
      </div>
      <div class="middle-row">
        <div class="image" v-for="i in 5" :key="i"></div>
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
  width: 100vw;
  height: 100%;
}

.left-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
}

.upper-row {
  display: flex;
  gap: 0;
  height: 39%;
}

.middle-row {
  display: flex;
  gap: 0;
  height: 35%;
}

.lower-row {
  display: flex;
  gap: 0;
  height: 25%;
}

.image {
  flex: 1;
  background-color: #ccc;
  margin: 1px;
  border: 2px #ccc;
}
</style>
