<template>
  <div class="falling-bricks" ref="container" @drop="onDrop" @dragover.prevent>
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
      :style="getBrickStyle(index)"
      draggable="true"
      @dragstart="(event) => onDragStart(event, service)"
    >
      {{ service }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

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

    const colors = ["#D8D8D8", "#FF6400", "#FFFFFF"];
    const positions = ref([]);
    const container = ref(null);
    const isFalling = ref(Array(services.value.length).fill(false));
    const delay = 300; // задержка в миллисекундах между падением кирпичей
    const gap = 1; // промежуток между кирпичами

    const containerDimensions = ref({ width: 0, height: 0 });

    onMounted(() => {
      containerDimensions.value = {
        width: container.value.clientWidth,
        height: container.value.clientHeight,
      };
      calculatePositions();
      services.value.forEach((_, index) => {
        setTimeout(() => {
          isFalling.value[index] = true;
        }, index * delay);
      });
    });

    const calculatePositions = () => {
      positions.value = services.value.map((service, index) => {
        const width = service.length * 16 + 50; // Уменьшенные размеры
        const height = 100; // Уменьшенные размеры
        return getDistributedPosition(width, height, index);
      });
    };

    const getDistributedPosition = (width, height, index) => {
      const leftPosition =
        (containerDimensions.value.width / services.value.length) * index;
      let topPosition = containerDimensions.value.height - height; // Начальная позиция у нижней границы

      // Проверка на пересечение с другими кирпичами и добавление промежутка в 1 пиксель
      while (
        positions.value.some(
          (pos) =>
            Math.abs(pos.left - leftPosition) < width + gap &&
            Math.abs(pos.top - topPosition) < height + gap,
        )
      ) {
        topPosition -= height + gap; // Смещаем вверх, если пересекается
      }

      return {
        top: topPosition,
        left: leftPosition,
        angle: Math.random() * 30 - 15,
      };
    };

    const getBrickStyle = (index) => {
      const position = positions.value[index];
      if (!position) return {};
      return {
        width: `${services.value[index].length * 16 + 50}px`, // Уменьшенные размеры
        height: "100px", // Уменьшенные размеры
        margin: "5px",
        padding: "20px 30px",
        borderRadius: "8px",
        fontSize: "28px", // Уменьшенный размер шрифта
        backgroundColor: colors[index % colors.length],
        color: "black",
        position: "absolute",
        top: isFalling.value[index] ? `${position.top}px` : `-150px`, // Начальная позиция выше контейнера и целевая позиция у нижней границы
        left: `${position.left}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `rotate(${position.angle}deg)`, // Поворот кирпича
        transition: `top 2s ease-in-out`, // Падение с задержкой
      };
    };

    const onDragStart = (event, service) => {
      event.dataTransfer.setData("service", service);
    };

    const onDrop = () => {
      // обработка drop события
    };

    return {
      services,
      container,
      getBrickStyle,
      onDragStart,
      onDrop,
      isFalling,
    };
  },
};
</script>

<style scoped>
.falling-bricks {
  position: relative;
  width: 100%;
  height: 100%; /* Высота 100% от высоты родительского контейнера */
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
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
