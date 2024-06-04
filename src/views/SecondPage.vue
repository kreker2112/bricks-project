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
  width: 200vw; /* Увеличиваем ширину для горизонтальной прокрутки */
  height: 100%;
}

.left-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50vw; /* Соответственно ширина секций уменьшена до половины экрана */
}

.upper-row,
.middle-row,
.lower-row {
  display: flex;
  gap: 0;
}

.image {
  flex: 1;
  background-color: #ccc;
  margin: 1px;
  border: 2px #ccc;
}

.left-section,
.form-component {
  flex: 1;
}
</style>
