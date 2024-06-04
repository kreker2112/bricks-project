<template>
  <div class="falling-bricks" ref="container">
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
      class="brick"
      v-for="(brick, index) in bricks"
      :key="index"
      :style="brick.style"
      @dragstart="onDragStart($event, brick.service)"
      draggable="true"
    >
      {{ brick.service }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const container = ref(null);
    const footerHeight = 80;
    const bricks = ref([
      { service: "Контекст", style: {} },
      { service: "Ідеї", style: {} },
      { service: "Концепції", style: {} },
      { service: "Брендування", style: {} },
      { service: "SMM", style: {} },
      { service: "Аудит", style: {} },
      { service: "Маркетинг", style: {} },
      { service: "Стратегії", style: {} },
      { service: "Інтеграції", style: {} },
      { service: "Просування", style: {} },
      { service: "Дизайн", style: {} },
      { service: "Логотип", style: {} },
      { service: "Неймінг", style: {} },
      { service: "SEO", style: {} },
      { service: "Розсилки", style: {} },
      { service: "Партнерство", style: {} },
      { service: "TV", style: {} },
      { service: "Позиціонування", style: {} },
    ]);

    const onDragStart = (event, service) => {
      event.dataTransfer.setData("service", service);
    };

    const setBrickStyles = () => {
      const positions = [
        {
          width: 180,
          height: 70,
          bottom: 265,
          left: "82%",
          rotation: -8.07,
          color: "#ff6400",
        },
        {
          width: 121,
          height: 70,
          bottom: 290,
          left: "31%",
          rotation: -6.07,
          color: "#ffffff",
        },
        {
          width: 201,
          height: 70,
          bottom: 215,
          left: "25px",
          rotation: -8.22,
          color: "#ff6400",
        },
        {
          width: 246,
          height: 70,
          bottom: 72,
          left: "35px",
          rotation: 39.57,
          color: "#ffffff",
        },
        {
          width: 128,
          height: 70,
          bottom: 220,
          left: "25%",
          rotation: 11.1,
          color: "#ff6400",
        },
        {
          width: 153,
          height: 70,
          bottom: 152,
          left: "13%",
          rotation: -2.76,
          color: "#d8d8d8",
        },
        {
          width: 213,
          height: 70,
          bottom: 45,
          left: "20%",
          rotation: 25.45,
          color: "#ff6400",
        },
        {
          width: 186,
          height: 70,
          bottom: 140,
          left: "27%",
          rotation: -10.7,
          color: "#d8d8d8",
        },
        {
          width: 199,
          height: 70,
          bottom: 42,
          left: "36%",
          rotation: 25.63,
          color: "#d8d8d8",
        },
        {
          width: 232,
          height: 70,
          bottom: 193,
          left: "40%",
          rotation: 20.08,
          color: "#ff6400",
        },
        {
          width: 172,
          height: 70,
          bottom: 85,
          left: "52%",
          rotation: -8.95,
          color: "#ffffff",
        },
        {
          width: 182,
          height: 70,
          bottom: 285,
          left: "50%",
          rotation: -25.14,
          color: "#d8d8d8",
        },
        {
          width: 177,
          height: 70,
          bottom: 247,
          left: "63%",
          rotation: -3.94,
          color: "#d8d8d8",
        },
        {
          width: 120,
          height: 70,
          bottom: 159,
          left: "63%",
          rotation: 17.88,
          color: "#d8d8d8",
        },
        {
          width: 199,
          height: 70,
          bottom: 50,
          left: "62%",
          rotation: -33.74,
          color: "#ff6400",
        },
        {
          width: 235,
          height: 70,
          bottom: 155,
          left: "77.5%",
          rotation: 26.68,
          color: "#ff6400",
        },
        {
          width: 105,
          height: 65,
          bottom: 92,
          left: "79%",
          rotation: 6.99,
          color: "#d9d9d9",
        },
        {
          width: 280,
          height: 70,
          bottom: 15,
          left: "calc(65% + 100px)",
          rotation: -5.73,
          color: "#ffffff",
        },
      ];

      bricks.value.forEach((brick, index) => {
        const pos = positions[index];
        brick.style = {
          width: `${pos.width}px`,
          height: `${pos.height}px`,
          left: `calc(${pos.left} + 15px)`,
          transform: `rotate(${pos.rotation}deg)`,
          backgroundColor: pos.color,
          color: "#002d6e",
          borderRadius: "16px",
          fontStyle: "Montserrat",
          fontSize: "25px",
          fontWeight: "bold",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "0",
          transition: "top 1s ease-in-out",
          top: `-${pos.height}px`,
        };

        setTimeout(
          () => {
            brick.style.top = `calc(100vh - ${pos.bottom + footerHeight}px - ${pos.height}px)`;
          },
          100 * (index + 1),
        );
      });
    };

    onMounted(() => {
      setBrickStyles();
    });

    return {
      container,
      bricks,
      onDragStart,
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
  overflow: hidden;
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
  pointer-events: auto;
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
}

.add-arrow {
  position: absolute;
  top: 485px;
  right: 79px;
}

.brick {
  z-index: 0 !important;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
