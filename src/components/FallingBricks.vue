<template>
  <div class="falling-bricks" ref="container">
    <a href="#" @click.prevent="openMenu">
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

    <!-- Sliding Menu -->
    <div class="mobile-menu" :class="{ open: isMenuOpen }">
      <div class="mobile-menu__header">
        <span class="close-btn" @click="closeMenu">&times;</span>
      </div>
      <div class="mobile-menu__content">
        <div class="menu-section">
          <div class="menu-item" @click="toggleSubmenu('marketing')">
            Маркетинг
          </div>
          <div class="submenu" v-if="submenuOpen === 'marketing'">
            <div class="submenu-item">Подпункт 1</div>
            <div class="submenu-item">Подпункт 2</div>
          </div>
          <div class="menu-item" @click="toggleSubmenu('analytics')">
            Аналітика
          </div>
          <div class="submenu" v-if="submenuOpen === 'analytics'">
            <div class="submenu-item">Подпункт 1</div>
            <div class="submenu-item">Подпункт 2</div>
          </div>
          <div class="menu-item" @click="toggleSubmenu('design')">Дизайн</div>
          <div class="submenu" v-if="submenuOpen === 'design'">
            <div class="submenu-item">Подпункт 1</div>
            <div class="submenu-item">Подпункт 2</div>
          </div>
          <div class="menu-item" @click="toggleSubmenu('promotion')">
            Просування
          </div>
          <div class="submenu" v-if="submenuOpen === 'promotion'">
            <div class="submenu-item">Подпункт 1</div>
            <div class="submenu-item">Подпункт 2</div>
          </div>
          <div class="menu-item">Про нас</div>
        </div>
        <div class="contact-section">
          <div class="contact-item">
            <i class="email-icon"></i> 1234567@gmail.com
          </div>
          <div class="contact-item">
            <i class="phone-icon"></i> 0 800 123 456 7
          </div>
          <div class="contact-item"><i class="telegram-icon"></i> @khjhjkh</div>
          <div class="contact-item">
            <i class="location-icon"></i> м. Дніпро, вул. Виконкомівська, 85
          </div>
        </div>
        <div class="footer-section">
          <div class="footer-icon">
            <img src="../images/footerframe.png" alt="footerframe" />
          </div>
          <div class="footer-text">
            ВИРІШУЄМО <br />
            ПРОБЛЕМУ В 1 КЛІК
          </div>
        </div>
      </div>
    </div>
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
  Query,
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

    const isMenuOpen = ref(false);
    const submenuOpen = ref("");

    const openMenu = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        isMenuOpen.value = true;
      }
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    const toggleSubmenu = (menu) => {
      submenuOpen.value = submenuOpen.value === menu ? "" : menu;
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

      World.clear(engine.value.world);
      Engine.clear(engine.value);

      const ground = Bodies.rectangle(width / 2, height + 5, width, 10, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.5,
      });
      const leftWall = Bodies.rectangle(0.001, height / 2, 2, height, {
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
        const fontSize = 1.9 * (width / 100);
        context.font = `${fontSize}px Montserrat Bold`;
        const textWidth = context.measureText(brick.service).width;
        const padding = textWidth * 1.09; // Padding от ширины текста
        const brickWidth = Math.max(0.00000000001 * width, textWidth + padding); // Минимальная ширина кирпича от ширины окна
        const brickHeight = 0.068 * height; // Высота кирпича от высоты окна
        const x = Math.random() * (width - brickWidth) + brickWidth / 2;
        const y = brickHeight / 2;
        const color = colors[index % colors.length];
        const body = Bodies.rectangle(x, y, brickWidth, brickHeight, {
          render: {
            fillStyle: color,
            strokeStyle: "#000000",
            lineWidth: 3,
          },
          chamfer: { radius: 0.015 * width }, // Радиус скругления углов
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

      let hoveringBody = null;

      const setCursorStyle = (style) => {
        renderBricks.value.canvas.style.cursor = style;
      };

      Events.on(mouseConstraint, "mousemove", (event) => {
        const foundBodies = Query.point(
          Composite.allBodies(engine.value.world),
          event.mouse.position,
        );
        if (foundBodies.length > 0) {
          if (!hoveringBody) {
            hoveringBody = foundBodies[0];
            setCursorStyle("grab");
          }
        } else {
          if (hoveringBody) {
            hoveringBody = null;
            setCursorStyle("default");
          }
        }
      });

      Events.on(mouseConstraint, "mousedown", (event) => {
        const foundBodies = Query.point(
          Composite.allBodies(engine.value.world),
          event.mouse.position,
        );
        if (foundBodies.length > 0) {
          setCursorStyle("grabbing");
        }
      });

      Events.on(mouseConstraint, "mouseup", () => {
        setCursorStyle("default");
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
        const fontSize = 2.5 * (width / 100);
        context.font = `${fontSize}px Montserrat Bold`;
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

      store.dispatch("triggerAnimation");
    };

    return {
      container,
      backgroundCanvas,
      bricksCanvas,
      bricks,
      handleDrop,
      isMenuOpen,
      submenuOpen,
      openMenu,
      closeMenu,
      toggleSubmenu,
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

.grab {
  cursor: grab;
}

.grabbing {
  cursor: grabbing;
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

@media (max-width: 1920px) {
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

@media only screen and (min-width: 1536px) and (max-width: 1536px) and (min-height: 864px) and (max-height: 864px) {
  .mosaic-logo {
    top: 14%;
  }

  .instruments {
    top: 54%;
  }
  .instruments__arrow {
    top: 58% !important;
  }
  .services-block {
    top: 53%;
  }
  .add {
    top: 52%;
  }
  .add-arrow {
    top: 57%;
  }
}

@media (max-width: 1400px) {
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

@media only screen and (min-width: 1366px) and (max-width: 1366px) and (min-height: 1024px) and (max-height: 1024px) {
  .mosaic-logo {
    top: 18%;
  }
  .ideas {
    margin-top: 40%;
  }
  .instruments {
    top: 50%;
  }
  .instruments__arrow {
    top: 56%;
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

@media only screen and (min-width: 1280px) and (max-width: 1280px) and (min-height: 800px) and (max-height: 800px) {
  .instruments {
    top: 50%;
  }
  .instruments__arrow {
    top: 55% !important;
  }
  .services-block {
    top: 50%;
  }
  .add {
    top: 50%;
  }
  .add-arrow {
    top: 53%;
  }
}

@media only screen and (min-width: 1180px) and (max-width: 1180px) and (min-height: 820px) and (max-height: 820px) {
  .instruments {
    top: 45% !important;
  }
  .instruments__arrow {
    top: 50% !important;
  }
  .services-block {
    top: 45%;
  }
  .add {
    top: 46%;
  }
  .add-arrow {
    top: 49%;
  }
}
@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 1366px) and (max-height: 1366px) {
  img.bricks-frame {
    top: 9.5%;
    left: 78%;
    width: 12%;
  }
  .mosaic-logo {
    left: 10%;
    top: 10%;
    width: 58%;
  }
  .instruments {
    top: 40% !important;
  }
  .instruments__arrow {
    top: 50% !important;
  }
  .services-block {
    width: 15%;
    height: 25%;
    top: 42%;
    right: 5%;
  }
  .add {
    top: 42%;
  }
  .add-arrow {
    top: 50%;
  }
  .ideas {
    margin-top: 26%;
    margin-left: 5%;
    width: 90%;
  }
}
@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 768px) and (max-height: 768px) {
  .instruments {
    top: 42% !important;
  }
  .instruments__arrow {
    top: 46% !important;
  }
  .services-block {
    top: 40%;
  }
  .add {
    top: 40%;
  }
  .add-arrow {
    top: 45%;
  }
}
@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 600px) and (max-height: 600px) {
  .instruments {
    top: 54% !important;
  }
  .instruments__arrow {
    top: 60% !important;
  }
  .services-block {
    top: 55%;
  }
  .add {
    top: 56%;
  }
  .add-arrow {
    top: 59%;
  }
}
@media only screen and (min-width: 820px) and (max-width: 820px) and (min-height: 1180px) and (max-height: 1180px) {
  img.bricks-frame {
    top: 9.5%;
    left: 78%;
    width: 12%;
  }
  .mosaic-logo {
    left: 10%;
    top: 10%;
    width: 58%;
  }
  .instruments {
    top: 40% !important;
  }
  .instruments__arrow {
    top: 50% !important;
  }
  .services-block {
    width: 15%;
    height: 25%;
    top: 42%;
    right: 5%;
  }
  .add {
    top: 42%;
  }
  .add-arrow {
    top: 50%;
  }
  .ideas {
    margin-top: 26%;
    margin-left: 5%;
    width: 90%;
  }
}
@media only screen and (min-width: 768px) and (max-width: 768px) and (min-height: 1024px) and (max-height: 1024px) {
  img.bricks-frame {
    top: 9.5%;
    left: 78%;
    width: 12%;
  }
  .mosaic-logo {
    left: 10%;
    top: 10%;
    width: 58%;
  }
  .instruments {
    top: 40% !important;
  }
  .instruments__arrow {
    top: 50% !important;
  }
  .services-block {
    width: 15%;
    height: 25%;
    top: 42%;
    right: 5%;
  }
  .add {
    top: 42%;
  }
  .add-arrow {
    top: 50%;
  }
  .ideas {
    margin-top: 26%;
    margin-left: 5%;
    width: 90%;
  }
}
@media (max-width: 767px) {
  .falling-bricks {
    width: 100%;
    height: 300px;
  }
  img.bricks-frame {
    top: 9.5%;
    left: 78%;
    width: 12%;
  }
  .mosaic-logo {
    left: 10%;
    top: 10%;
    width: 58%;
  }
  .ideas {
    margin-top: 35% !important;
  }
  .instruments {
    top: 30% !important;
  }
  .instruments__arrow {
    top: 35% !important;
  }
  .services-block {
    width: 15%;
    height: 17%;
    top: 30%;
    right: 5%;
  }
  .add {
    top: 30%;
  }
  .add-arrow {
    top: 35%;
  }
  .ideas {
    margin-top: 26%;
    margin-left: 5%;
    width: 90%;
  }
}

/* Mobile Menu Styles */
.mobile-menu {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: #ff6400;
  z-index: 1000;
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mobile-menu.open {
  left: 0;
}

.mobile-menu__header {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.close-btn {
  font-size: 2rem;
  cursor: pointer;
}

.mobile-menu__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-section {
  padding: 1rem;
}

.menu-item {
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid #fff;
}

.submenu {
  padding-left: 1rem;
}

.submenu-item {
  padding: 0.5rem 0;
  font-size: 1.2rem;
}

.contact-section {
  background-color: #002d6e;
  color: #fff;
  padding: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.contact-item i {
  margin-right: 0.5rem;
}

.footer-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #002d6e;
  color: #fff;
}

.footer-icon img {
  width: 50px;
}

.footer-text {
  text-align: right;
}
</style>
