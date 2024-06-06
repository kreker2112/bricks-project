<template>
  <div class="service-selection" ref="serviceSelection">
    <div class="service-selection__upper">
      <img
        class="grow_buisness-with-mosaic"
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
          src="../images/business_up.svg"
          alt="business_up"
        />
        <img
          class="business_up-arrow"
          src="../images/business_up-arrow.png"
          alt="business_up-arrow"
        />
        <transition name="tree-fade">
          <img
            v-if="showSmallTree"
            class="small-tree"
            src="../images/small-tree.svg"
            alt="small-tree"
          />
        </transition>
        <transition name="tree-grow" @after-enter="onTreeGrown">
          <img
            v-if="isGrown"
            class="big-tree"
            :class="{ 'tree-grow': isGrown }"
            src="../images/big-tree.png"
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
        <img
          class="cases-arrow"
          src="../images/logos/cases-arrow.png"
          alt="cases-arrow"
        />
      </div>
    </div>

    <transition name="fade">
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
    </transition>
  </div>
</template>

<script>
import { ref, computed } from "vue";
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

    const lightboxName = ref("");
    const lightboxPhone = ref("");
    const lightboxMessage = ref("");
    const isArrowAnimating = ref(false);
    const isAnimating = ref(false);
    let checkboxCounter = 0;

    const pourWater = () => {
      isPouring.value = true;
      setTimeout(() => {
        createDrops();
      }, 2000);
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
          }, 6000);
          return;
        }

        drops.value.push({
          src: dropSources[dropSizes[dropIndex]],
          size: dropSizes[dropIndex],
        });

        dropIndex += 1;
      }, 600);
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
        checkboxCounter++;
        if (checkboxCounter === 1) {
          isArrowAnimating.value = true;
        }
        animateFunnel();
      }
    };

    const animateFunnel = () => {
      isAnimating.value = true;
      setTimeout(() => {
        isAnimating.value = false;
      }, 300);
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
    };
  },
};
</script>

<style scoped>
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

.grow_buisness-with-mosaic {
  position: absolute;
  left: 435px;
  top: 45px;
}

.business-arrow__down {
  position: absolute;
  left: 667px;
  top: 95px;
}

.service-selection__lower {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40%;
  z-index: 1;
}

.service-selection__lower--tree {
  position: relative;
  width: 78%;
  background-color: #ededed;
  background-image: url(../images/ground.png);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% auto; /* изображение растягивается на всю ширину, высота остается неизменной */
  z-index: 1;
}

.drops-container {
  position: absolute;
  top: 177px;
  left: 50%;
  transform: translate(-50%, -100%);
  pointer-events: none;
}

.drop {
  position: absolute;
  bottom: 90px;
  left: calc(50% - 40px);
  animation: drop-fall 3s linear forwards;
}

.drop.small {
  width: 15px;
  height: 15px;
}

.drop.medium {
  width: 20px;
  height: 20px;
}

.drop.big {
  width: 30px;
  height: 30px;
}

@keyframes drop-fall {
  0% {
    opacity: 1;
    transform: translateY(10px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(150px);
  }
  100% {
    opacity: 0;
    transform: translateY(300px);
  }
}

.drop-fall-enter-active {
  transition:
    transform 2s,
    opacity 1s;
}

.business_up {
  position: absolute;
  left: 12px;
  top: 32px;
  width: 173px;
  height: 88px;
}

.business_up-arrow {
  position: absolute;
  left: 70px;
  top: 120px;
}

.money {
  position: absolute;
  right: 93px;
  top: 80px;
}

.money-arrow {
  position: absolute;
  top: 140px;
  right: 230px;
}

.small-tree {
  position: absolute;
  left: 196px;
  top: 210px;
  width: 100px;
  height: 100px;
  transition:
    opacity 0.005s ease-in-out,
    transform 0.005s ease-in-out;
}

.small-tree.hidden {
  animation: fadeOut 0.005s forwards;
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

.big-tree {
  position: absolute;
  left: 196px;
  top: 194px;
  width: 110px;
  height: 110px;
  transform-origin: bottom;
  transition:
    width 3s ease-in-out,
    height 3s ease-in-out,
    opacity 1s ease-in-out;
  opacity: 0;
}

.big-tree.tree-grow {
  transform: scale(2);
  opacity: 1;
  animation: growTree 3s ease-in-out forwards;
}

@keyframes growTree {
  0% {
    transform: scale(1);
  }
  1% {
    transform: scale(1.01);
  }
  2% {
    transform: scale(1.02);
  }
  3% {
    transform: scale(1.03);
  }
  4% {
    transform: scale(1.04);
  }
  5% {
    transform: scale(1.05);
  }
  6% {
    transform: scale(1.06);
  }
  7% {
    transform: scale(1.07);
  }
  8% {
    transform: scale(1.08);
  }
  9% {
    transform: scale(1.09);
  }
  10% {
    transform: scale(1.1);
  }
  11% {
    transform: scale(1.11);
  }
  12% {
    transform: scale(1.12);
  }
  13% {
    transform: scale(1.13);
  }
  14% {
    transform: scale(1.14);
  }
  15% {
    transform: scale(1.15);
  }
  16% {
    transform: scale(1.16);
  }
  17% {
    transform: scale(1.17);
  }
  18% {
    transform: scale(1.18);
  }
  19% {
    transform: scale(1.19);
  }
  20% {
    transform: scale(1.2);
  }
  21% {
    transform: scale(1.21);
  }
  22% {
    transform: scale(1.22);
  }
  23% {
    transform: scale(1.23);
  }
  24% {
    transform: scale(1.24);
  }
  25% {
    transform: scale(1.25);
  }
  26% {
    transform: scale(1.26);
  }
  27% {
    transform: scale(1.27);
  }
  28% {
    transform: scale(1.28);
  }
  29% {
    transform: scale(1.29);
  }
  30% {
    transform: scale(1.3);
  }
  31% {
    transform: scale(1.31);
  }
  32% {
    transform: scale(1.32);
  }
  33% {
    transform: scale(1.33);
  }
  34% {
    transform: scale(1.34);
  }
  35% {
    transform: scale(1.35);
  }
  36% {
    transform: scale(1.36);
  }
  37% {
    transform: scale(1.37);
  }
  38% {
    transform: scale(1.38);
  }
  39% {
    transform: scale(1.39);
  }
  40% {
    transform: scale(1.4);
  }
  41% {
    transform: scale(1.41);
  }
  42% {
    transform: scale(1.42);
  }
  43% {
    transform: scale(1.43);
  }
  44% {
    transform: scale(1.44);
  }
  45% {
    transform: scale(1.45);
  }
  46% {
    transform: scale(1.46);
  }
  47% {
    transform: scale(1.47);
  }
  48% {
    transform: scale(1.48);
  }
  49% {
    transform: scale(1.49);
  }
  50% {
    transform: scale(1.5);
  }
  51% {
    transform: scale(1.51);
  }
  52% {
    transform: scale(1.52);
  }
  53% {
    transform: scale(1.53);
  }
  54% {
    transform: scale(1.54);
  }
  55% {
    transform: scale(1.55);
  }
  56% {
    transform: scale(1.56);
  }
  57% {
    transform: scale(1.57);
  }
  58% {
    transform: scale(1.58);
  }
  59% {
    transform: scale(1.59);
  }
  60% {
    transform: scale(1.6);
  }
  61% {
    transform: scale(1.61);
  }
  62% {
    transform: scale(1.62);
  }
  63% {
    transform: scale(1.63);
  }
  64% {
    transform: scale(1.64);
  }
  65% {
    transform: scale(1.65);
  }
  66% {
    transform: scale(1.66);
  }
  67% {
    transform: scale(1.67);
  }
  68% {
    transform: scale(1.68);
  }
  69% {
    transform: scale(1.69);
  }
  70% {
    transform: scale(1.7);
  }
  71% {
    transform: scale(1.71);
  }
  72% {
    transform: scale(1.72);
  }
  73% {
    transform: scale(1.73);
  }
  74% {
    transform: scale(1.74);
  }

  75% {
    transform: scale(1.75);
  }
  76% {
    transform: scale(1.76);
  }
  77% {
    transform: scale(1.77);
  }
  78% {
    transform: scale(1.78);
  }
  79% {
    transform: scale(1.79);
  }
  80% {
    transform: scale(1.8);
  }
  81% {
    transform: scale(1.81);
  }
  82% {
    transform: scale(1.82);
  }
  83% {
    transform: scale(1.83);
  }
  84% {
    transform: scale(1.84);
  }
  85% {
    transform: scale(1.85);
  }
  86% {
    transform: scale(1.86);
  }
  87% {
    transform: scale(1.87);
  }
  88% {
    transform: scale(1.88);
  }
  89% {
    transform: scale(1.89);
  }
  90% {
    transform: scale(1.9);
  }
  91% {
    transform: scale(1.91);
  }
  92% {
    transform: scale(1.92);
  }
  93% {
    transform: scale(1.93);
  }
  94% {
    transform: scale(1.94);
  }
  95% {
    transform: scale(1.95);
  }
  96% {
    transform: scale(1.96);
  }
  97% {
    transform: scale(1.97);
  }
  98% {
    transform: scale(1.98);
  }
  99% {
    transform: scale(1.99);
  }
  100% {
    transform: scale(2);
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

.funnel-container {
  position: absolute;
  top: 155px;
  right: 0;
  width: 350px;
  height: auto;
  z-index: 10;
}

.service-selection__lower--cases {
  position: relative;
  width: 22%;
  background-image: url(../images/logos/cases.png);
  background-repeat: no-repeat;
  background-position: center 50px;
}

.cases-arrow {
  position: absolute;
  top: 10px;
  left: 70px;
}

.funnel-image {
  cursor: pointer;
  width: 100%;
  transition: transform 4s ease-in-out;
  z-index: 10;
}

.funnel-moving {
  transform: translateX(-200px) translateY(200px) rotate(-60deg);
}

.instruction-funnel__active {
  display: none;
}

.instruction-tree {
  display: none;
}

.checkboxes-container {
  position: absolute;
  left: 43px;
  top: 30%;
  width: 290px;
  height: 300px;
}

.checkboxes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 14px;
  color: #9e9e9e;
  z-index: 20;
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

.lightbox {
  position: relative;
  margin: 0 auto;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 740px;
  height: calc(100vh - 80px);
  color: #ededed;
  background-color: #0049af;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  z-index: 1000;
}

.lightbox-content h2 {
  font-size: 36px;
  margin-bottom: 80px;
  z-index: 1000;
}

.lightbox__checkboxes-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-checkboxes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  z-index: 1000;
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

.business-arrow__down {
  position: absolute;
  left: 667px;
  top: 95px;
  transition: transform 0.5s ease-in-out;
}

.business-arrow__down.animated {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.funnel-animating {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
</style>
