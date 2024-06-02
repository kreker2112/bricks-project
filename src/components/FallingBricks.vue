<template>
  <div class="falling-bricks" @drop="onDrop" @dragover.prevent>
    <a href="#">
      <img
        class="bricks-frame"
        src="../images/logos/bricks-frame.png"
        alt="bricks-frame"
      />
    </a>
    <img class="ideas" src="../images/logos/ideas.png" alt="ideas" />

    <div class="center-content">
      <img
        class="instruments"
        src="../images/logos/instruments.png"
        alt="instruments"
      />
      <img
        src="../images/logos/instruments-arrow.png"
        alt="instruments-arrow"
        class="instruments__arrow"
      />
      <img class="add" src="../images/logos/add.png" alt="add" />
      <img
        src="../images/logos/add-arrow.png"
        alt="add-arrow"
        class="add-arrow"
      />
    </div>

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

    const onDragStart = (event, service) => {
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
  background-image: url(../images/logos/logo.png);
  background-repeat: no-repeat;
  background-position: center 220px;
  background-size: auto;
}

.bricks-frame {
  margin-left: 18px;
  margin-top: 19px;
}

.ideas {
  width: 100%;
  margin-top: 335px;
  color: #ffffff;
  z-index: 1;
}

.center-content {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.instruments,
.add {
  pointer-events: auto; /* Чтобы изображения снова могли быть интерактивными */
}

.instruments {
  position: absolute;
  top: 555px;
  left: 105px;
  width: 335px;
  z-index: 2;
}

.instruments__arrow {
  position: absolute;
  top: 605px;
  left: 450px;
}

.add {
  position: absolute;
  width: 227px;
  top: 538px;
  right: 202px;
  z-index: 2;
}

.add-arrow {
  position: absolute;
  top: 485px;
  right: 79px;
}

.brick {
  z-index: 3;
  position: absolute;
}
</style>
