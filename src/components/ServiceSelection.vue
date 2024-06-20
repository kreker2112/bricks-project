<!-- ServiceSelection.vue -->
<template>
  <div class="service-selection" ref="serviceSelection">
    <div class="service-selection__upper">
      <img
        class="grow_buisness-with-mosaic"
        :class="{ animated: isGrowBusinessAnimating }"
        :src="growBusinessSrc"
        alt="grow_buisness"
      />
      <img
        class="business-arrow__down"
        :class="{ animated: isArrowAnimating }"
        :src="businessArrowSrc"
        alt="business-arrow__down"
      />

      <div class="checkboxes-container__upper">
        <form class="checkboxes__upper">
          <div
            v-for="(service, index) in services"
            :key="service"
            :class="[
              'checkbox-item__upper',
              { checked: selectedServices.includes(service) },
            ]"
          >
            <input
              class="checkbox-item__upper--input"
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
      <div class="service-selection__upper--cases">
        <img class="cases-image" src="../images/logos/cases.png" alt="cases" />
      </div>
    </div>
    <div class="service-selection__lower">
      <div class="service-selection__lower--instuction">
        <div class="instuction-image__container">
          <img
            class="instruction-image"
            src="../images/instruction.png"
            alt="instruction"
          />
          <div class="take-money__container">
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
          </div>
        </div>
      </div>

      <img
        class="business-arrow__down--funnel"
        src="../images/business-arrow__down.svg"
        :class="{ animated: isArrowAnimating, invisible: isGrown }"
        alt="business-arrow__down-funnel"
      />

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
          src="../images/business_up-arrow.svg"
          alt="business_up-arrow"
        />

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
            src="@/images/big-tree.svg"
            alt="big-tree"
          />
        </transition>
        <transition-group name="coins-appear">
          <img
            v-for="(coin, index) in coins"
            :key="index"
            :class="['coin', 'coin-' + index]"
            :src="coin.src"
            :style="coin.style"
            alt="coin"
          />
        </transition-group>

        <img class="ground" src="../images/ground.png" alt="ground" />

        <div class="drops-container">
          <img
            v-for="(drop, index) in drops"
            :key="index"
            class="drop one-size"
            :src="drop.src"
            alt="drop"
          />
        </div>
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
                  'lightbox__checkbox-item',
                  { checked: lightboxSelectedServices.includes(service) },
                ]"
              >
                <input
                  class="lightbox__checkbox-item--input"
                  :id="'lightbox-service-' + index"
                  :name="'lightbox-service-' + index"
                  type="checkbox"
                  :value="service"
                  :checked="lightboxSelectedServices.includes(service)"
                  @change="toggleLightboxService(service)"
                />
                <label
                  class="lightbox__checkbox-item--label"
                  :for="'lightbox-service-' + index"
                  >{{ service }}</label
                >
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
              @input="filterPhoneInput"
              required
            />
            <textarea
              v-model="lightboxMessage"
              placeholder="Повідомлення"
              required
            ></textarea>
            <div v-if="showWarning" class="warning-message">
              Будь ласка, заповніть усі поля форми.
            </div>
            <button class="apply-button" @click="validateAndApply">
              Застосувати
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import dropsImage from "@/images/drops.svg";
import coinImage from "@/images/coin.svg";
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
      "Розсилки",
    ]);

    const selectedServices = computed(() => store.getters.selectedServices);
    const lightboxSelectedServices = ref([]);
    const isPouring = ref(false);
    const isGrown = ref(false);
    const showSmallTree = ref(true);
    const coins = ref([]);
    const drops = ref([]);
    const isHoveringOverFunnel = ref(false);
    const isGrowBusinessAnimating = ref(false);
    const lightboxName = ref("");
    const lightboxPhone = ref("");
    const lightboxMessage = ref("");
    const isArrowAnimating = ref(false);
    const isAnimating = ref(false);
    const showWarning = ref(false);
    let checkboxCounter = 0;
    let arrowAnimationInterval;
    let growBusinessAnimationTimeout;
    const isMobile = ref(window.innerWidth <= 767);

    const growBusinessSrc = computed(() =>
      isMobile.value
        ? require("../images/grow_buisness-with-mosaic-blue.png")
        : require("../images/grow_buisness-with-mosaic.png"),
    );
    const businessArrowSrc = computed(() =>
      isMobile.value
        ? require("../images/business-arrow__down-blue.png")
        : require("../images/business-arrow__down.png"),
    );

    const showLightbox = computed(() => store.getters.isLightboxVisible);

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth <= 767;
    };

    onMounted(() => {
      window.addEventListener("resize", updateIsMobile);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateIsMobile);
    });

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
      }, 2000);
      setTimeout(() => {
        growTree();
      }, 4000);
    };

    const createDrops = () => {
      drops.value = [
        {
          src: dropsImage,
          size: "one-size",
        },
      ];
      setTimeout(() => {
        drops.value = [];
      }, 4000);
    };

    const growTree = () => {
      setTimeout(() => {
        isGrown.value = true;
        setTimeout(() => {
          showSmallTree.value = false;
        }, 1);
        isPouring.value = false;
      }, 1);
    };

    const onTreeGrown = () => {
      const selectedServiceCount = selectedServices.value.length;
      const coinImages = Array(selectedServiceCount).fill(coinImage);
      coins.value = coinImages.map((coinSrc, index) => ({
        src: coinSrc,
        style: getCoinStyle(index, selectedServiceCount),
      }));
      setTimeout(() => {
        coins.value = [];
        setTimeout(() => {
          openLightbox();
          lightboxSelectedServices.value = [...selectedServices.value];
          console.log(lightboxSelectedServices.value);
        }, 1000);
      }, 500);
    };

    const getCoinStyle = (index, total) => {
      const angle = (index / total) * 360;
      const radius = 50; // Радиус окружности, на которой располагаются монеты
      const x = radius * Math.cos((angle * Math.PI) / 180);
      const y = radius * Math.sin((angle * Math.PI) / 180);
      return {
        top: `${50 + y}%`,
        left: `${50 + x}%`,
        transform: "scale(0)",
        opacity: 0,
        transition: `transform 2s ease-in-out, opacity 2s ease-in-out ${index * 0.1}s`,
      };
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
      const formData = {
        name: lightboxName.value,
        phone: lightboxPhone.value,
        message: lightboxMessage.value,
        services: [...lightboxSelectedServices.value],
      };
      console.log(formData);
      emit("apply-selection");
      router.push("/second-page");
      // Здесь вы можете отправить данные на сервер или выполнить другие действия
    };

    const validateAndApply = () => {
      if (!lightboxName.value || !lightboxPhone.value) {
        showWarning.value = true;
      } else {
        showWarning.value = false;
        applySelection();
      }
    };

    const openLightbox = () => {
      store.dispatch("setLightboxVisibility", true);
    };

    const closeLightbox = () => {
      store.dispatch("setLightboxVisibility", false);
      showWarning.value = false;
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

    const toggleLightboxService = (service) => {
      if (lightboxSelectedServices.value.includes(service)) {
        lightboxSelectedServices.value = lightboxSelectedServices.value.filter(
          (s) => s !== service,
        );
      } else {
        lightboxSelectedServices.value.push(service);
      }
      console.log(lightboxSelectedServices.value);
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

    const filterPhoneInput = (event) => {
      const input = event.target;
      const value = input.value;
      const filteredValue = value.replace(/[^0-9+\-\s]/g, "");
      input.value = filteredValue;
      lightboxPhone.value = filteredValue;
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
      validateAndApply,
      closeLightbox,
      toggleService,
      isArrowAnimating,
      isAnimating,
      isGrowBusinessAnimating,
      toggleLightboxService,
      filterPhoneInput,
      growBusinessSrc,
      businessArrowSrc,
      showWarning,
    };
  },
};
</script>

<style>
.warning-message {
  color: red;
  font-size: 150%;
  margin-top: 10px;
}

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
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #828282;
  width: 100%;
  height: 32%;
}

.checkboxes-container__upper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.checkboxes__upper {
  margin-bottom: -5%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  width: 85%;
  padding: 20px;
  box-sizing: border-box;
}

.checkbox-item__upper {
  display: flex;
  align-items: center;
  font-family: "Montserrat";
  color: #9e9e9e;
}

.checkbox-item__upper label {
  font-size: 100%;
}

.checkbox-item__upper.checked {
  color: #ffffff;
}

.checkbox-item__upper--input {
  margin-right: 10px;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid #9e9e9e;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  cursor: pointer;
}

.checkbox-item__upper--input:checked::after {
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

.service-selection__upper--cases {
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
}

.cases-image {
  height: 95%;
}

.grow_buisness-with-mosaic {
  position: absolute;
  left: 5%;
  top: 1%;
  width: 76%;
  transition: transform 2s ease-in-out;
}

.grow_buisness-with-mosaic.animated {
  transform: scale(1.1);
}

.business-arrow__down {
  position: absolute;
  right: 20%;
  top: 6%;
  width: 6%;
}

.business-arrow__down.animated {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  100% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(-8px);
  }
  80% {
    transform: translateY(-14px);
  }
  70% {
    transform: translateY(-16px);
  }
  60% {
    transform: translateY(-18px);
  }
  50% {
    transform: translateY(-22px);
  }
  40% {
    transform: translateY(-18px);
  }
  30% {
    transform: translateY(-16px);
  }

  20% {
    transform: translateY(-14px);
  }
  10% {
    transform: translateY(-8px);
  }
  0% {
    transform: translateY(0px);
  }
}

.service-selection__lower {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.service-selection__lower--instuction {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ededed;
}

.instruction-image {
  position: relative;
  top: 1%;
  left: 2%;
  width: 100%;
}

.service-selection__lower--tree {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ededed;
  z-index: 1;
}

.ground {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.business-arrow__down--funnel {
  position: absolute;
  left: 25%;
  bottom: 55%;
  width: 8%;
  rotate: 13deg;
  z-index: 1005;
}

.business-arrow__down--funnel.animated {
  animation: bounce 1s infinite;
}

.funnel-image {
  position: absolute;
  display: block;
  border: none;
  margin: 0;
  padding: 0;
  width: 65%;
  bottom: 1%;
  right: 75%;
  cursor: pointer;
  object-position: center;
  object-fit: contain;
  transform-origin: bottom;
  transition: transform 2s ease-in-out;
  z-index: 1006;
}

.funnel-animating {
  transform: scale(1.1);
}

.funnel-moving {
  transform: translateX(140px) translateY(-500px) rotate(60deg);
}

.drops-container {
  position: absolute;
  top: 177px;
  left: 65%;
  transform: translate(-50%, -100%);
  pointer-events: none;
  z-index: 1000;
}

.drop {
  left: calc(50% - 40px);
  animation: drop-fall 3s linear forwards;
  z-index: 1000;
}

.drop.one-size {
  width: 100px;
  z-index: 1000;
}

@keyframes drop-fall {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  1% {
    opacity: 0.995;
    transform: translateY(3px);
  }
  2% {
    opacity: 0.99;
    transform: translateY(6px);
  }
  3% {
    opacity: 0.985;
    transform: translateY(9px);
  }
  4% {
    opacity: 0.98;
    transform: translateY(12px);
  }
  5% {
    opacity: 0.975;
    transform: translateY(15px);
  }
  6% {
    opacity: 0.97;
    transform: translateY(18px);
  }
  7% {
    opacity: 0.965;
    transform: translateY(21px);
  }
  8% {
    opacity: 0.96;
    transform: translateY(24px);
  }
  9% {
    opacity: 0.955;
    transform: translateY(27px);
  }
  10% {
    opacity: 0.95;
    transform: translateY(30px);
  }
  11% {
    opacity: 0.945;
    transform: translateY(33px);
  }
  12% {
    opacity: 0.94;
    transform: translateY(36px);
  }
  13% {
    opacity: 0.935;
    transform: translateY(39px);
  }
  14% {
    opacity: 0.93;
    transform: translateY(42px);
  }
  15% {
    opacity: 0.925;
    transform: translateY(45px);
  }
  16% {
    opacity: 0.92;
    transform: translateY(48px);
  }
  17% {
    opacity: 0.915;
    transform: translateY(51px);
  }
  18% {
    opacity: 0.91;
    transform: translateY(54px);
  }
  19% {
    opacity: 0.905;
    transform: translateY(57px);
  }
  20% {
    opacity: 0.9;
    transform: translateY(60px);
  }
  21% {
    opacity: 0.895;
    transform: translateY(63px);
  }
  22% {
    opacity: 0.89;
    transform: translateY(66px);
  }
  23% {
    opacity: 0.885;
    transform: translateY(69px);
  }
  24% {
    opacity: 0.88;
    transform: translateY(72px);
  }
  25% {
    opacity: 0.875;
    transform: translateY(75px);
  }
  26% {
    opacity: 0.87;
    transform: translateY(78px);
  }
  27% {
    opacity: 0.865;
    transform: translateY(81px);
  }
  28% {
    opacity: 0.86;
    transform: translateY(84px);
  }
  29% {
    opacity: 0.855;
    transform: translateY(87px);
  }
  30% {
    opacity: 0.85;
    transform: translateY(90px);
  }
  31% {
    opacity: 0.845;
    transform: translateY(93px);
  }
  32% {
    opacity: 0.84;
    transform: translateY(96px);
  }
  33% {
    opacity: 0.835;
    transform: translateY(99px);
  }
  34% {
    opacity: 0.83;
    transform: translateY(102px);
  }
  35% {
    opacity: 0.825;
    transform: translateY(105px);
  }
  36% {
    opacity: 0.82;
    transform: translateY(108px);
  }
  37% {
    opacity: 0.815;
    transform: translateY(111px);
  }
  38% {
    opacity: 0.81;
    transform: translateY(114px);
  }
  39% {
    opacity: 0.805;
    transform: translateY(117px);
  }
  40% {
    opacity: 0.8;
    transform: translateY(120px);
  }
  41% {
    opacity: 0.795;
    transform: translateY(123px);
  }
  42% {
    opacity: 0.79;
    transform: translateY(126px);
  }
  43% {
    opacity: 0.785;
    transform: translateY(129px);
  }
  44% {
    opacity: 0.78;
    transform: translateY(132px);
  }
  45% {
    opacity: 0.775;
    transform: translateY(135px);
  }
  46% {
    opacity: 0.77;
    transform: translateY(138px);
  }
  47% {
    opacity: 0.765;
    transform: translateY(141px);
  }
  48% {
    opacity: 0.76;
    transform: translateY(144px);
  }
  49% {
    opacity: 0.755;
    transform: translateY(147px);
  }
  50% {
    opacity: 0.75;
    transform: translateY(150px);
  }
  51% {
    opacity: 0.745;
    transform: translateY(153px);
  }
  52% {
    opacity: 0.74;
    transform: translateY(156px);
  }
  53% {
    opacity: 0.735;
    transform: translateY(159px);
  }
  54% {
    opacity: 0.73;
    transform: translateY(162px);
  }
  55% {
    opacity: 0.725;
    transform: translateY(165px);
  }
  56% {
    opacity: 0.72;
    transform: translateY(168px);
  }
  57% {
    opacity: 0.715;
    transform: translateY(171px);
  }
  58% {
    opacity: 0.71;
    transform: translateY(174px);
  }
  59% {
    opacity: 0.705;
    transform: translateY(177px);
  }
  60% {
    opacity: 0.7;
    transform: translateY(180px);
  }
  61% {
    opacity: 0.695;
    transform: translateY(183px);
  }
  62% {
    opacity: 0.69;
    transform: translateY(186px);
  }
  63% {
    opacity: 0.685;
    transform: translateY(189px);
  }
  64% {
    opacity: 0.68;
    transform: translateY(192px);
  }
  65% {
    opacity: 0.675;
    transform: translateY(195px);
  }
  66% {
    opacity: 0.67;
    transform: translateY(198px);
  }
  67% {
    opacity: 0.665;
    transform: translateY(201px);
  }
  68% {
    opacity: 0.66;
    transform: translateY(204px);
  }
  69% {
    opacity: 0.655;
    transform: translateY(207px);
  }
  70% {
    opacity: 0.65;
    transform: translateY(210px);
  }
  71% {
    opacity: 0.645;
    transform: translateY(213px);
  }
  72% {
    opacity: 0.64;
    transform: translateY(216px);
  }
  73% {
    opacity: 0.635;
    transform: translateY(219px);
  }
  74% {
    opacity: 0.63;
    transform: translateY(222px);
  }
  75% {
    opacity: 0.625;
    transform: translateY(225px);
  }
  76% {
    opacity: 0.62;
    transform: translateY(228px);
  }
  77% {
    opacity: 0.615;
    transform: translateY(231px);
  }
  78% {
    opacity: 0.61;
    transform: translateY(234px);
  }
  79% {
    opacity: 0.605;
    transform: translateY(237px);
  }
  80% {
    opacity: 0.6;
    transform: translateY(240px);
  }
  81% {
    opacity: 0.595;
    transform: translateY(243px);
  }
  82% {
    opacity: 0.59;
    transform: translateY(246px);
  }
  83% {
    opacity: 0.585;
    transform: translateY(249px);
  }
  84% {
    opacity: 0.58;
    transform: translateY(252px);
  }
  85% {
    opacity: 0.575;
    transform: translateY(255px);
  }
  86% {
    opacity: 0.57;
    transform: translateY(258px);
  }
  87% {
    opacity: 0.565;
    transform: translateY(261px);
  }
  88% {
    opacity: 0.56;
    transform: translateY(264px);
  }
  89% {
    opacity: 0.555;
    transform: translateY(267px);
  }
  90% {
    opacity: 0.55;
    transform: translateY(270px);
  }
  91% {
    opacity: 0.545;
    transform: translateY(273px);
  }
  92% {
    opacity: 0.54;
    transform: translateY(276px);
  }
  93% {
    opacity: 0.535;
    transform: translateY(279px);
  }
  94% {
    opacity: 0.53;
    transform: translateY(282px);
  }
  95% {
    opacity: 0.525;
    transform: translateY(285px);
  }
  96% {
    opacity: 0.52;
    transform: translateY(288px);
  }
  97% {
    opacity: 0.515;
    transform: translateY(291px);
  }
  98% {
    opacity: 0.51;
    transform: translateY(294px);
  }
  99% {
    opacity: 0.505;
    transform: translateY(297px);
  }
  100% {
    opacity: 0;
    transform: translateY(300px);
  }
}

.drop-fall-enter-active {
  transition:
    transform 4s,
    opacity 1s;
}

.small-tree {
  position: absolute;
  bottom: 19%;
  left: 51%;
  width: 30%;
  object-fit: contain;
  transform:
    opacity 0.000000001s ease-out,
    transform 0.000000001s ease-out;
  z-index: 90;
}

.big-tree {
  position: absolute;
  bottom: 20%;
  left: 52%;
  width: 30%;
  opacity: 0;
  transition:
    transform 2s ease-in-out,
    opacity 2s ease-in-out;
  z-index: 90;
}

.business_up {
  position: absolute;
  left: 20%;
  bottom: 28%;
  width: 30%;
  z-index: 50;
}

.business_up-arrow {
  position: absolute;
  left: 43%;
  bottom: 40%;
  z-index: 50;
}

.take-money {
  position: absolute;
  right: 3%;
  top: 3%;
  width: 31%;
  z-index: 50;
}

.take-money__arrow {
  position: absolute;
  top: 16%;
  right: 6%;
  width: 7%;
  z-index: 50;
}

.big-tree.tree-grow {
  transform: translateX(-50%) scale(1.5);
  transform-origin: bottom;
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

.coins-appear-enter-active {
  transition: transform 3s;
}

.coin {
  position: absolute;
  transition:
    transform 2s ease-in-out,
    opacity 2s ease-in-out;
  transform: scale(0);
  opacity: 0;
}

.coins-appear-enter-to {
  transform: scale(1);
  opacity: 1;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5); /* Затемнение заднего фона */
  z-index: 10000;
}

.lightbox-content {
  position: relative;
  background: #002d6e;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: calc(100vh - 80px);
  color: #ededed;
  text-align: center;
  z-index: 10001;
}

.lightbox-content h2 {
  font-size: 36px;
  margin-bottom: 60px;
  z-index: 999;
}

.lightbox__checkboxes-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: justify;
  z-index: 999;
}

.lightbox-checkboxes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  z-index: 999;
}

.lightbox__checkbox-item {
  display: flex;
  align-items: center;
  z-index: 999;
}

.lightbox__checkbox-item--input {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid #9e9e9e;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  cursor: pointer;
}

.lightbox__checkbox-item--input:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background-image: url("../images/logos/check-icon.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
}

.lightbox__checkbox-item--label {
  font-size: 20px;
  font-weight: 500;
  color: #ededed;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
  height: 100%;
}

.form input {
  border-radius: 8px;
  height: 35px;
  font-size: 16px;
  font-family: "Montserrat";
}

.form textarea {
  border-radius: 8px;
  height: 80px;
  font-size: 16px;
  font-family: "Montserrat";
}

.form button {
  margin-top: 30px;
  width: 315px;
  height: 75px;
  background-color: #ff6400;
  color: #ffffff;
}

.form input,
.form textarea {
  width: 60%;
  margin: 10px 0;
  padding: 10px;
}

.apply-button {
  font-size: 24px;
  font-style: "Montserrat";
  padding: 9.43px 18.85px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: #ffffff;
}

.invisible {
  visibility: hidden;
  opacity: 0;
}
</style>
