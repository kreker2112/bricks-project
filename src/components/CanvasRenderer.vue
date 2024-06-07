<template>
  <div class="canvas-container">
    <canvas ref="backgroundCanvas" class="background-canvas"></canvas>
    <canvas ref="bricksCanvas" class="bricks-canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
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
  props: {
    bricks: {
      type: Array,
      required: true,
    },
    container: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const backgroundCanvas = ref(null);
    const bricksCanvas = ref(null);
    const engine = ref(null);
    const renderBackground = ref(null);
    const renderBricks = ref(null);

    const updateCanvasSize = () => {
      if (!props.container.value) {
        console.error("Container is not initialized");
        return;
      }

      const width = props.container.value.clientWidth;
      const height = props.container.value.clientHeight;

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

      const brickBodies = props.bricks.map((brick, index) => {
        const context = renderBricks.value.context;
        context.font = "18px Montserrat";
        const padding = 20;
        const textWidth = context.measureText(brick.service).width + padding;
        const brickWidth = Math.max(160, textWidth);
        const brickHeight = 50;
        const x = Math.random() * (width - brickWidth) + brickWidth / 2;
        const y = brickHeight / 2;
        const color = colors[index % colors.length];
        const body = Bodies.rectangle(x, y, brickWidth, brickHeight, {
          render: {
            fillStyle: color,
            strokeStyle: "#000000",
            lineWidth: 3,
          },
          chamfer: { radius: 25 },
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
          const funnelArea = props.container.value
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
            props.store.dispatch("addService", body.label);
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

    watchEffect(() => {
      if (props.container.value) {
        updateCanvasSize();
      }
    });

    onMounted(() => {
      engine.value = Engine.create();

      renderBackground.value = Render.create({
        element: props.container.value,
        canvas: backgroundCanvas.value,
        engine: engine.value,
        options: {
          width: props.container.value.clientWidth,
          height: props.container.value.clientHeight,
          wireframes: false,
          background: "transparent",
        },
      });

      renderBricks.value = Render.create({
        element: props.container.value,
        canvas: bricksCanvas.value,
        engine: engine.value,
        options: {
          width: props.container.value.clientWidth,
          height: props.container.value.clientHeight,
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

    return {
      backgroundCanvas,
      bricksCanvas,
    };
  },
};
</script>

<style scoped>
.canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.background-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bricks-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
