<template>
  <div class="service-selection">
    <div class="funnel" @drop="onDrop" @dragover.prevent></div>
    <div class="checkboxes">
      <div v-for="service in selectedServices" :key="service">
        <input type="checkbox" :value="service" v-model="selectedServices" />
        {{ service }}
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
  align-items: center;
}

.funnel {
  width: 397.2px;
  height: 397.2px;
  background-color: #ccc;
  margin: 155px 0 16.8px;
}

.checkboxes {
  width: 289px;
  height: 249px;
  margin: 248px 44px 72px 407px;
}
</style>
