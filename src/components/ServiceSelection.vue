<template>
  <div class="service-selection">
    <div class="service-selection__upper">
      <div class="instruction-container">
        <div class="instruction-service__container">
          <img
            src="../images/logos/instruction-service/service-arrow.png"
            alt="service-arrow"
            class="service-arrow"
          />
          <img
            src="../images/logos/instruction-service/service-container.png"
            alt="service-container"
            class="service-container"
          />
          <img
            src="../images/logos/instruction-service/service.png"
            alt="service"
            class="service"
          />
        </div>
        <img
          src="../images/logos/instruction-funnel.png"
          alt="instruction-funnel"
          class="instruction-funnel"
        />
        <img
          src="../images/logos/instruction-funnel__active.png"
          alt="instruction-funnel__active"
          class="instruction-funnel__active"
        />
        <img
          src="../images/logos/instruction-tree.png"
          alt="instruction-tree"
          class="instruction-tree"
        />
      </div>
      <div class="funnel-container">
        <img
          class="funnel-image"
          src="../images/logos/funnel.png"
          alt="funnel"
          @drop="onDrop"
          @dragover.prevent
        />
        <img
          class="funnel-mozaic__logo"
          src="../images/logos/funnel-mozaic__logo.png"
          alt="funnel mozaic logo"
        />
      </div>
      <div class="checkboxes-container">
        <form class="checkboxes">
          <div
            v-for="(service, index) in services"
            :key="service"
            :class="[
              'checkbox-item',
              { checked: selectedServices.includes(service) },
            ]"
          >
            <input
              :id="'service-' + index"
              :name="'service-' + index"
              type="checkbox"
              :value="service"
              v-model="selectedServices"
            />
            <label :for="'service-' + index">{{ service }}</label>
          </div>
        </form>
      </div>
    </div>
    <div class="service-selection__lower">
      <div class="service-selection__lower--tree"></div>
      <div class="service-selection__lower--cases">
        <img
          class="cases-arrow"
          src="../images/logos/cases-arrow.png"
          alt="cases-arrow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const services = ref([
      "Позиціонування",
      "Брендування",
      "Партнерство",
      "Просування",
      "Маркетинг",
      "Концепції",
      "Інтеграції",
      "Стратегії",
      "Логотип",
      "Дизайн",
      "Контекст",
      "Аудит",
      "Неймінг",
      "Ідеї",
      "SMM",
      "TV",
      "SEO",
    ]);

    const selectedServices = ref([]);

    const onDrop = (event) => {
      const service = event.dataTransfer.getData("service");
      if (!selectedServices.value.includes(service)) {
        selectedServices.value.push(service);
      }
    };

    return {
      services,
      selectedServices,
      onDrop,
    };
  },
};
</script>

<style scoped>
.service-selection {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.service-selection__upper {
  position: relative;
  background-color: #828282;
  width: 100%;
  height: 60%;
  position: relative;
}

.instruction-container {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  left: 24px;
  top: 25px;
  width: 337px;
  height: 140px;
  border-radius: 16px;
  background-color: #ffffff;
}

.instruction-funnel {
  margin-top: 35px;
}

.service-arrow {
  position: absolute;
  bottom: 15px;
  left: 55px;
}

.service-container {
  position: absolute;
  bottom: 20px;
  left: 74px;
}

.service {
  position: absolute;
  bottom: 24px;
  left: 84px;
}

.instruction-service__container {
  position: relative;
}

.service-selection__lower {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40%;
}

.service-selection__lower--tree {
  width: 78%;
  background-color: #ededed;
  background-image: url(../images/ground.png);
  background-repeat: no-repeat;
  background-position: bottom; /* Позиционирование фона внизу */
  background-size: cover; /* Масштабирование фона по всей ширине */
}

.service-selection__lower--cases {
  position: relative;
  width: 22%;
  background-image: url(../images/logos/cases.png);
  background-repeat: no-repeat;
  background-position: center 20px;
  /* background-size: cover; */
}

.cases-arrow {
  position: absolute;
  top: 10px;
  left: 70px;
}

.funnel-container {
  position: absolute;
  top: 155px;
  right: 0;
  width: 350px;
  height: auto;
  z-index: 0;
}

.funnel-image {
  cursor: pointer;
  width: 100%;
  z-index: 2;
}

.funnel-mozaic__logo {
  position: absolute;
  width: 125px;
  top: 50%;
  left: 51%;
  transform: translate(-30%, 140%);
  z-index: 1;
  pointer-events: none;
}

.checkboxes-container {
  position: absolute;
  left: 43px;
  bottom: 74px;
  width: 282px;
  height: 249px;
}

.checkboxes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 14px;
  color: #9e9e9e;
}

.checkbox-item.checked {
  color: #ffffff;
}

.checkbox-item input {
  margin-right: 10px;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid #9e9e9e;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
}

.checkbox-item input:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-image: url("../images/logos/check-icon.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
}
</style>
