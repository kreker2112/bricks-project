<template>
  <div class="service-selection">
    <div class="service-selection__upper">
      <img
        class="grow_buisness-with-mosaic"
        src="../images/grow_buisness-with-mosaic.png"
        alt="grow_buisness"
      />
      <img
        class="business-arrow__down"
        src="../images/business-arrow__down.png"
        alt="business-arrow__down"
      />
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
      <div class="service-selection__lower--tree">
        <img
          class="business_up"
          src="../images/business_up.svg"
          alt="business_up"
        />
        <img
          class="business_up-arrow"
          src="../images/business_up-arrow.png"
          alt="business_up-arrow"
        />
        <img class="money" src="../images/money.png" alt="money" />
        <img
          class="money-arrow"
          src="../images/money-arrow.png"
          alt="money-arrow"
        />
        <img
          src="../images/small-tree.png"
          alt="small-tree"
          class="small-tree"
        />
        <img src="../images/coin.png" alt="coin" class="coin" />
      </div>
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

.grow_buisness-with-mosaic {
  position: absolute;
  left: 435px;
  top: 45px;
}

.business-arrow__down {
  position: absolute;
  left: 667px;
  top: 95px;
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
  position: relative;
  width: 78%;
  background-color: #ededed;
  background-image: url(../images/ground.png);
  background-repeat: no-repeat;
  background-position: bottom; /* Позиционирование фона внизу */
}

.business_up {
  position: absolute;
  left: 42px;
  top: 32px;
  width: 173px;
  height: 88px;
}

.business_up-arrow {
  position: absolute;
  left: 110px;
  top: 120px;
}

.money {
  position: absolute;
  right: 93px;
  top: 80px;
}

.money-arrow {
  position: absolute;
  top: 140px;
  right: 230px;
}

.small-tree {
  position: absolute;
  left: 196px;
  top: 180px;
}

.coin {
  position: absolute;
  left: 258px;
  top: 170px;
}

.service-selection__lower--cases {
  position: relative;
  width: 22%;
  background-image: url(../images/logos/cases.png);
  background-repeat: no-repeat;
  background-position: center 50px;
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
