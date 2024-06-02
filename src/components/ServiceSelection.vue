<template>
  <div class="service-selection">
    <div class="service-selection__upper">
      <div class="funnel" @drop="onDrop" @dragover.prevent></div>
      <div class="checkboxes">
        <div v-for="service in selectedServices" :key="service">
          <input type="checkbox" :value="service" v-model="selectedServices" />
          {{ service }}
        </div>
      </div>
    </div>
    <div class="service-selection__lower">
      <div class="service-selection__lower--tree"></div>
      <div class="service-selection__lower--cases"></div>
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
  width: 22%;
}
.funnel {
  width: 397.2px;
  height: 397.2px;
  margin: 155px 0 16.8px;
}

.checkboxes {
  width: 289px;
  height: 249px;
  margin: 248px 44px 72px 407px;
}
</style>
