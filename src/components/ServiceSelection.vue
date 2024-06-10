<template>
  <div class="service-selection" ref="serviceSelection">
    <div class="service-selection__upper">
      <img
        class="grow_buisness-with-mosaic"
        :class="{ animated: isGrowBusinessAnimating }"
        src="../images/grow_buisness-with-mosaic.png"
        alt="grow_buisness"
      />
      <img
        class="business-arrow__down"
        :class="{ animated: isArrowAnimating }"
        src="../images/business-arrow__down.png"
        alt="business-arrow__down"
      />

      <div class="funnel-container">
        <img
          :class="[
            'funnel-image',
            isPouring ? 'funnel-moving' : '',
            isAnimating ? 'funnel-animating' : '',
          ]"
          src="../images/logos/funnel.svg"
          alt="funnel"
          @click="pourWater"
          @dragenter.prevent="onDragEnterFunnel"
          @dragleave.prevent="onDragLeaveFunnel"
          @drop="onDrop"
          @dragover.prevent="onDragOverFunnel"
          @mouseenter="isHoveringOverFunnel = true"
          @mouseleave="isHoveringOverFunnel = false"
          @mousedown="startDragging"
        />
      </div>
      <div class="checkboxes-container">
        <form class="checkboxes">
          <div
            v-for="(service, index) in services"
            :key="service"
            :class="[
              'checkbox-item',
              { checked: selectedServices.includes(service) },
            ]"
          >
            <input
              :id="'service-' + index"
              :name="'service-' + index"
              type="checkbox"
              :value="service"
              v-model="selectedServices"
              @change="toggleService(service)"
            />
            <label :for="'service-' + index">{{ service }}</label>
          </div>
        </form>
      </div>
    </div>
    <div class="service-selection__lower">
      <div class="service-selection__lower--tree">
        <img
          class="business_up"
          :class="{ invisible: isGrown }"
          src="../images/business_up.svg"
          alt="business_up"
        />
        <img
          class="business_up-arrow"
          :class="{ invisible: isGrown }"
          src="../images/business_up-arrow.png"
          alt="business_up-arrow"
        />
        <img
          class="take-money"
          :class="{ invisible: isGrown }"
          src="../images/money.png"
          alt="take-money"
        />
        <img
          class="take-money__arrow"
          :class="{ invisible: isGrown }"
          src="../images/money-arrow.png"
          alt="money-arrow"
        />
        <div class="small-tree__container">
          <transition name="tree-fade">
            <img
              v-if="showSmallTree"
              class="small-tree"
              src="@/images/small-tree.svg"
              alt="small-tree"
            />
          </transition>
          <transition name="tree-grow" @after-enter="onTreeGrown">
            <img
              v-if="isGrown"
              class="big-tree"
              :class="{ 'tree-grow': isGrown }"
              src="@/images/big-tree.png"
              alt="big-tree"
            />
          </transition>
          <transition-group name="coins-appear">
            <img
              v-for="(coin, index) in coins"
              :key="index"
              :class="['big-coin', 'coin-' + index]"
              :src="coin"
              alt="coin"
            />
          </transition-group>
        </div>
        <div class="ground-container">
          <img class="ground" src="../images/ground.png" alt="ground" />
        </div>

        <div class="drops-container">
          <img
            v-for="(drop, index) in drops"
            :key="index"
            :class="['drop', drop.size]"
            :src="drop.src"
            alt="drop"
          />
        </div>
      </div>
      <div class="service-selection__lower--cases">
        <div class="service-selection__lower--cases-arrow">
          <img
            class="cases-arrow"
            src="../images/logos/cases-arrow.png"
            alt="cases-arrow"
          />
        </div>
        <div class="service-selection__lower--cases-image">
          <img
            class="cases-image"
            src="../images/logos/cases.png"
            alt="cases"
          />
        </div>
      </div>
    </div>

    <!-- <transition name="fade">
      <div v-if="showLightbox" class="lightbox" @click.self="closeLightbox">
        <div class="lightbox-content">
          <h2>Поживна суміш для зростання:</h2>
          <div class="lightbox__checkboxes-container">
            <form class="lightbox-checkboxes">
              <div
                v-for="(service, index) in services"
                :key="service"
                :class="[
                  'checkbox-item',
                  { checked: selectedServices.includes(service) },
                ]"
              >
                <input
                  :id="'lightbox-service-' + index"
                  :name="'lightbox-service-' + index"
                  type="checkbox"
                  :value="service"
                  v-model="lightboxSelectedServices"
                />
                <label :for="'lightbox-service-' + index">{{ service }}</label>
              </div>
            </form>
          </div>
          <div class="form">
            <input
              type="text"
              v-model="lightboxName"
              placeholder="Ім'я"
              required
            />
            <input
              type="tel"
              v-model="lightboxPhone"
              placeholder="Телефон"
              required
            />
            <textarea
              v-model="lightboxMessage"
              placeholder="Повідомлення"
              required
            ></textarea>
            <button @click="applySelection">Застосувати</button>
          </div>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import dropBig from "../images/drop-big.png";
import dropMedium from "../images/drop-medium.png";
import dropSmall from "../images/drop-small.png";
import dropBig1 from "../images/drop-big1.png";
import dropMedium1 from "../images/drop-medium1.png";
import dropSmall1 from "../images/drop-small1.png";
import { useRouter } from "vue-router";

export default {
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
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

    const selectedServices = computed(() => store.getters.selectedServices);
    const lightboxSelectedServices = ref([]);
    const isPouring = ref(false);
    const isGrown = ref(false);
    const showSmallTree = ref(true);
    const showLightbox = ref(false);
    const coins = ref([]);
    const drops = ref([]);
    const isHoveringOverFunnel = ref(false);
    const isGrowBusinessAnimating = ref(false);
    const lightboxName = ref("");
    const lightboxPhone = ref("");
    const lightboxMessage = ref("");
    const isArrowAnimating = ref(false);
    const isAnimating = ref(false);
    let checkboxCounter = 0;
    let arrowAnimationInterval;
    let growBusinessAnimationTimeout;

    watch(
      () => store.getters.animationTrigger,
      () => {
        startArrowAnimation();
        animateGrowBusiness();
        animateFunnel();
      },
    );

    const startArrowAnimation = () => {
      clearInterval(arrowAnimationInterval);
      isArrowAnimating.value = true;
      arrowAnimationInterval = setInterval(() => {
        isArrowAnimating.value = false;
        setTimeout(() => {
          isArrowAnimating.value = true;
        }, 1000);
      }, 2000);
    };

    const pourWater = () => {
      stopAllAnimations();
      isPouring.value = true;
      setTimeout(() => {
        createDrops();
      }, 1200);
      setTimeout(() => {
        growTree();
      }, 4000);
    };

    const createDrops = () => {
      const dropSizes = ["big1", "medium1", "small1", "big", "medium", "small"];
      const dropSources = {
        big: dropBig,
        medium: dropMedium,
        small: dropSmall,
        big1: dropBig1,
        medium1: dropMedium1,
        small1: dropSmall1,
      };
      let dropIndex = 0;

      const intervalId = setInterval(() => {
        if (dropIndex >= dropSizes.length) {
          clearInterval(intervalId);
          setTimeout(() => {
            drops.value = [];
          }, 4000);
          return;
        }

        drops.value.push({
          src: dropSources[dropSizes[dropIndex]],
          size: dropSizes[dropIndex],
        });

        dropIndex += 1;
      }, 400);
    };

    const growTree = () => {
      setTimeout(() => {
        isGrown.value = true;
        setTimeout(() => {
          showSmallTree.value = false;
        }, 1);
        isPouring.value = false;
      }, 1000);
    };

    const onTreeGrown = () => {
      const coinImages = Array(6).fill("../images/big-coin.png");
      coins.value = coinImages;
      setTimeout(() => {
        coins.value = [];
        setTimeout(() => {
          showLightbox.value = true;
          lightboxSelectedServices.value = [...selectedServices.value];
        }, 2000);
      }, 500);
    };

    const onDrop = (event) => {
      const service = event.dataTransfer.getData("service");
      console.log("Dropped service:", service);
      store.dispatch("addService", service);
    };

    const onDragOverFunnel = (event) => {
      event.preventDefault();
      const service = event.dataTransfer.getData("service");
      store.dispatch("addService", service);
    };

    const onDragEnterFunnel = () => {
      isHoveringOverFunnel.value = true;
    };

    const onDragLeaveFunnel = () => {
      isHoveringOverFunnel.value = false;
    };

    const applySelection = () => {
      emit("apply-selection");
      router.push("/second-page");
    };

    const closeLightbox = () => {
      showLightbox.value = false;
    };

    const toggleService = (service) => {
      if (selectedServices.value.includes(service)) {
        store.dispatch("removeService", service);
      } else {
        store.dispatch("addService", service);
        checkboxCounter += 1;
        if (checkboxCounter === 1) {
          startArrowAnimation();
        }
        animateFunnel();
      }
      animateGrowBusiness();
    };

    const animateGrowBusiness = () => {
      clearTimeout(growBusinessAnimationTimeout);
      isGrowBusinessAnimating.value = true;
      growBusinessAnimationTimeout = setTimeout(() => {
        isGrowBusinessAnimating.value = false;
      }, 1000);
    };

    const animateFunnel = () => {
      isAnimating.value = true;
      setTimeout(() => {
        isAnimating.value = false;
        isGrowBusinessAnimating.value = false;
      }, 1000);
    };

    const stopAllAnimations = () => {
      clearInterval(arrowAnimationInterval);
      clearTimeout(growBusinessAnimationTimeout);
      isArrowAnimating.value = false;
      isGrowBusinessAnimating.value = false;
    };

    return {
      services,
      selectedServices,
      lightboxSelectedServices,
      pourWater,
      isPouring,
      isGrown,
      showSmallTree,
      showLightbox,
      coins,
      onTreeGrown,
      drops,
      onDrop,
      isHoveringOverFunnel,
      onDragOverFunnel,
      onDragEnterFunnel,
      onDragLeaveFunnel,
      lightboxName,
      lightboxPhone,
      lightboxMessage,
      applySelection,
      closeLightbox,
      toggleService,
      isArrowAnimating,
      isAnimating,
      isGrowBusinessAnimating,
    };
  },
};
</script>

<style>
.service-selection {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.service-selection__upper {
  position: relative;
  background-color: #828282;
  width: 100%;
  height: 60%;
}

.funnel-container {
  position: absolute;
  top: 28%;
  right: 4%;
  width: 40%;
  height: 50%;
  z-index: 10;
}

@media (max-width: 2992px) {
  .funnel-container {
    width: 40%;
  }
}

.funnel-image {
  cursor: pointer;
  width: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 2s ease-in-out;
  z-index: 10;
}

.funnel-animating {
  transform: scale(1.3);
}

.funnel-moving {
  transform: translateX(-200px) translateY(180px) rotate(-60deg);
}

@media (max-width: 3000px) {
  .funnel-moving {
    transform: translateX(-250px) translateY(180px) rotate(-60deg);
  }
}

@media (max-width: 1920px) {
  .funnel-moving {
    transform: translateX(-200px) translateY(200px) rotate(-60deg);
  }
}

@media (max-width: 1400px) {
  .funnel-moving {
    transform: translateX(-140px) translateY(220px) rotate(-60deg);
  }
}

.drops-container {
  position: absolute;
  top: 177px;
  left: 45%;
  transform: translate(-50%, -100%);
  pointer-events: none;
}

.drop {
  left: calc(50% - 40px);
  animation: drop-fall 3s linear forwards;
}

.drop.small {
  width: 15px;
  height: 15px;
}
.drop.small1 {
  width: 20px;
  height: 20px;
}

.drop.medium {
  width: 25px;
  height: 25px;
}

.drop.medium1 {
  width: 30px;
  height: 30px;
}

.drop.big {
  width: 35px;
  height: 35px;
}

.drop.big1 {
  width: 40px;
  height: 40px;
}

@media (max-width: 1400px) and (max-height: 933px) {
  .drops-container {
    .drop.small {
      width: 10px;
      height: 10px;
    }
    .drop.small1 {
      width: 12px;
      height: 12px;
    }

    .drop.medium {
      width: 15px;
      height: 15px;
    }

    .drop.medium1 {
      width: 18px;
      height: 18px;
    }

    .drop.big {
      width: 20px;
      height: 20px;
    }

    .drop.big1 {
      width: 25px;
      height: 25px;
    }
  }
}

@media (max-width: 3000px) {
  .drops-container {
    top: 30%;
    left: 34%;
  }
}

@media (max-width: 1920px) and (max-height: 1083px) {
  .drops-container {
    top: 30%;
    left: 32%;
  }
}

@media (max-width: 1920px) and (max-height: 963px) {
  .drops-container {
    top: 35%;
    left: 32%;
  }
}

@media (max-width: 1884px) {
  .drops-container {
    top: 30%;
    left: 32%;
  }
}

@keyframes drop-fall {
  0% {
    opacity: 1;
    transform: translateY(6px);
  }
  1% {
    opacity: 0.99;
    transform: translateY(12px);
  }
  2% {
    opacity: 0.98;
    transform: translateY(18px);
  }
  3% {
    opacity: 0.97;
    transform: translateY(24px);
  }
  4% {
    opacity: 0.96;
    transform: translateY(30px);
  }
  5% {
    opacity: 0.95;
    transform: translateY(36px);
  }
  6% {
    opacity: 0.94;
    transform: translateY(42px);
  }
  7% {
    opacity: 0.93;
    transform: translateY(48px);
  }
  8% {
    opacity: 0.92;
    transform: translateY(54px);
  }
  9% {
    opacity: 0.91;
    transform: translateY(60px);
  }
  10% {
    opacity: 0.9;
    transform: translateY(66px);
  }
  11% {
    opacity: 0.89;
    transform: translateY(72px);
  }
  12% {
    opacity: 0.88;
    transform: translateY(78px);
  }
  13% {
    opacity: 0.87;
    transform: translateY(84px);
  }
  14% {
    opacity: 0.86;
    transform: translateY(90px);
  }
  15% {
    opacity: 0.85;
    transform: translateY(96px);
  }
  16% {
    opacity: 0.84;
    transform: translateY(102px);
  }
  17% {
    opacity: 0.83;
    transform: translateY(108px);
  }
  18% {
    opacity: 0.82;
    transform: translateY(114px);
  }
  19% {
    opacity: 0.81;
    transform: translateY(120px);
  }
  20% {
    opacity: 0.8;
    transform: translateY(126px);
  }
  21% {
    opacity: 0.79;
    transform: translateY(132px);
  }
  22% {
    opacity: 0.78;
    transform: translateY(138px);
  }
  23% {
    opacity: 0.77;
    transform: translateY(144px);
  }
  24% {
    opacity: 0.76;
    transform: translateY(150px);
  }
  25% {
    opacity: 0.75;
    transform: translateY(156px);
  }
  26% {
    opacity: 0.74;
    transform: translateY(162px);
  }
  27% {
    opacity: 0.73;
    transform: translateY(168px);
  }
  28% {
    opacity: 0.72;
    transform: translateY(174px);
  }
  29% {
    opacity: 0.71;
    transform: translateY(180px);
  }
  30% {
    opacity: 0.7;
    transform: translateY(186px);
  }
  31% {
    opacity: 0.69;
    transform: translateY(192px);
  }
  32% {
    opacity: 0.68;
    transform: translateY(198px);
  }
  33% {
    opacity: 0.67;
    transform: translateY(204px);
  }
  34% {
    opacity: 0.66;
    transform: translateY(210px);
  }
  35% {
    opacity: 0.65;
    transform: translateY(216px);
  }
  36% {
    opacity: 0.64;
    transform: translateY(222px);
  }
  37% {
    opacity: 0.63;
    transform: translateY(228px);
  }
  38% {
    opacity: 0.62;
    transform: translateY(234px);
  }
  39% {
    opacity: 0.61;
    transform: translateY(240px);
  }
  40% {
    opacity: 0.6;
    transform: translateY(246px);
  }
  41% {
    opacity: 0.59;
    transform: translateY(252px);
  }
  42% {
    opacity: 0.58;
    transform: translateY(258px);
  }
  43% {
    opacity: 0.57;
    transform: translateY(264px);
  }
  44% {
    opacity: 0.56;
    transform: translateY(270px);
  }
  45% {
    opacity: 0.55;
    transform: translateY(276px);
  }
  46% {
    opacity: 0.54;
    transform: translateY(282px);
  }
  47% {
    opacity: 0.53;
    transform: translateY(288px);
  }
  48% {
    opacity: 0.52;
    transform: translateY(294px);
  }
  49% {
    opacity: 0.51;
    transform: translateY(300px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(306px);
  }
  51% {
    opacity: 0.49;
    transform: translateY(312px);
  }
  52% {
    opacity: 0.48;
    transform: translateY(318px);
  }
  53% {
    opacity: 0.47;
    transform: translateY(324px);
  }
  54% {
    opacity: 0.46;
    transform: translateY(330px);
  }
  55% {
    opacity: 0.45;
    transform: translateY(336px);
  }
  56% {
    opacity: 0.44;
    transform: translateY(342px);
  }
  57% {
    opacity: 0.43;
    transform: translateY(348px);
  }
  58% {
    opacity: 0.42;
    transform: translateY(354px);
  }
  59% {
    opacity: 0.41;
    transform: translateY(360px);
  }
  60% {
    opacity: 0.4;
    transform: translateY(366px);
  }
  61% {
    opacity: 0.39;
    transform: translateY(372px);
  }
  62% {
    opacity: 0.38;
    transform: translateY(378px);
  }
  63% {
    opacity: 0.37;
    transform: translateY(384px);
  }
  64% {
    opacity: 0.36;
    transform: translateY(390px);
  }
  65% {
    opacity: 0.35;
    transform: translateY(396px);
  }
  66% {
    opacity: 0.34;
    transform: translateY(402px);
  }
  67% {
    opacity: 0.33;
    transform: translateY(408px);
  }
  68% {
    opacity: 0.32;
    transform: translateY(414px);
  }
  69% {
    opacity: 0.31;
    transform: translateY(420px);
  }
  70% {
    opacity: 0.3;
    transform: translateY(426px);
  }
  71% {
    opacity: 0.29;
    transform: translateY(432px);
  }
  72% {
    opacity: 0.28;
    transform: translateY(438px);
  }
  73% {
    opacity: 0.27;
    transform: translateY(444px);
  }
  74% {
    opacity: 0.26;
    transform: translateY(450px);
  }
  75% {
    opacity: 0.25;
    transform: translateY(456px);
  }
  76% {
    opacity: 0.24;
    transform: translateY(462px);
  }
  77% {
    opacity: 0.23;
    transform: translateY(468px);
  }
  78% {
    opacity: 0.22;
    transform: translateY(474px);
  }
  79% {
    opacity: 0.21;
    transform: translateY(480px);
  }
  80% {
    opacity: 0.2;
    transform: translateY(486px);
  }
  81% {
    opacity: 0.19;
    transform: translateY(492px);
  }
  82% {
    opacity: 0.18;
    transform: translateY(498px);
  }
  83% {
    opacity: 0.17;
    transform: translateY(504px);
  }
  84% {
    opacity: 0.16;
    transform: translateY(510px);
  }
  85% {
    opacity: 0.15;
    transform: translateY(516px);
  }
  86% {
    opacity: 0.14;
    transform: translateY(522px);
  }
  87% {
    opacity: 0.13;
    transform: translateY(528px);
  }
  88% {
    opacity: 0.12;
    transform: translateY(534px);
  }
  89% {
    opacity: 0.11;
    transform: translateY(540px);
  }
  90% {
    opacity: 0.1;
    transform: translateY(546px);
  }
  91% {
    opacity: 0.09;
    transform: translateY(552px);
  }
  92% {
    opacity: 0.08;
    transform: translateY(558px);
  }
  93% {
    opacity: 0.07;
    transform: translateY(564px);
  }
  94% {
    opacity: 0.06;
    transform: translateY(570px);
  }
  95% {
    opacity: 0.05;
    transform: translateY(576px);
  }
  96% {
    opacity: 0.04;
    transform: translateY(582px);
  }
  97% {
    opacity: 0.03;
    transform: translateY(588px);
  }
  98% {
    opacity: 0.02;
    transform: translateY(594px);
  }
  99% {
    opacity: 0.01;
    transform: translateY(598px);
  }
  100% {
    opacity: 0;
    transform: translateY(600px);
  }
}

.drop-fall-enter-active {
  transition:
    transform 4s,
    opacity 1s;
}

.grow_buisness-with-mosaic {
  position: absolute;
  right: 7%;
  top: 7%;
  width: 32%;
  transition: transform 2s ease-in-out;
}

@media (max-width: 1400px) and (max-height: 933px) {
  .grow_buisness-with-mosaic {
    width: 29%;
  }
}

.grow_buisness-with-mosaic.animated {
  transform: scale(1.1);
}

.business-arrow__down {
  position: absolute;
  right: 5.5%;
  top: 15%;
  width: 7%;
}

.business-arrow__down.animated {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  100% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(-2px);
  }
  80% {
    transform: translateY(-4px);
  }
  70% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(-12px);
  }
  40% {
    transform: translateY(-14px);
  }
  30% {
    transform: translateY(-16px);
  }

  20% {
    transform: translateY(-18px);
  }
  10% {
    transform: translateY(-20px);
  }
  0% {
    transform: translateY(-22px);
  }
}

.service-selection__lower {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;
  z-index: 1;
}

.service-selection__lower--tree {
  position: relative;
  width: 82%;
  background-color: #ededed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1;
}

.ground-container {
  position: relative;
  height: 40%;
  width: 100%;
  z-index: 10;
}

.ground {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.small-tree__container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 60%;
  z-index: 20;
}

.small-tree {
  position: absolute;
  left: 30%;
  bottom: -17.5%;
  width: 15%;
  transition:
    opacity 0.0005s ease-out,
    transform 0.0005s ease-out;
  z-index: 90;
}

.small-tree.hidden {
  animation: fadeOut 0.0005s ease-out;
}

.big-tree {
  position: absolute;
  left: 30%;
  bottom: -15.5%;
  width: 15%;
  transform-origin: bottom;
  transition:
    width 3s ease-in-out,
    height 3s ease-in-out,
    opacity 1s ease-in-out;
  opacity: 0;
  z-index: 90;
}

.big-tree.tree-grow {
  transform: scale(3); /* Было 2 */
  opacity: 1;
  animation: growTree 3s ease-in-out forwards;
}

@media (max-width: 3000px) {
  .small-tree {
    bottom: -5%;
  }
  .big-tree {
    bottom: -5%;
  }
}
@media (max-width: 2992px) {
  .small-tree {
    bottom: -6%;
  }
  .big-tree {
    bottom: -2%;
  }
}
@media (max-width: 2691px) {
  .small-tree {
    bottom: -18%;
  }
  .big-tree {
    bottom: -16%;
  }
}
@media (max-width: 1920px) and (max-height: 1083px) {
  .small-tree {
    bottom: -20%;
  }
  .big-tree {
    bottom: -19%;
  }
}

@media (max-width: 1920px) and (max-height: 963px) {
  .small-tree {
    bottom: -10%;
  }
  .big-tree {
    bottom: -9%;
  }
}

@media (max-width: 1400px) and (max-height: 933px) {
  .small-tree {
    bottom: -20%;
    left: 26%;
    width: 20%;
  }
  .big-tree {
    bottom: -20%;
    width: 20%;
    left: 28%;
  }
}
@media (max-width: 1365px) {
  .small-tree {
    bottom: -25%;
  }
  .big-tree {
    bottom: -26%;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  1% {
    opacity: 0.9;
    transform: scale(0.9);
  }
  2% {
    opacity: 0.89;
    transform: scale(0.89);
  }
  3% {
    opacity: 0.88;
    transform: scale(0.88);
  }
  4% {
    opacity: 0.87;
    transform: scale(0.87);
  }
  5% {
    opacity: 0.86;
    transform: scale(0.86);
  }
  6% {
    opacity: 0.85;
    transform: scale(0.85);
  }
  7% {
    opacity: 0.84;
    transform: scale(0.84);
  }
  8% {
    opacity: 0.83;
    transform: scale(0.83);
  }
  9% {
    opacity: 0.82;
    transform: scale(0.82);
  }
  10% {
    opacity: 0.81;
    transform: scale(0.81);
  }
  11% {
    opacity: 0.8;
    transform: scale(0.8);
  }
  12% {
    opacity: 0.79;
    transform: scale(0.79);
  }
  13% {
    opacity: 0.78;
    transform: scale(0.78);
  }
  14% {
    opacity: 0.77;
    transform: scale(0.77);
  }
  15% {
    opacity: 0.76;
    transform: scale(0.76);
  }
  16% {
    opacity: 0.75;
    transform: scale(0.75);
  }
  17% {
    opacity: 0.74;
    transform: scale(0.74);
  }
  18% {
    opacity: 0.73;
    transform: scale(0.73);
  }
  19% {
    opacity: 0.72;
    transform: scale(0.72);
  }
  20% {
    opacity: 0.71;
    transform: scale(0.71);
  }
  21% {
    opacity: 0.7;
    transform: scale(0.7);
  }
  22% {
    opacity: 0.69;
    transform: scale(0.69);
  }
  23% {
    opacity: 0.68;
    transform: scale(0.68);
  }
  24% {
    opacity: 0.67;
    transform: scale(0.67);
  }
  25% {
    opacity: 0.66;
    transform: scale(0.66);
  }
  26% {
    opacity: 0.65;
    transform: scale(0.65);
  }
  27% {
    opacity: 0.64;
    transform: scale(0.64);
  }
  28% {
    opacity: 0.63;
    transform: scale(0.63);
  }
  29% {
    opacity: 0.62;
    transform: scale(0.62);
  }
  30% {
    opacity: 0.61;
    transform: scale(0.61);
  }
  31% {
    opacity: 0.6;
    transform: scale(0.6);
  }
  32% {
    opacity: 0.59;
    transform: scale(0.59);
  }
  33% {
    opacity: 0.58;
    transform: scale(0.58);
  }
  34% {
    opacity: 0.57;
    transform: scale(0.57);
  }
  35% {
    opacity: 0.56;
    transform: scale(0.56);
  }
  36% {
    opacity: 0.55;
    transform: scale(0.55);
  }
  37% {
    opacity: 0.54;
    transform: scale(0.54);
  }
  38% {
    opacity: 0.53;
    transform: scale(0.53);
  }
  39% {
    opacity: 0.52;
    transform: scale(0.52);
  }
  40% {
    opacity: 0.51;
    transform: scale(0.51);
  }
  41% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  42% {
    opacity: 0.49;
    transform: scale(0.49);
  }
  43% {
    opacity: 0.48;
    transform: scale(0.48);
  }
  44% {
    opacity: 0.47;
    transform: scale(0.47);
  }
  45% {
    opacity: 0.46;
    transform: scale(0.46);
  }
  46% {
    opacity: 0.45;
    transform: scale(0.45);
  }
  47% {
    opacity: 0.44;
    transform: scale(0.44);
  }
  48% {
    opacity: 0.43;
    transform: scale(0.43);
  }
  49% {
    opacity: 0.42;
    transform: scale(0.42);
  }
  50% {
    opacity: 0.41;
    transform: scale(0.41);
  }
  51% {
    opacity: 0.4;
    transform: scale(0.4);
  }
  52% {
    opacity: 0.39;
    transform: scale(0.39);
  }
  53% {
    opacity: 0.38;
    transform: scale(0.38);
  }
  54% {
    opacity: 0.37;
    transform: scale(0.37);
  }
  55% {
    opacity: 0.36;
    transform: scale(0.36);
  }
  56% {
    opacity: 0.35;
    transform: scale(0.35);
  }
  57% {
    opacity: 0.34;
    transform: scale(0.34);
  }
  58% {
    opacity: 0.33;
    transform: scale(0.33);
  }
  59% {
    opacity: 0.32;
    transform: scale(0.32);
  }
  60% {
    opacity: 0.31;
    transform: scale(0.31);
  }
  61% {
    opacity: 0.3;
    transform: scale(0.3);
  }
  62% {
    opacity: 0.29;
    transform: scale(0.29);
  }
  63% {
    opacity: 0.28;
    transform: scale(0.28);
  }
  64% {
    opacity: 0.27;
    transform: scale(0.27);
  }
  65% {
    opacity: 0.26;
    transform: scale(0.26);
  }
  66% {
    opacity: 0.25;
    transform: scale(0.25);
  }
  67% {
    opacity: 0.24;
    transform: scale(0.24);
  }
  68% {
    opacity: 0.23;
    transform: scale(0.23);
  }
  69% {
    opacity: 0.22;
    transform: scale(0.22);
  }
  70% {
    opacity: 0.21;
    transform: scale(0.21);
  }
  71% {
    opacity: 0.2;
    transform: scale(0.2);
  }
  72% {
    opacity: 0.19;
    transform: scale(0.19);
  }
  73% {
    opacity: 0.18;
    transform: scale(0.18);
  }
  74% {
    opacity: 0.17;
    transform: scale(0.17);
  }
  75% {
    opacity: 0.16;
    transform: scale(0.16);
  }
  76% {
    opacity: 0.15;
    transform: scale(0.15);
  }
  77% {
    opacity: 0.14;
    transform: scale(0.14);
  }
  78% {
    opacity: 0.13;
    transform: scale(0.13);
  }
  79% {
    opacity: 0.12;
    transform: scale(0.12);
  }
  80% {
    opacity: 0.11;
    transform: scale(0.11);
  }
  81% {
    opacity: 0.1;
    transform: scale(0.1);
  }
  82% {
    opacity: 0.09;
    transform: scale(0.09);
  }
  83% {
    opacity: 0.08;
    transform: scale(0.08);
  }
  84% {
    opacity: 0.07;
    transform: scale(0.07);
  }
  85% {
    opacity: 0.06;
    transform: scale(0.06);
  }
  86% {
    opacity: 0.05;
    transform: scale(0.05);
  }
  87% {
    opacity: 0.04;
    transform: scale(0.04);
  }
  88% {
    opacity: 0.03;
    transform: scale(0.03);
  }
  89% {
    opacity: 0.02;
    transform: scale(0.02);
  }
  100% {
    opacity: 0;
    transform: scale(0.01);
  }
}

@keyframes growTree {
  0% {
    transform: scale(1);
  }
  1% {
    transform: scale(1.02); /* 3/150 = 0.02 */
  }
  2% {
    transform: scale(1.04); /* 3/150 * 2 = 0.04 */
  }
  3% {
    transform: scale(1.06);
  }
  4% {
    transform: scale(1.08);
  }
  5% {
    transform: scale(1.1);
  }
  6% {
    transform: scale(1.12);
  }
  7% {
    transform: scale(1.14);
  }
  8% {
    transform: scale(1.16);
  }
  9% {
    transform: scale(1.18);
  }
  10% {
    transform: scale(1.2);
  }
  11% {
    transform: scale(1.22);
  }
  12% {
    transform: scale(1.24);
  }
  13% {
    transform: scale(1.26);
  }
  14% {
    transform: scale(1.28);
  }
  15% {
    transform: scale(1.3);
  }
  16% {
    transform: scale(1.32);
  }
  17% {
    transform: scale(1.34);
  }
  18% {
    transform: scale(1.36);
  }
  19% {
    transform: scale(1.38);
  }
  20% {
    transform: scale(1.4);
  }
  21% {
    transform: scale(1.42);
  }
  22% {
    transform: scale(1.44);
  }
  23% {
    transform: scale(1.46);
  }
  24% {
    transform: scale(1.48);
  }
  25% {
    transform: scale(1.5);
  }
  26% {
    transform: scale(1.52);
  }
  27% {
    transform: scale(1.54);
  }
  28% {
    transform: scale(1.56);
  }
  29% {
    transform: scale(1.58);
  }
  30% {
    transform: scale(1.6);
  }
  31% {
    transform: scale(1.62);
  }
  32% {
    transform: scale(1.64);
  }
  33% {
    transform: scale(1.66);
  }
  34% {
    transform: scale(1.68);
  }
  35% {
    transform: scale(1.7);
  }
  36% {
    transform: scale(1.72);
  }
  37% {
    transform: scale(1.74);
  }
  38% {
    transform: scale(1.76);
  }
  39% {
    transform: scale(1.78);
  }
  40% {
    transform: scale(1.8);
  }
  41% {
    transform: scale(1.82);
  }
  42% {
    transform: scale(1.84);
  }
  43% {
    transform: scale(1.86);
  }
  44% {
    transform: scale(1.88);
  }
  45% {
    transform: scale(1.9);
  }
  46% {
    transform: scale(1.92);
  }
  47% {
    transform: scale(1.94);
  }
  48% {
    transform: scale(1.96);
  }
  49% {
    transform: scale(1.98);
  }
  50% {
    transform: scale(2);
  }
  51% {
    transform: scale(2.02);
  }
  52% {
    transform: scale(2.04);
  }
  53% {
    transform: scale(2.06);
  }
  54% {
    transform: scale(2.08);
  }
  55% {
    transform: scale(2.1);
  }
  56% {
    transform: scale(2.12);
  }
  57% {
    transform: scale(2.14);
  }
  58% {
    transform: scale(2.16);
  }
  59% {
    transform: scale(2.18);
  }
  60% {
    transform: scale(2.2);
  }
  61% {
    transform: scale(2.22);
  }
  62% {
    transform: scale(2.24);
  }
  63% {
    transform: scale(2.26);
  }
  64% {
    transform: scale(2.28);
  }
  65% {
    transform: scale(2.3);
  }
  66% {
    transform: scale(2.32);
  }
  67% {
    transform: scale(2.34);
  }
  68% {
    transform: scale(2.36);
  }
  69% {
    transform: scale(2.38);
  }
  70% {
    transform: scale(2.4);
  }
  71% {
    transform: scale(2.42);
  }
  72% {
    transform: scale(2.44);
  }
  73% {
    transform: scale(2.46);
  }
  74% {
    transform: scale(2.48);
  }
  75% {
    transform: scale(2.5);
  }
  76% {
    transform: scale(2.52);
  }
  77% {
    transform: scale(2.54);
  }
  78% {
    transform: scale(2.56);
  }
  79% {
    transform: scale(2.58);
  }
  80% {
    transform: scale(2.6);
  }
  81% {
    transform: scale(2.62);
  }
  82% {
    transform: scale(2.64);
  }
  83% {
    transform: scale(2.66);
  }
  84% {
    transform: scale(2.68);
  }
  85% {
    transform: scale(2.7);
  }
  86% {
    transform: scale(2.72);
  }
  87% {
    transform: scale(2.74);
  }
  88% {
    transform: scale(2.76);
  }
  89% {
    transform: scale(2.78);
  }
  90% {
    transform: scale(2.8);
  }
  91% {
    transform: scale(2.82);
  }
  92% {
    transform: scale(2.84);
  }
  93% {
    transform: scale(2.86);
  }
  94% {
    transform: scale(2.88);
  }
  95% {
    transform: scale(2.9);
  }
  96% {
    transform: scale(2.92);
  }
  97% {
    transform: scale(2.94);
  }
  98% {
    transform: scale(2.96);
  }
  99% {
    transform: scale(2.98);
  }
  100% {
    transform: scale(3); /* Было 2 */
  }
}

.big-coin {
  position: absolute;
  transition: transform 2s ease-in-out;
  transform: scale(0);
}

.coin-0 {
  top: 20px;
  left: 20px;
}

.coin-1 {
  top: 40px;
  left: 40px;
}

.coin-2 {
  top: 60px;
  left: 60px;
}

.coin-3 {
  top: 80px;
  left: 80px;
}

.coin-4 {
  top: 100px;
  left: 100px;
}

.coin-5 {
  top: 120px;
  left: 120px;
}

.big-coin.appear {
  transform: scale(1);
}

.coins-appear-enter-active {
  transition: transform 3s;
}

.business_up {
  margin-top: 4%;
  margin-left: 4%;
  width: 29%;
  z-index: 50;
}

.business_up-arrow {
  margin-top: 1%;
  margin-left: 16%;
  width: 10%;
  z-index: 50;
}

.take-money {
  position: absolute;
  right: 25%;
  top: 45%;
  width: 29%;
  z-index: 50;
}

.take-money__arrow {
  position: absolute;
  top: 56%;
  right: 47%;
  width: 10%;
  z-index: 50;
}

@media (max-width: 3000px) {
  .business_up {
    width: 25%;
  }
  .business_up-arrow {
    margin-top: 1%;
    margin-left: 16%;
    width: 10%;
  }
}

@media (max-width: 1920px) and (max-height: 963px) {
  .take-money {
    right: 25%;
    top: 40%;
    width: 30%;
  }
  .take-money__arrow {
    top: 50%;
    right: 46%;
    width: 11%;
  }
}

@media (max-width: 1400px) and (max-height: 933px) {
  .business_up {
    width: 40%;
  }
  .business_up-arrow {
    margin-top: 1%;
    margin-left: 5%;
    width: 20%;
  }
  .take-money {
    right: 20%;
    top: 48%;
    width: 40%;
  }
  .take-money__arrow {
    top: 57%;
    right: 45%;
    width: 12%;
  }
}

.service-selection__lower--cases {
  position: relative;
  width: 18%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
}

.service-selection__lower--cases-arrow {
  width: 100%;
}

.cases-arrow {
  margin-left: 40%;
  width: 50%;
}

.cases-image {
  width: 60%;
}

.service-selection__lower--cases-image {
  width: 100%;
}

@media (max-width: 3000px) {
  .cases-arrow {
    margin-left: 30%;
    width: 55%;
  }
  .cases-image {
    width: 70%;
  }
}

@media (max-width: 2691px) {
  .cases-arrow {
    margin-left: 30%;
    width: 55%;
  }
  .cases-image {
    width: 75%;
  }
}

@media (max-width: 1920px) and (max-height: 1083px) {
  .cases-image {
    width: 76%;
  }
}

@media (max-width: 1920px) and (max-height: 963px) {
  .cases-image {
    width: 70%;
  }
}

@media (max-width: 1400px) and (max-height: 933px) {
  .service-selection__lower--cases {
    justify-content: center;
    gap: 4%;
  }
  .cases-arrow {
    margin-left: 15%;
    width: 68%;
  }
  .cases-image {
    width: 85%;
  }
}

.checkboxes-container {
  position: absolute;
  left: 2%;
  top: 30%;
  width: 50%;
  height: 47%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkboxes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5%;
  width: 100%;
  height: 100%;
}

.checkbox-item {
  display: flex;
  align-items: center;
  font-family: "Montserrat";
  font-weight: 10%;
  color: #9e9e9e;
  width: 100%;
  box-sizing: border-box;
}

.checkbox-item label {
  font-size: 90%;
}

.checkbox-item.checked {
  color: #ffffff;
}

.checkbox-item input {
  margin-right: 10px;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid #9e9e9e;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
}

.checkbox-item input:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-image: url("../images/logos/check-icon.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
}

@media (max-width: 3000px) {
  .checkboxes-container {
    top: 8%;
    width: 55%;
    height: 65%;
  }
  .checkboxes {
    grid-gap: 8%;
  }
  .checkbox-item {
    width: 170%;
    font-weight: 20%;
  }
  .checkbox-item label {
    font-size: 130%;
  }
}

@media (max-width: 2992px) {
  .checkboxes-container {
    top: 15%;
    width: 50%;
    height: 60%;
  }
  .checkboxes {
    grid-gap: 8%;
  }
  .checkbox-item {
    width: 150%;
    font-weight: 15%;
  }
  .checkbox-item label {
    font-size: 120%;
  }
}

@media (max-width: 1920px) and (max-height: 1083px) {
  .checkboxes-container {
    top: 10%;
    left: 5%;
    width: 50%;
    height: 60%;
  }
}

@media (max-width: 1920px) and (max-height: 963px) {
  .checkboxes-container {
    top: 10%;
    left: 5%;
    width: 40%;
    height: 65%;
  }
  .checkboxes {
    grid-gap: 6%;
  }
  .checkbox-item label {
    font-size: 110%;
  }
}

@media (max-width: 1400px) and (max-height: 933px) {
  .checkboxes-container {
    top: 6%;
    width: 15%;
  }
  .checkboxes {
    grid-gap: 8%;
  }
  .checkbox-item {
    width: 100%;
    font-weight: 10%;
  }
  .checkbox-item label {
    font-size: 100%;
  }
}

.lightbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.lightbox-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 80px);
  color: #ededed;
  background-color: #0049af;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  z-index: 999;
}

.lightbox-content h2 {
  font-size: 36px;
  margin-bottom: 80px;
  z-index: 999;
}

.lightbox__checkboxes-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.lightbox-checkboxes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  animation: fadeInLightbox 1s;
}

@keyframes fadeInLightbox {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-leave-active {
  animation: fadeOutLightbox 1s;
}

@keyframes fadeOutLightbox {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.form {
  margin-top: 20px;
  margin-bottom: 40px;
  width: 366px;
  height: 220px;
}

.form input {
  border-radius: 8px;
  height: 35px;
  font-size: 16px;
  font-family: "Montserrat";
}

.form textarea {
  border-radius: 8px;
  height: 98px;
  font-size: 16px;
  font-family: "Montserrat";
}

.form button {
  margin-top: 20px;
  width: 275px;
  height: 52px;
  background-color: #ff6400;
}

.form input,
.form textarea {
  width: 80%;
  margin: 10px 0;
  padding: 10px;
}

.form button {
  background-color: #ff6400;
  font-size: 18px;
  padding: 9.43px 18.85px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.invisible {
  visibility: hidden;
  opacity: 0;
}

@media (max-width: 1280px) and (max-height: 800px) {
  .checkboxes-container {
    top: 10%;
    width: 10%;
  }
  .checkboxes {
    grid-gap: 5%;
  }
  .checkbox-item {
    width: 100%;
    font-weight: 8%;
  }
  .checkbox-item label {
    font-size: 80%;
  }
  .business_up {
    width: 30%;
  }
  .business_up-arrow {
    margin-left: 10%;
    width: 15%;
  }
  .take-money {
    top: 40%;
  }
  .take-money__arrow {
    top: 50%;
  }
  .small-tree {
    bottom: -21%;
  }
  .big-tree {
    bottom: -21%;
  }
}
</style>
