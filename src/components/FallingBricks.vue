<template>
  <div class="falling-bricks" @drop="onDrop" @dragover.prevent>
    <div
      v-for="(service, index) in services"
      :key="index"
      class="brick"
      :style="getBrickStyle(service)"
      draggable="true"
      @dragstart="onDragStart(service)"
    >
      {{ service }}
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

    const getBrickStyle = (service) => {
      return {
        width: `${service.length * 20}px`,
        height: "50px",
        margin: "10px",
        padding: "23px 38px",
        borderRadius: "16px",
        fontSize: "20px",
        backgroundColor: "#0074d9",
        color: "white",
        position: "absolute",
        top: `${Math.random() * 500}px`,
        left: `${Math.random() * 500}px`,
      };
    };

    const onDragStart = (service) => {
      event.dataTransfer.setData("service", service);
    };

    const onDrop = () => {
      // handle drop logic
    };

    return {
      services,
      getBrickStyle,
      onDragStart,
      onDrop,
    };
  },
};
</script>

<style scoped>
.falling-bricks {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #002d6e;
}

.brick {
  position: absolute;
}
</style>
