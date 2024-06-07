<template>
  <div class="falling-bricks" ref="container">
    <div class="brick-frame__container">
      <a href="#">
        <img
          class="bricks-frame"
          src="../images/logos/bricks-frame.png"
          alt="bricks-frame"
        />
      </a>
    </div>
    <div class="services-block" @drop="handleDrop" @dragover.prevent></div>

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

    <!-- <canvas ref="backgroundCanvas" class="background-canvas"></canvas>
    <canvas ref="bricksCanvas" class="bricks-canvas"></canvas> -->
  </div>
</template>

<script>
// import { ref, onMounted, onBeforeUnmount } from "vue";
// import {
//   Engine,
//   Render,
//   World,
//   Bodies,
//   Body,
//   Mouse,
//   MouseConstraint,
//   Events,
//   Composite,
// } from "matter-js";
// import { useStore } from "vuex";

// export default {
//   setup() {
//     const store = useStore();
//     const container = ref(null);
//     const backgroundCanvas = ref(null);
//     const bricksCanvas = ref(null);
//     const engine = ref(null);
//     const renderBackground = ref(null);
//     const renderBricks = ref(null);

//     const bricks = ref([
//       { service: "Контекст" },
//       { service: "Ідеї" },
//       { service: "Концепції" },
//       { service: "Брендування" },
//       { service: "SMM" },
//       { service: "Аудит" },
//       { service: "Маркетинг" },
//       { service: "Стратегії" },
//       { service: "Інтеграції" },
//       { service: "Просування" },
//       { service: "Дизайн" },
//       { service: "Логотип" },
//       { service: "Неймінг" },
//       { service: "SEO" },
//       { service: "Розсилки" },
//       { service: "Партнерство" },
//       { service: "TV" },
//       { service: "Позиціонування" },
//     ]);

//   const updateCanvasSize = () => {
//     const width = container.value.clientWidth;
//     const height = container.value.clientHeight;

//     renderBackground.value.options.width = width;
//     renderBackground.value.options.height = height;

//     renderBackground.value.canvas.width = width;
//     renderBackground.value.canvas.height = height;

//     renderBackground.value.bounds.max.x = width;
//     renderBackground.value.bounds.max.y = height;

//     renderBricks.value.options.width = width;
//     renderBricks.value.options.height = height;

//     renderBricks.value.canvas.width = width;
//     renderBricks.value.canvas.height = height;

//     renderBricks.value.bounds.max.x = width;
//     renderBricks.value.bounds.max.y = height;

//     World.clear(engine.value.world);
//     Engine.clear(engine.value);

//     const ground = Bodies.rectangle(width / 2, height + 5, width, 10, {
//       isStatic: true,
//       restitution: 0.8,
//       friction: 0.5,
//     });
//     const leftWall = Bodies.rectangle(1, height / 2, 2, height, {
//       isStatic: true,
//       restitution: 0.8,
//       friction: 0.5,
//     });
//     const rightWall = Bodies.rectangle(width + 5, height / 2, 10, height, {
//       isStatic: true,
//       restitution: 0.8,
//       friction: 0.5,
//     });
//     const ceiling = Bodies.rectangle(width / 2, -5, width, 10, {
//       isStatic: true,
//       restitution: 0.8,
//       friction: 0.5,
//     });

//     const colors = ["#ff6400", "#d8d8d8", "#d9d9d9", "#ffffff"];

//     const brickBodies = bricks.value.map((brick, index) => {
//       const context = renderBricks.value.context;
//       context.font = "18px Montserrat";
//       const padding = 20;
//       const textWidth = context.measureText(brick.service).width + padding;
//       const brickWidth = Math.max(160, textWidth);
//       const brickHeight = 50;
//       const x = Math.random() * (width - brickWidth) + brickWidth / 2;
//       const y = brickHeight / 2;
//       const color = colors[index % colors.length];
//       const body = Bodies.rectangle(x, y, brickWidth, brickHeight, {
//         render: {
//           fillStyle: color,
//           strokeStyle: "#000000",
//           lineWidth: 3,
//         },
//         chamfer: { radius: 25 },
//         label: brick.service,
//         restitution: 0.8,
//         friction: 0.5,
//       });
//       Body.rotate(body, Math.random() * Math.PI);
//       return body;
//     });

//     World.add(engine.value.world, [ground, leftWall, rightWall, ceiling]);

//     let currentBrickIndex = 0;
//     const dropBrick = () => {
//       if (currentBrickIndex < brickBodies.length) {
//         World.add(engine.value.world, brickBodies[currentBrickIndex]);
//         currentBrickIndex++;
//         setTimeout(dropBrick, 500);
//       }
//     };

//     dropBrick();

//     const mouse = Mouse.create(renderBricks.value.canvas);
//     const mouseConstraint = MouseConstraint.create(engine.value, {
//       mouse: mouse,
//       constraint: {
//         stiffness: 0.2,
//         render: {
//           visible: false,
//         },
//       },
//     });
//     World.add(engine.value.world, mouseConstraint);

//     renderBricks.value.mouse = mouse;

//     Events.on(mouseConstraint, "mousedown", (event) => {
//       const { body } = event;
//       if (body) {
//         console.log("Dragging:", body.label);
//       }
//     });

//     Events.on(mouseConstraint, "enddrag", (event) => {
//       const { body } = event;
//       if (body) {
//         const { position } = body;
//         const funnelArea = container.value
//           .querySelector(".services-block")
//           .getBoundingClientRect();
//         const funnelX = funnelArea.left;
//         const funnelY = funnelArea.top;
//         const funnelWidth = funnelArea.width;
//         const funnelHeight = funnelArea.height;

//         if (
//           position.x > funnelX &&
//           position.x < funnelX + funnelWidth &&
//           position.y > funnelY &&
//           position.y < funnelY + funnelHeight
//         ) {
//           console.log("Dropped into the funnel:", body.label);
//           store.dispatch("addService", body.label);
//           World.remove(engine.value.world, body);
//         } else {
//           Body.setPosition(body, {
//             x: Math.max(0, Math.min(width, body.position.x)),
//             y: Math.max(0, Math.min(height, body.position.y)),
//           });
//         }
//       }
//     });

//     Events.on(engine.value, "beforeUpdate", () => {
//       const allBodies = Composite.allBodies(engine.value.world);
//       allBodies.forEach((body) => {
//         const maxSpeed = 10;
//         const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
//         if (speed > maxSpeed) {
//           const scale = maxSpeed / speed;
//           Body.setVelocity(body, {
//             x: body.velocity.x * scale,
//             y: body.velocity.y * scale,
//           });
//         }
//       });
//     });

//     Events.on(renderBricks.value, "afterRender", () => {
//       const context = renderBricks.value.context;
//       const allBodies = Composite.allBodies(engine.value.world);
//       context.font = "18px Montserrat";
//       context.fillStyle = "#002d6e";
//       context.textAlign = "center";
//       context.textBaseline = "middle";

//       allBodies.forEach((body) => {
//         if (body.label && !body.isStatic) {
//           const { x, y } = body.position;
//           context.save();
//           context.translate(x, y);
//           context.rotate(body.angle);
//           context.fillText(body.label, 0, 0);
//           context.restore();
//         }
//       });
//     });
//   };

//   onMounted(() => {
//     engine.value = Engine.create();

//     renderBackground.value = Render.create({
//       element: container.value,
//       canvas: backgroundCanvas.value,
//       engine: engine.value,
//       options: {
//         width: container.value.clientWidth,
//         height: container.value.clientHeight,
//         wireframes: false,
//         background: "transparent",
//       },
//     });

//     renderBricks.value = Render.create({
//       element: container.value,
//       canvas: bricksCanvas.value,
//       engine: engine.value,
//       options: {
//         width: container.value.clientWidth,
//         height: container.value.clientHeight,
//         wireframes: false,
//         background: "transparent",
//       },
//     });

//     Engine.run(engine.value);
//     Render.run(renderBackground.value);
//     Render.run(renderBricks.value);

//     updateCanvasSize();

//     window.addEventListener("resize", updateCanvasSize);
//   });

//   onBeforeUnmount(() => {
//     window.removeEventListener("resize", updateCanvasSize);
//     Render.stop(renderBackground.value);
//     Render.stop(renderBricks.value);
//     World.clear(engine.value.world);
//     Engine.clear(engine.value);
//   });

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const data = event.dataTransfer.getData("text");
//     store.dispatch("addService", data);
//   };

//   return {
//     container,
//     backgroundCanvas,
//     bricksCanvas,
//     bricks,
//     handleDrop,
//   };
// },
// };
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
  top: 20px;
  right: 20px;
  width: 200px;
  height: 200px;
  z-index: 10;
  border: 4px dotted #ff6400;
  z-index: 50;
  border-radius: 15px;
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
  margin-left: 18px;
  margin-top: 19px;
  z-index: 800;
}
.bricks-frame:hover {
  cursor: pointer;
}

.ideas {
  width: 100%;
  margin-top: 335px;
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
  top: 200px;
  right: 300px;
}

.add-arrow {
  position: absolute;
  top: 150px;
  right: 190px;
}

.brick {
  z-index: 60 !important;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px !important;
  border: 1px solid black;
  border-radius: 15px;
}
</style>
