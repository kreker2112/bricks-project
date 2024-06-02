<template>
  <div class="service-selection">
    <div class="service-selection__upper">
      <div class="instruction-container"></div>
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

      <div class="checkboxes">
        <div v-for="service in selectedServices" :key="service">
          <input type="checkbox" :value="service" v-model="selectedServices" />
          {{ service }}
        </div>
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
    const selectedServices = ref([]);

    const onDrop = (event) => {
      const service = event.dataTransfer.getData("service");
      if (!selectedServices.value.includes(service)) {
        selectedServices.value.push(service);
      }
    };

    return {
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
  background-color: #828282;
  width: 100%;
  height: 60%;
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
}

.service-selection__lower--cases {
  position: relative;
  width: 22%;
  background-image: url(../images/logos/cases.png);
  background-repeat: no-repeat;
  background-position: center 45px;
  background-size: auto;
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

.checkboxes {
  width: 289px;
  height: 249px;
  margin: 248px 44px 72px 407px;
}
</style>
