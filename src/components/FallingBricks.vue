<template>
  <div class="falling-bricks" ref="container">
    <a href="#" @click.prevent="openMenu">
      <img
        class="bricks-frame"
        src="../images/logos/bricks-frame.png"
        alt="bricks-frame"
      />
    </a>

    <div
      class="services-block"
      v-if="!isLightboxVisible"
      @drop="handleDrop"
      @dragover.prevent
    ></div>

    <img class="mosaic-logo" src="../images/logos/logo.png" alt="mosaic-logo" />

    <img class="ideas" src="../images/logos/ideas.png" alt="ideas" />

    <canvas
      ref="backgroundCanvas"
      class="background-canvas"
      v-show="!isLightboxVisible"
    ></canvas>
    <canvas
      ref="bricksCanvas"
      class="bricks-canvas"
      v-show="!isLightboxVisible"
    ></canvas>

    <!-- Sliding Menu for mobile -->
    <div
      class="mobile-menu"
      v-show="isVerticalLayout"
      :class="{ open: isMenuOpen }"
    >
      <div class="mobile-menu__header">
        <span class="close-btn" @click="closeMenu">&times;</span>
      </div>
      <div class="mobile-menu__content">
        <div class="menu-section">
          <!-- меню для мобильных экранов -->
          <div class="menu-item" @click="toggleSubmenu('marketing')">
            МАРКЕТИНГ
            <img
              class="menu-item__arrow"
              :class="{ rotated: submenuOpen === 'marketing' }"
              src="../images/menu-item__arrow.png"
              alt="menu-item__arrow"
            />
          </div>
          <div class="submenu" v-if="submenuOpen === 'marketing'">
            <div class="submenu-item">КОНЦЕПЦІЇ</div>
            <div class="submenu-item">ІДЕЇ</div>
            <div class="submenu-item">СТРАТЕГІЇ</div>
          </div>
          <div class="menu-item" @click="toggleSubmenu('analytics')">
            АНАЛІТИКА
            <img
              class="menu-item__arrow"
              :class="{ rotated: submenuOpen === 'analytics' }"
              src="../images/menu-item__arrow.png"
              alt="menu-item__arrow"
            />
          </div>
          <div class="submenu" v-if="submenuOpen === 'analytics'">
            <div class="submenu-item">АУДИТ</div>
            <div class="submenu-item">АНАЛІТИКА</div>
          </div>
          <div class="menu-item" @click="toggleSubmenu('design')">
            ДИЗАЙН
            <img
              class="menu-item__arrow"
              :class="{ rotated: submenuOpen === 'design' }"
              src="../images/menu-item__arrow.png"
              alt="menu-item__arrow"
            />
          </div>
          <div class="submenu" v-if="submenuOpen === 'design'">
            <div class="submenu-item">ДИЗАЙН</div>
            <div class="submenu-item">УПАКОВКА БРЕНДУ</div>
            <div class="submenu-item">СТВОРЕННЯ САЙТІВ</div>
          </div>
          <div class="menu-item" @click="toggleSubmenu('promotion')">
            ПРОСУВАННЯ
            <img
              class="menu-item__arrow"
              :class="{ rotated: submenuOpen === 'promotion' }"
              src="../images/menu-item__arrow.png"
              alt="menu-item__arrow"
            />
          </div>
          <div class="submenu" v-if="submenuOpen === 'promotion'">
            <div class="submenu-item">SEO</div>
            <div class="submenu-item">КОНТЕКСТ</div>
            <div class="submenu-item">ТАРГЕТ</div>
            <div class="submenu-item">SMM</div>
          </div>
          <div class="menu-item-about">
            <a class="link-about" href="#">ПРО НАС</a>
          </div>
        </div>
        <div class="contact-section-container">
          <div class="contact-section">
            <h2 class="mobile-menu__contact-section__header">
              ЗВ'ЯЖІТЬСЯ З НАМИ
            </h2>
            <div class="contacts">
              <div class="contact-item-email">1234567@gmail.com</div>
              <div class="contact-item-phone">0 800 123 456 7</div>
              <div class="contact-item-telegram">@khjhjkh</div>
              <div class="contact-item-address">
                м. Дніпро, вул. Виконкомівська, 85
              </div>
            </div>
            <div class="menu__socials">
              <a href="#"
                ><img src="../images/logos/facebook.png" alt="facebook"
              /></a>
              <a href="#"
                ><img src="../images/logos/instagram.png" alt="instagram"
              /></a>
            </div>
            <div class="footer-section">
              <div class="footer-icon">
                <img src="../images/footerframe_white.png" alt="footerframe" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Horizontal Menu for desktop -->
    <div class="desktop-menu" v-show="isDesktop" :class="{ open: isMenuOpen }">
      <div class="close-btn__container">
        <span class="desktop-menu__close-btn" @click="closeMenu">&times;</span>
      </div>
      <div class="desktop-menu__content">
        <div
          class="desktop-menu-item"
          :class="{ active: activeMenu === 'marketing' }"
          @click="selectMenu('marketing')"
        >
          МАРКЕТИНГ<img
            class="desktop-menu-item__arrow"
            src="../images/menu-item__arrow.png"
            alt="menu-item__arrow"
          />
        </div>
        <div
          class="desktop-menu-item"
          :class="{ active: activeMenu === 'analytics' }"
          @click="selectMenu('analytics')"
        >
          АНАЛІТИКА<img
            class="desktop-menu-item__arrow"
            src="../images/menu-item__arrow.png"
            alt="menu-item__arrow"
          />
        </div>
        <div
          class="desktop-menu-item"
          :class="{ active: activeMenu === 'design' }"
          @click="selectMenu('design')"
        >
          ДИЗАЙН<img
            class="desktop-menu-item__arrow"
            src="../images/menu-item__arrow.png"
            alt="menu-item__arrow"
          />
        </div>
        <div
          class="desktop-menu-item"
          :class="{ active: activeMenu === 'promotion' }"
          @click="selectMenu('promotion')"
        >
          ПРОСУВАННЯ<img
            class="desktop-menu-item__arrow"
            src="../images/menu-item__arrow.png"
            alt="menu-item__arrow"
          />
        </div>
        <div
          class="desktop-menu-item"
          :class="{ active: activeMenu === 'about' }"
          @click="selectMenu('about')"
        >
          <div class="desktop-menu-item" href="#">ПРО НАС</div>
        </div>
      </div>
      <div class="desktop-menu__contact-section-container">
        <div v-if="!activeMenu" class="desktop-menu__contact-section">
          <h2 class="desktop-menu__contact-section__header">
            ЗВ'ЯЖІТЬСЯ З НАМИ
          </h2>
          <div class="contact-item-email">1234567@gmail.com</div>
          <div class="contact-item-phone">0 800 123 456 7</div>
          <div class="contact-item-telegram">@khjhjkh</div>
          <div class="contact-item-address">
            м. Дніпро, вул. Виконкомівська, 85
          </div>
          <div class="desktop-menu__socials">
            <a href="#"
              ><img
                class="desktop-menu__facebook-logo"
                src="../images/logos/facebook.png"
                alt="facebook"
            /></a>
            <a href="#"
              ><img
                class="desktop-menu__instagram-logo"
                src="../images/logos/instagram.png"
                alt="instagram"
            /></a>
          </div>
          <div class="footer-section">
            <div class="footer-icon">
              <img src="../images/footerframe_white.png" alt="footerframe" />
            </div>
          </div>
        </div>
        <div v-else class="desktop-menu__dynamic-content">
          <template v-if="activeMenu === 'about'">
            <h2 class="desktop-menu__contact-section__header">
              ЗВ'ЯЖІТЬСЯ З НАМИ
            </h2>
            <div class="contact-item-email">1234567@gmail.com</div>
            <div class="contact-item-phone">0 800 123 456 7</div>
            <div class="contact-item-telegram">@khjhjkh</div>
            <div class="contact-item-address">
              м. Дніпро, вул. Виконкомівська, 85
            </div>
            <div class="desktop-menu__socials">
              <a href="#"
                ><img
                  class="desktop-menu__facebook-logo"
                  src="../images/logos/facebook.png"
                  alt="facebook"
              /></a>
              <a href="#"
                ><img
                  class="desktop-menu__instagram-logo"
                  src="../images/logos/instagram.png"
                  alt="instagram"
              /></a>
            </div>
          </template>
          <template v-else>
            <a
              v-for="item in getMenuItems(activeMenu)"
              class="desktop-menu__dynamic-content--item"
              href="#"
              :key="item"
            >
              {{ item }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
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
  Runner,
} from "matter-js";
import { useStore } from "vuex";

const wrapMouseCreate = () => {
  const originalMouseCreate = Mouse.create;
  Mouse.create = function (element) {
    const mouse = originalMouseCreate(element);
    const setElement = mouse.setElement;

    mouse.setElement = function (element) {
      setElement(element);

      const originalAddEventListener = element.addEventListener.bind(element);
      element.addEventListener = function (type, listener, options) {
        if (["mousewheel", "touchmove", "touchstart"].includes(type)) {
          options = options || {};
          if (typeof options === "object") {
            options.passive = true;
          }
        }
        originalAddEventListener(type, listener, options);
      };
    };

    return mouse;
  };
};

export default {
  setup() {
    const store = useStore();
    const container = ref(null);
    const backgroundCanvas = ref(null);
    const bricksCanvas = ref(null);
    const engine = ref(null);
    const renderBackground = ref(null);
    const renderBricks = ref(null);
    const runner = ref(null);

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

    const updateIsVerticalLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Определение для мобильного меню
      return (
        (width === 1024 && height === 1366) ||
        (width === 820 && height === 1180) ||
        (width === 768 && height === 1024) ||
        width <= 767
      );
    };

    const isVerticalLayout = ref(updateIsVerticalLayout());
    const isDesktop = ref(!isVerticalLayout.value);

    const duplicatedBricks = isVerticalLayout.value
      ? bricks.value
      : bricks.value.flatMap((brick) => [brick, { ...brick }]);

    const isMenuOpen = ref(false);
    const submenuOpen = ref("");
    const activeMenu = ref(null);

    const isLightboxVisible = computed(() => store.state.isLightboxVisible);

    const openMenu = () => {
      isMenuOpen.value = true;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
      activeMenu.value = null;
    };

    const toggleSubmenu = (menu) => {
      submenuOpen.value = submenuOpen.value === menu ? "" : menu;
    };

    const selectMenu = (menu) => {
      activeMenu.value = activeMenu.value === menu ? null : menu;
    };

    const getMenuTitle = (menu) => {
      switch (menu) {
        case "marketing":
          return "МАРКЕТИНГ";
        case "analytics":
          return "АНАЛІТИКА";
        case "design":
          return "ДИЗАЙН";
        case "promotion":
          return "ПРОСУВАННЯ";
        case "about":
          return "ПРО НАС";
        default:
          return "";
      }
    };

    const getMenuItems = (menu) => {
      switch (menu) {
        case "marketing":
          return ["КОНЦЕПЦІЇ", "ІДЕЇ", "СТРАТЕГІЇ"];
        case "analytics":
          return ["АУДИТ", "АНАЛІТИКА"];
        case "design":
          return ["ДИЗАЙН", "УПАКОВКА БРЕНДУ", "СТВОРЕННЯ САЙТІВ"];
        case "promotion":
          return ["SEO", "КОНТЕКСТ", "ТАРГЕТ", "SMM"];
        case "about":
          return "about";
        default:
          return [];
      }
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
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      });
      const leftWall = Bodies.rectangle(0.001, height / 2, 2, height, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.5,
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      });
      const rightWall = Bodies.rectangle(width + 5, height / 2, 10, height, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.5,
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      });
      const ceiling = Bodies.rectangle(width / 2, -5, width, 10, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.5,
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      });

      const colors = ["#ff6400", "#d8d8d8", "#d9d9d9", "#ffffff"];

      const brickBodies = duplicatedBricks.map((brick, index) => {
        const context = renderBricks.value.context;
        const fontSize = 1.9 * (width / 100); // Размер шрифта оставляем прежним
        context.font = `${fontSize}px Montserrat Bold`;
        const textWidth = context.measureText(brick.service).width;

        let horizontalPadding = textWidth * (1.5 / 1.9); // Уменьшаем горизонтальные отступы в 1.9 раза
        let verticalPadding = height * (0.058 / 1.9); // Уменьшаем вертикальные отступы в 1.9 раза

        let brickWidth = Math.max(
          0.00000000001 * width,
          textWidth + horizontalPadding,
        );
        let brickHeight = verticalPadding + fontSize;

        if (window.innerWidth < 767) {
          const scaleFactor = 1.5;
          horizontalPadding = textWidth * 0.85;
          verticalPadding = height * 0.09;
          brickWidth *= scaleFactor;
          brickHeight *= scaleFactor;
        }

        const x = Math.random() * (width - brickWidth) + brickWidth / 2;
        const y = brickHeight / 2;
        const color = colors[index % colors.length];
        const body = Bodies.rectangle(x, y, brickWidth, brickHeight, {
          render: {
            fillStyle: color,
            strokeStyle: "none",
          },
          chamfer: { radius: 0.0059 * width },
          label: brick.service,
          restitution: 0.9,
          friction: 0.3,
        });
        Body.rotate(body, Math.random() * Math.PI);
        return body;
      });

      World.add(engine.value.world, [ground, leftWall, rightWall, ceiling]);

      let currentBrickIndex = 0;
      const dropBrick = () => {
        if (currentBrickIndex < brickBodies.length) {
          World.add(engine.value.world, brickBodies[currentBrickIndex]);
          currentBrickIndex += 1;
          setTimeout(dropBrick, 300); // Увеличиваем частоту падения кирпичей
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
          const funnelX = funnelArea.left + window.scrollX;
          const funnelY = funnelArea.top + window.scrollY;
          const funnelWidth = funnelArea.width;
          const funnelHeight = funnelArea.height;

          console.log("Position:", position);
          console.log("Funnel Area:", funnelArea);

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
          const maxSpeed = 15;
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
        const fontWeight = "bold";
        let fontSize = 1.9 * (width / 100);
        context.font = `${fontWeight} ${fontSize}px 'Montserrat'`;
        context.fillStyle = "#002d6e";
        context.textAlign = "center";
        context.textBaseline = "middle";

        if (window.innerWidth < 767) {
          const scaleFactorText = 1.7;
          const fontWeight = "bold";
          fontSize = 2 * (width / 100) * scaleFactorText;
          context.font = `${fontWeight} ${fontSize}px 'Montserrat'`;
        }

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
      wrapMouseCreate();

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

      runner.value = Runner.create();
      Runner.run(runner.value, engine.value);

      Render.run(renderBackground.value);
      Render.run(renderBricks.value);

      updateCanvasSize();

      window.addEventListener("resize", () => {
        updateCanvasSize();
        const verticalLayout = updateIsVerticalLayout();
        isDesktop.value = !verticalLayout;
        isVerticalLayout.value = verticalLayout;
        if (!verticalLayout) {
          isMenuOpen.value = false;
        }
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateCanvasSize);
      Render.stop(renderBackground.value);
      Render.stop(renderBricks.value);
      World.clear(engine.value.world);
      Engine.clear(engine.value);
      Runner.stop(runner.value);
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
      bricks: duplicatedBricks,
      handleDrop,
      isMenuOpen,
      submenuOpen,
      openMenu,
      closeMenu,
      toggleSubmenu,
      selectMenu,
      getMenuTitle,
      getMenuItems,
      activeMenu,
      isLightboxVisible,
      isDesktop,
      isVerticalLayout,
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
  top: 60%;
  right: 0.5%;
  width: 15%;
  height: 30%;
  z-index: 40;
  border-radius: 15%;
  z-index: 800;
  cursor: pointer;
  /* border: 2px solid #ff6400; */
}

.mosaic-logo {
  position: absolute;
  top: 14%;
  left: 10.7%;
  width: 80%;
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
  width: 100%;
  height: 100%;
  z-index: 800;
}

.bricks-frame {
  position: absolute;
  left: 2%;
  top: 2%;
  width: 6%;
  z-index: 802;
}
.bricks-frame:hover {
  cursor: pointer;
}

.ideas {
  margin-left: -0.5%;
  width: 102%;
  margin-top: 30%;
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

.grab {
  cursor: grab;
}

.grabbing {
  cursor: grabbing;
}

/* Styles for mobile menu */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background-color: #ff6400;
  z-index: 1000;
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.mobile-menu.open {
  right: 0;
}

.mobile-menu__header {
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem 0 0;
  color: #ffffff;
  opacity: 1;
}

.close-btn {
  font-size: 4rem;
  font-weight: bolder;
  cursor: pointer;
}

.mobile-menu__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  overflow: auto;
}

.menu-section {
  margin-top: 0;
  margin-left: 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 0.5rem 1rem;
  font-size: 2.5rem;
  font-family: "Montserrat";
  font-weight: bolder;
  cursor: pointer;
  color: #ffffff;
  display: flex;
  align-items: center;
}

.menu-item__arrow {
  margin-left: 10px;
  transition: transform 0.3s ease-in-out;
}

.menu-item__arrow.rotated {
  transform: translateY(3px) rotate(90deg);
}

.menu-item-about {
  padding: 0.5rem 1rem;
  font-size: 2.5rem;
  font-family: "Montserrat";
  font-weight: bolder;
  cursor: pointer;
  color: #ffffff;
}

.link-about {
  color: #ffffff;
  text-decoration: none;
}

.submenu {
  padding-left: 1rem;
}

.submenu-item {
  font-family: "Montserrat";
  padding: 0.5rem 0;
  font-size: 1.7rem;
  color: #ffffff;
}

.contact-section-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.contact-section {
  background-color: #002d6e;
  color: #ffffff;
  padding: 2rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 20px;
}

.mobile-menu__contact-section__header {
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-family: "Montserrat";
  justify-self: flex-start;
  margin: 0 0 0 2rem;
}

.contacts {
  margin-top: 2rem;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.contact-item-email,
.contact-item-phone,
.contact-item-telegram,
.contact-item-address {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  font-family: "Montserrat";
  font-size: 1.2rem;
  margin-left: 2rem;
}

.contact-item-email::before {
  content: url("../images/letter-logo.png");
  margin-right: 1.1rem;
}

.contact-item-phone::before {
  content: url("../images/phone-logo.png");
  margin-right: 1.1rem;
}

.contact-item-telegram::before {
  content: url("../images/telegram_logo.png");
  margin-right: 1.1rem;
}

.contact-item-address::before {
  content: url("../images/path-logo.png");
  margin-right: 1.1рем;
}

.menu__socials {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 3.5rem;
  padding: 0.5rem 0;
}

.menu__socials img {
  width: 150%;
}

.footer-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 1rem 1rem 2rem;
  background-color: #002d6e;
  color: #fff;
}

.footer-icon img {
  width: 100%;
}

.footer-text {
  text-align: right;
}

/* Styles for desktop menu */
.desktop-menu {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: #ff6400;
  z-index: 1000;
  transition: left 0.3s ease-in-out;
  flex-direction: column;
}

.desktop-menu.open {
  left: 0;
}

.desktop-menu__close-btn {
  font-size: 4rem;
  font-weight: bolder;
  cursor: pointer;
  color: #ffffff;
}

.desktop-menu__header {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  color: #ffffff;
}

.desktop-menu__content {
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5%;
  width: 58%;
  text-align: left;
}

.desktop-menu-item {
  font-size: 3rem;
  font-family: "Montserrat";
  font-weight: bolder;
  cursor: pointer;
  color: #ffffff;
  display: flex;
  justify-content: start;
  flex-direction: row;
  align-items: center;
}

.desktop-menu-item__arrow {
  margin-left: 10px;
}

.desktop-menu-item.active {
  border-bottom: 2px solid #ffffff;
}

.desktop-menu__dynamic-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 2rem;
  gap: 2rem;
}

.desktop-menu__dynamic-content--item {
  font-size: 3rem;
  font-family: "Montserrat";
  font-weight: bolder;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.5rem 0;
  text-decoration: none;
}
.desktop-menu-item-about {
  font-size: 3rem;
  font-family: "Montserrat";
  font-weight: bolder;
  cursor: pointer;
  color: #ffffff;
}

.close-btn__container {
  margin-top: 0;
  margin-left: 1%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.desktop-menu__contact-section-container {
  width: 42%;
  background-color: #002d6e;
  color: #ffffff;
  padding: 2rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 20px;
}
.desktop-menu__contact-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.desktop-menu__contact-section__header {
  display: flex;
  flex-direction: column;
  font-size: 3rem;
  font-family: "Montserrat";
  justify-self: flex-start;
  margin: 0 0 0 2rem;
}

.desktop-menu__socials {
  display: flex;
  justify-content: flex-start;
  gap: 3rem;
  padding: 0.5rem 0;
  padding-left: 3rem;
  margin-top: 5%;
  margin-left: 2rem;
}

.desktop-menu__facebook-logo {
  width: 150%;
}

.desktop-menu__instagram-logo {
  width: 150%;
}

@media (max-width: 2560px) {
  .add {
    top: 40%;
  }
  .add-arrow {
    top: 44%;
  }
  .contact-item-email,
  .contact-item-phone,
  .contact-item-telegram,
  .contact-item-address {
    margin: 0 !important;
  }
  .contact-item-address {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 1400px) {
  .ideas {
    margin-top: 32%;
  }
  .contact-item-address {
    text-align: start;
  }
  .desktop-menu__dynamic-content {
    text-align: start;
  }
  .add {
    top: 45%;
  }
  .add-arrow {
    top: 53%;
  }
  .contact-item-address {
    text-align: center;
  }
}

@media only screen and (min-width: 1366px) and (max-width: 1366px) and (min-height: 1024px) and (max-height: 1024px) {
  .ideas {
    margin-top: 34%;
  }
  .contact-item-address {
    text-align: center;
  }
  .desktop-menu__dynamic-content {
    text-align: start;
  }
}

@media only screen and (min-width: 1280px) and (max-width: 1280px) and (min-height: 800px) and (max-height: 800px) {
  .ideas {
    margin-top: 36%;
  }
  .contact-item-email,
  .contact-item-phone,
  .contact-item-telegram,
  .contact-item-address {
    padding-left: 1rem !important;
  }
  .contact-item-address {
    text-align: center;
  }
  .desktop-menu__dynamic-content {
    text-align: start;
  }
}

@media only screen and (min-width: 1180px) and (max-width: 1180px) and (min-height: 820px) and (max-height: 820px) {
  .ideas {
    margin-top: 36%;
  }
  .contact-item-email,
  .contact-item-phone,
  .contact-item-telegram,
  .contact-item-address {
    padding-left: 1rem !important;
  }
  .contact-item-address {
    text-align: start;
  }
  .desktop-menu__dynamic-content {
    text-align: start;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 1366px) and (max-height: 1366px) {
  img.bricks-frame {
    top: 9.5%;
    left: 82%;
    width: 12%;
  }
  .mosaic-logo {
    left: 10%;
    top: 10%;
    width: 58%;
  }

  .services-block {
    width: 25%;
    height: 45%;
    top: 60%;
    right: 3%;
  }
  .add {
    top: 37%;
  }
  .add-arrow {
    right: 15%;
    top: 50%;
  }
  .ideas {
    margin-top: 26%;

    width: 105%;
  }
  .mobile-menu__content {
    text-align: center;
  }

  .contact-section {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .contacts {
    width: 600px;
  }

  .mobile-menu__contact-section__header {
    margin-top: 2rem;
    font-size: 3rem;
  }
  .menu-section {
    margin-top: 0;
    margin-left: 1rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  .contact-item-email,
  .contact-item-phone,
  .contact-item-telegram,
  .contact-item-address {
    padding: auto;
  }

  .footer-icon {
    margin-bottom: 1rem;
  }
  .footer-icon img {
    width: 150% !important;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 768px) and (max-height: 768px) {
  .ideas {
    margin-top: 38%;
  }
  .contact-item-email,
  .contact-item-phone,
  .contact-item-telegram,
  .contact-item-address {
    padding-left: 1rem !important;
  }
  .contact-item-address {
    text-align: start;
  }
  .desktop-menu__dynamic-content {
    text-align: start;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 600px) and (max-height: 600px) {
  .contact-section__header {
    font-size: 2rem !important;
    font-family: "Montserrat";
    justify-self: center;
    text-align: center;
  }
  .contact-item-email,
  .contact-item-phone,
  .contact-item-telegram,
  .contact-item-address {
    font-size: 1.2rem !important;
    padding-left: 1rem !important;
  }
  .contact-item-address {
    text-align: start;
  }
  .desktop-menu__dynamic-content {
    text-align: start;
  }
  .footer-section {
    margin-top: 0 !important;
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

  .services-block {
    width: 15%;
    height: 25%;
    top: 75%;
    right: 7%;
  }

  .ideas {
    margin-top: 26%;
    margin-left: 5%;
    width: 90%;
  }

  .menu-section {
    text-align: center;
    gap: 1rem;
  }
  .menu-item {
    justify-content: center;
    gap: 1rem;
  }
  .contact-section {
    align-items: center;
  }
  .contacts {
    width: 600px;
    text-align: center;
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

  .services-block {
    width: 15%;
    height: 25%;
    top: 73%;
    right: 7%;
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
  .menu-section {
    text-align: center;
    gap: 1rem;
  }
  .menu-item {
    justify-content: center;
    gap: 1rem;
  }
  .contact-section {
    align-items: center;
  }
  .contacts {
    width: 600px;
    text-align: center;
  }
  .footer-section {
    margin-top: 0 !important;
  }
}

@media (min-width: 768px) {
  .desktop-menu {
    display: flex;
    flex-direction: row;
  }
  .contact-section__header {
    font-size: 3.5rem;
    font-family: "Montserrat";
    justify-self: flex-start;
    margin: 0 0 0 2rem;
  }
  .contact-item-email,
  .contact-item-phone,
  .contact-item-telegram,
  .contact-item-address {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    font-family: "Montserrat";
    font-size: 1.7rem;
    padding-left: 3rem;
  }

  .contact-item-email::before {
    content: url("../images/letter-logo.png");
    margin-right: 1.3rem;
  }

  .contact-item-phone::before {
    content: url("../images/phone-logo.png");
    margin-right: 1.3rem;
  }

  .contact-item-telegram::before {
    content: url("../images/telegram_logo.png");
    margin-right: 1.3rem;
  }

  .contact-item-address::before {
    content: url("../images/path-logo.png");
    margin-right: 1.3rem;
  }
  .footer-section {
    margin-top: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 1rem 1rem 2rem;
    background-color: #002d6e;
    color: #fff;
  }

  .footer-icon img {
    width: 110%;
  }
}

@media (max-width: 767px) {
  .falling-bricks {
    width: 100%;
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

  .services-block {
    width: 21%;
    height: 25%;
    top: 75%;
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

  .mobile-menu__contact-section__header {
    font-size: 2rem;
    margin-left: 0;
  }
  .contacts {
    width: 300px !important;
    margin-left: 2rem;
  }
  .menu-socials {
    margin-left: 0;
  }
}

@media (max-width: 390px) {
  .menu-item {
    font-size: 2rem;
  }
  .menu-item-about {
    font-size: 2rem;
  }
}
</style>
