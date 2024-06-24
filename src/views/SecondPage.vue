// SecondPage.vue
<template>
  <div class="second-page-content page">
    <div class="second-page">
      <div class="left-section">
        <div class="upper-row">
          <div class="upper-row--image_1"></div>
          <div class="upper-row--image_2"></div>
        </div>
        <div class="middle-row">
          <div class="middle-row--image_1"></div>
          <div class="middle-row--image_2"></div>
          <div class="middle-row--image_3"></div>
          <div class="middle-row--image_4"></div>
          <div class="middle-row--image_5"></div>
        </div>
        <div class="lower-row">
          <div class="lower-row--image_1"></div>
          <div class="lower-row--image_2"></div>
          <div class="lower-row--image_3"></div>
          <div class="lower-row--image_4"></div>
        </div>
      </div>
      <FormComponent />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormComponent from "../components/FormComponent.vue";
import { toRaw } from "vue";

export default {
  components: {
    FormComponent,
  },
  name: "SecondPage",
  computed: {
    ...mapGetters(["formData"]),
  },
  mounted() {
    const formData = toRaw(this.formData); // Преобразуем прокси в обычный объект
    console.log("SecondPage formData : ", formData);
  },
};
</script>

<style scoped>
.second-page-content {
  width: 100%;
  height: 100%;
  overflow-x: auto;
}

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
  height: 40%;
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

.upper-row--image_1 {
  height: 100%;
  width: 50%;
  background-color: #d9d9d9;
}

.upper-row--image_2 {
  height: 100%;
  width: 50%;
  background-color: #f3f3f3;
}

.middle-row--image_1 {
  height: 100%;
  width: 20%;
  background-color: #f3f3f3;
}
.middle-row--image_2 {
  height: 100%;
  width: 20%;
  background-color: #d9d9d9;
}
.middle-row--image_3 {
  height: 100%;
  width: 20%;
  background-color: #f3f3f3;
}
.middle-row--image_4 {
  height: 100%;
  width: 20%;
  background-color: #d9d9d9;
}
.middle-row--image_5 {
  height: 100%;
  width: 20%;
  background-color: #f3f3f3;
}

.lower-row--image_1 {
  height: 100%;
  width: 25%;
  background-color: #d9d9d9;
}
.lower-row--image_2 {
  height: 100%;
  width: 25%;
  background-color: #f3f3f3;
}
.lower-row--image_3 {
  height: 100%;
  width: 25%;
  background-color: #d9d9d9;
}
.lower-row--image_4 {
  height: 100%;
  width: 25%;
  background-color: #f3f3f3;
}

.left-section,
.form-component {
  flex: 1;
}
@media (max-width: 767px) {
  .second-page {
    width: 1710px;
    height: 932px;
    overflow-x: auto;
  }
}
</style>
