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

    <canvas ref="backgroundCanvas" class="background-canvas"></canvas>
    <canvas ref="bricksCanvas" class="bricks-canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  Engine,
  Render,
  World,
  Bodies,
  Body,
  Mouse,
  MouseConstraint,
  Events,
  Composite,
} from "matter-js";

export default {
  setup() {
    const container = ref(null);
    const backgroundCanvas = ref(null);
    const bricksCanvas = ref(null);
    const engine = ref(null);
    const renderBackground = ref(null);
    const renderBricks = ref(null);

    const bricks = ref([
      { service: "Контекст" },
      { service: "Ідеї" },
      { service: "Концепції" },
      { service: "Брендування" },
      { service: "SMM" },
      { service: "Аудит" },
      { service: "Маркетинг" },
      { service: "Стратегії" },
      { service: "Інтеграції" },
      { service: "Просування" },
      { service: "Дизайн" },
      { service: "Логотип" },
      { service: "Неймінг" },
      { service: "SEO" },
      { service: "Розсилки" },
      { service: "Партнерство" },
      { service: "TV" },
      { service: "Позиціонування" },
    ]);

    const funnelArea = { x: 800, y: 500, width: 200, height: 200 }; // Примерные координаты лейки, замените на реальные значения

    const addServiceOnHover = (service) => {
      console.log("Service added to funnel:", service);
      // Логика для добавления сервиса в список выбранных
    };

    const updateCanvasSize = () => {
      const width = container.value.clientWidth;
      const height = container.value.clientHeight;

      renderBackground.value.options.width = width;
      renderBackground.value.options.height = height;

      renderBackground.value.canvas.width = width;
      renderBackground.value.canvas.height = height;

      renderBackground.value.bounds.max.x = width;
      renderBackground.value.bounds.max.y = height;

      renderBricks.value.options.width = width;
      renderBricks.value.options.height = height;

      renderBricks.value.canvas.width = width;
      renderBricks.value.canvas.height = height;

      renderBricks.value.bounds.max.x = width;
      renderBricks.value.bounds.max.y = height;

      Render.lookAt(renderBackground.value, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height },
      });

      Render.lookAt(renderBricks.value, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height },
      });

      World.clear(engine.value.world);
      Engine.clear(engine.value);

      // Создание статических объектов (границы блока)
      const ground = Bodies.rectangle(width / 2, height + 5, width, 10, {
        isStatic: true,
        restitution: 0.8, // настройка упругости
        friction: 0.5, // настройка трения
      });
      const leftWall = Bodies.rectangle(1, height / 2, 2, height, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.5,
      });
      const rightWall = Bodies.rectangle(width + 5, height / 2, 10, height, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.5,
      });
      const ceiling = Bodies.rectangle(width / 2, -5, width, 10, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.5,
      });

      // Создание кирпичей
      const brickBodies = bricks.value.map((brick) => {
        const context = renderBricks.value.context;
        context.font = "25px Montserrat";
        const textWidth = context.measureText(brick.service).width + 20;
        const brickWidth = Math.max(180, textWidth);
        const brickHeight = 70;
        const x = Math.random() * (width - brickWidth) + brickWidth / 2;
        const y = Math.random() * (height - brickHeight) + brickHeight / 2;
        const body = Bodies.rectangle(x, y, brickWidth, brickHeight, {
          render: {
            fillStyle: "#ff6400",
            strokeStyle: "#000000",
            lineWidth: 3,
          },
          chamfer: { radius: 15 },
          label: brick.service,
          restitution: 0.8,
          friction: 0.5,
        });
        Body.rotate(body, Math.random() * Math.PI);
        return body;
      });

      // Добавление объектов в мир
      World.add(engine.value.world, [
        ground,
        leftWall,
        rightWall,
        ceiling,
        ...brickBodies,
      ]);

      // Создание мыши и ее ограничений
      const mouse = Mouse.create(renderBricks.value.canvas);
      const mouseConstraint = MouseConstraint.create(engine.value, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });
      World.add(engine.value.world, mouseConstraint);

      renderBricks.value.mouse = mouse;

      // Обработка событий мыши
      Events.on(mouseConstraint, "mousedown", (event) => {
        const { body } = event;
        if (body) {
          console.log("Dragging:", body.label);
        }
      });

      // Логика обработки дропа в лейку
      Events.on(mouseConstraint, "enddrag", (event) => {
        const { body } = event;
        if (body) {
          const { position } = body;
          if (
            position.x > funnelArea.x &&
            position.x < funnelArea.x + funnelArea.width &&
            position.y > funnelArea.y &&
            position.y < funnelArea.y + funnelArea.height
          ) {
            console.log("Dropped into the funnel:", body.label);
            addServiceOnHover(body.label);
            World.remove(engine.value.world, body);
          } else {
            // Возвращаем кирпич в границы канваса, если он был отпущен за его пределами
            Body.setPosition(body, {
              x: Math.max(0, Math.min(width, body.position.x)),
              y: Math.max(0, Math.min(height, body.position.y)),
            });
          }
        }
      });

      // Ограничение скорости для предотвращения вылета кирпичей
      Events.on(engine.value, "beforeUpdate", () => {
        const allBodies = Composite.allBodies(engine.value.world);
        allBodies.forEach((body) => {
          const maxSpeed = 10;
          const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
          if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            Body.setVelocity(body, {
              x: body.velocity.x * scale,
              y: body.velocity.y * scale,
            });
          }
        });
      });

      // Добавление текста поверх кирпичей
      Events.on(renderBricks.value, "afterRender", () => {
        const context = renderBricks.value.context;
        const allBodies = Composite.allBodies(engine.value.world);
        context.font = "25px Montserrat";
        context.fillStyle = "#002d6e";
        context.textAlign = "center";
        context.textBaseline = "middle";

        allBodies.forEach((body) => {
          if (body.label && !body.isStatic) {
            const { x, y } = body.position;
            context.save();
            context.translate(x, y);
            context.rotate(body.angle);
            context.fillText(body.label, 0, 0);
            context.restore();
          }
        });
      });
    };

    onMounted(() => {
      // Создание физического движка
      engine.value = Engine.create();

      // Создание рендерера для фона
      renderBackground.value = Render.create({
        element: container.value,
        canvas: backgroundCanvas.value,
        engine: engine.value,
        options: {
          width: container.value.clientWidth,
          height: container.value.clientHeight,
          wireframes: false,
          background: "transparent",
        },
      });

      // Создание рендерера для кирпичей
      renderBricks.value = Render.create({
        element: container.value,
        canvas: bricksCanvas.value,
        engine: engine.value,
        options: {
          width: container.value.clientWidth,
          height: container.value.clientHeight,
          wireframes: false,
          background: "transparent",
        },
      });

      // Запуск движка и рендереров
      Engine.run(engine.value);
      Render.run(renderBackground.value);
      Render.run(renderBricks.value);

      updateCanvasSize();

      // Обработка изменения размера окна
      window.addEventListener("resize", updateCanvasSize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateCanvasSize);
      Render.stop(renderBackground.value);
      Render.stop(renderBricks.value);
      World.clear(engine.value.world);
      Engine.clear(engine.value);
    });

    return {
      container,
      backgroundCanvas,
      bricksCanvas,
      bricks,
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

.background-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
}

.bricks-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 60;
  width: 100%;
  height: 100%;
}

.bricks-frame {
  margin-left: 18px;
  margin-top: 19px;
}

.ideas {
  width: 100%;
  margin-top: 335px;
  color: #ffffff;
  z-index: 30;
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
  z-index: 30;
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
  z-index: 30;
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
  z-index: 60 !important;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 15px;
}
</style>
