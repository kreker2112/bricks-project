<template>
  <div class="falling-bricks" ref="container">
    <a href="#">
      <img
        class="bricks-frame"
        src="../images/logos/bricks-frame.png"
        alt="bricks-frame"
      />
    </a>

    <div class="services-block" @drop="handleDrop" @dragover.prevent></div>

    <img class="mosaic-logo" src="../images/logos/logo.png" alt="mosaic-logo" />

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
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
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

      World.clear(engine.value.world);
      Engine.clear(engine.value);

      const ground = Bodies.rectangle(width / 2, height + 5, width, 10, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.5,
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

      const colors = ["#ff6400", "#d8d8d8", "#d9d9d9", "#ffffff"];

      const brickBodies = bricks.value.map((brick, index) => {
        const context = renderBricks.value.context;
        const fontSize = 1.8 * (width / 100); // Установите размер шрифта относительно ширины окна (1.8vw)
        context.font = `${fontSize}px Montserrat Bold`;
        const textWidth = context.measureText(brick.service).width;
        const padding = textWidth * 0.2; // Padding равен 20% от ширины текста
        const brickWidth = Math.max(0.08 * width, textWidth + padding); // Минимальная ширина кирпича 8% от ширины окна
        const brickHeight = 0.05 * height; // Высота кирпича 5% от высоты окна
        const x = Math.random() * (width - brickWidth) + brickWidth / 2;
        const y = brickHeight / 2;
        const color = colors[index % colors.length];
        const body = Bodies.rectangle(x, y, brickWidth, brickHeight, {
          render: {
            fillStyle: color,
            strokeStyle: "#000000",
            lineWidth: 3,
          },
          chamfer: { radius: 0.02 * width }, // Радиус скругления углов 2.5% от ширины окна
          label: brick.service,
          restitution: 0.8,
          friction: 0.5,
        });
        Body.rotate(body, Math.random() * Math.PI);
        return body;
      });

      World.add(engine.value.world, [ground, leftWall, rightWall, ceiling]);

      let currentBrickIndex = 0;
      const dropBrick = () => {
        if (currentBrickIndex < brickBodies.length) {
          World.add(engine.value.world, brickBodies[currentBrickIndex]);
          currentBrickIndex++;
          setTimeout(dropBrick, 500);
        }
      };

      dropBrick();

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

      Events.on(mouseConstraint, "mousedown", (event) => {
        const { body } = event;
        if (body) {
          console.log("Dragging:", body.label);
        }
      });

      Events.on(mouseConstraint, "enddrag", (event) => {
        const { body } = event;
        if (body) {
          const { position } = body;
          const funnelArea = container.value
            .querySelector(".services-block")
            .getBoundingClientRect();
          const funnelX = funnelArea.left;
          const funnelY = funnelArea.top;
          const funnelWidth = funnelArea.width;
          const funnelHeight = funnelArea.height;

          if (
            position.x > funnelX &&
            position.x < funnelX + funnelWidth &&
            position.y > funnelY &&
            position.y < funnelY + funnelHeight
          ) {
            console.log("Dropped into the funnel:", body.label);
            store.dispatch("addService", body.label);
            World.remove(engine.value.world, body);
          } else {
            Body.setPosition(body, {
              x: Math.max(0, Math.min(width, body.position.x)),
              y: Math.max(0, Math.min(height, body.position.y)),
            });
          }
        }
      });

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

      Events.on(renderBricks.value, "afterRender", () => {
        const context = renderBricks.value.context;
        const allBodies = Composite.allBodies(engine.value.world);
        context.font = "18px Montserrat";
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
      engine.value = Engine.create();

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

      Engine.run(engine.value);
      Render.run(renderBackground.value);
      Render.run(renderBricks.value);

      updateCanvasSize();

      window.addEventListener("resize", updateCanvasSize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateCanvasSize);
      Render.stop(renderBackground.value);
      Render.stop(renderBricks.value);
      World.clear(engine.value.world);
      Engine.clear(engine.value);
    });

    const handleDrop = (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData("text");
      store.dispatch("addService", data);

      // Запуск анимации
      store.dispatch("triggerAnimation");
    };

    return {
      container,
      backgroundCanvas,
      bricksCanvas,
      bricks,
      handleDrop,
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

.services-block {
  position: absolute;
  top: 51%;
  right: 1%;
  width: 15%;
  height: 16%;
  border: 4px dotted #ff6400;
  z-index: 50;
  border-radius: 15%;
}

.mosaic-logo {
  position: absolute;
  top: 14%;
  left: 10.7%;
  width: 80%;
  z-index: 40;
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
  z-index: 90;
}

.bricks-frame {
  position: absolute;
  left: 2%;
  top: 2%;
  width: 6%;
  z-index: 800;
}
.bricks-frame:hover {
  cursor: pointer;
}

.ideas {
  margin-left: 1%;
  width: 98.5%;
  margin-top: 29%;
  z-index: 30;
}

.instruments {
  position: absolute;
  top: 47%;
  left: 9%;
  width: 29%;
  z-index: 30;
}

.instruments__arrow {
  position: absolute;
  top: 55%;
  left: 38%;
  width: 9%;
}

.add {
  position: absolute;
  width: 22%;
  top: 53%;
  right: 25%;
}

.add-arrow {
  position: absolute;
  top: 60%;
  right: 18%;
  width: 5%;
  rotate: 55deg;
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

@media (max-width: 3200px) {
  .falling-bricks .instruments__arrow {
    top: 68%;
    left: 39%;
  }
}

@media (max-width: 3000px) {
  .instruments {
    top: 62%;
    left: 9%;
  }
}

@media (max-width: 2992px) {
  .instruments {
    top: 56%;
    left: 9%;
  }
  .instruments__arrow {
    top: 62%;
    left: 39%;
  }
}

@media (max-width: 2691px) {
  .instruments {
    top: 47%;
    left: 9%;
  }
  .instruments__arrow {
    top: 52%;
    left: 39%;
  }
}

@media (max-width: 1920px) and (max-height: 1083px) {
  .instruments {
    top: 53%;
  }
  .instruments__arrow {
    top: 60% !important;
  }
}

@media (max-width: 1920px) and (max-height: 963px) {
  .instruments {
    top: 60%;
  }
  .instruments__arrow {
    top: 65% !important;
  }
  .add {
    top: 58%;
  }
  .add-arrow {
    top: 62%;
  }
  .services-block {
    top: 58%;
  }
}

@media (max-width: 1400px) and (max-height: 933px) {
  .mosaic-logo {
    top: 11%;
  }
  .instruments {
    top: 45%;
  }
  .instruments__arrow {
    top: 52% !important;
  }
  .add {
    top: 45%;
  }
  .add-arrow {
    top: 50%;
  }
  .services-block {
    top: 44%;
  }
}

@media (max-width: 1280px) and (max-height: 800px) {
  .instruments {
    top: 50% !important;
  }
  .instruments__arrow {
    top: 56% !important;
  }
  .services-block {
    top: 48%;
  }
  .add {
    top: 48%;
  }
  .add-arrow {
    top: 53%;
  }
}
</style>
