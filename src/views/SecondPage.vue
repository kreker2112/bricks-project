<!-- SecondPage.vue -->
<template>
  <div class="second-page-content">
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
import FormComponent from "../components/FormComponent.vue";
export default {
  components: {
    FormComponent,
  },
  name: "SecondPage",
};
</script>

<style scoped>
.page {
  width: 0 !important;
  height: 100%;
  flex-shrink: 0;
}
.second-page-content {
  height: 100%;
  opacity: 1; /* Замените на нужный вам цвет */
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
  height: 40%; /* Використання відсотків для відносної висоти */
}

.middle-row {
  display: flex;
  gap: 0;
  height: 35%; /* Використання відсотків для відносної висоти */
}

.lower-row {
  display: flex;
  gap: 0;
  height: 25%; /* Використання відсотків для відносної висоти */
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

.slide-right-enter-active {
  animation: slideRight 0.01s forwards;
}

@keyframes slideRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
