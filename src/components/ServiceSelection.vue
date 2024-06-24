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
        v-if="selectedServices.length > 0"
        class="business-arrow__down--funnel"
        src="../images/business-arrow__down-funnel.svg"
        :class="{ animated: isArrowAnimating, invisible: isGrown }"
        alt="business-arrow__down-funnel"
      />

      <img
        v-if="!showLightbox"
        :class="[
          'funnel-image',
          isPouring ? 'funnel-moving' : '',
          isAnimating ? 'funnel-animating' : '',
        ]"
        src="../images/logos/funnel.png"
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

        <div class="tree">
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
          <div class="coins__container">
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
          </div>
        </div>
        <div class="ground-container">
          <img class="ground" src="../images/ground.png" alt="ground" />
        </div>

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
          <form class="form">
            <input
              type="text"
              v-model="lightboxName"
              placeholder="Ім'я *"
              required
            />
            <input
              type="tel"
              v-model="lightboxPhone"
              placeholder="Телефон *"
              @input="filterPhoneInput"
              required
            />
            <textarea
              v-model="lightboxMessage"
              placeholder="Повідомлення"
              required
            ></textarea>
            <button class="apply-button" @click="validateAndApply">
              Застосувати
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted, toRaw } from "vue";
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
        coins.value.forEach((coin, index) => {
          setTimeout(() => {
            coin.style.transform = "scale(1)";
            coin.style.opacity = 1;
          }, index * 100);
        });

        setTimeout(
          () => {
            openLightbox();
            lightboxSelectedServices.value = [...selectedServices.value];
            console.log(lightboxSelectedServices.value);
          },
          selectedServiceCount * 100 + 1000,
        );
      }, 10); // Задержка перед началом появления монет
    };

    const getCoinStyle = (index, total) => {
      const container = document.querySelector(".coins__container");
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const coinSize = Math.max(70, containerWidth / (total * 20)); // Уменьшаем размер монет в зависимости от их количества

      let x, y, overlapping;
      let attempts = 0;
      const maxAttempts = 100;
      const coins = document.querySelectorAll(".coin");

      do {
        x = Math.random() * (containerWidth - coinSize);
        y = Math.random() * (containerHeight - coinSize);
        overlapping = false;

        for (let i = 0; i < coins.length; i += 1) {
          const coin = coins[i];
          const coinX = parseFloat(coin.style.left);
          const coinY = parseFloat(coin.style.top);

          const distance = Math.sqrt((coinX - x) ** 10 + (coinY - y) ** 10);
          if (distance < coinSize * 20) {
            overlapping = false;
            break;
          }
        }
        attempts += 1;
      } while (overlapping && attempts < maxAttempts);

      if (attempts === maxAttempts) {
        console.warn("Unable to place coin without overlap");
      }

      return {
        width: `${coinSize}px`,
        height: `${coinSize}px`,
        top: `${y}px`,
        left: `${x}px`,
        transform: "scale(0)",
        opacity: 0,
        transition: `transform 1s ease-in-out, opacity 1s ease-in-out`,
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
      const formData = toRaw({
        name: lightboxName.value,
        phone: lightboxPhone.value,
        message: lightboxMessage.value,
        services: [...lightboxSelectedServices.value],
      });
      console.log(formData);
      store.dispatch("setFormData", formData);
      emit("apply-selection");
      router.push("/second-page");
      // Здесь вы можете отправить данные на сервер или выполнить другие действия
    };

    const validateAndApply = () => {
      if (!lightboxName.value || !lightboxPhone.value) {
        return;
      } else {
        applySelection();
      }
    };

    const openLightbox = () => {
      store.dispatch("setLightboxVisibility", true);
    };

    const closeLightbox = () => {
      store.dispatch("setLightboxVisibility", false);
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
  display: flex;
  justify-content: space-between;
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
  left: 15%;
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
  overflow: hidden;
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

.tree {
  position: relative;
  margin-top: 55%;
  margin-left: 15%;
  width: 75%;
  z-index: 100;
}

.coins__container {
  position: absolute;
  bottom: 130px;
  right: -4.5%;
  width: 430px;
  height: 310px;
  z-index: 100;
  border-radius: 15%;
}

.coins-appear-enter-active {
  transition: transform 3s;
}

.coin {
  position: absolute;
  transition:
    transform 1s ease-in-out,
    opacity 1s ease-in-out;
  transform: scale(0);
  opacity: 0;
}

.coins-appear-enter-to {
  transform: scale(1);
  opacity: 1;
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
  transform: translateX(-50%) scale(2.5);
  transform-origin: bottom;
  opacity: 1;
  animation: growTree 3s ease-in-out forwards;
}

@keyframes growTree {
  0% {
    transform: scale(1);
  }
  1% {
    transform: scale(1.015);
  }
  2% {
    transform: scale(1.03);
  }
  3% {
    transform: scale(1.045);
  }
  4% {
    transform: scale(1.06);
  }
  5% {
    transform: scale(1.075);
  }
  6% {
    transform: scale(1.09);
  }
  7% {
    transform: scale(1.105);
  }
  8% {
    transform: scale(1.12);
  }
  9% {
    transform: scale(1.135);
  }
  10% {
    transform: scale(1.15);
  }
  11% {
    transform: scale(1.165);
  }
  12% {
    transform: scale(1.18);
  }
  13% {
    transform: scale(1.195);
  }
  14% {
    transform: scale(1.21);
  }
  15% {
    transform: scale(1.225);
  }
  16% {
    transform: scale(1.24);
  }
  17% {
    transform: scale(1.255);
  }
  18% {
    transform: scale(1.27);
  }
  19% {
    transform: scale(1.285);
  }
  20% {
    transform: scale(1.3);
  }
  21% {
    transform: scale(1.315);
  }
  22% {
    transform: scale(1.33);
  }
  23% {
    transform: scale(1.345);
  }
  24% {
    transform: scale(1.36);
  }
  25% {
    transform: scale(1.375);
  }
  26% {
    transform: scale(1.39);
  }
  27% {
    transform: scale(1.405);
  }
  28% {
    transform: scale(1.42);
  }
  29% {
    transform: scale(1.435);
  }
  30% {
    transform: scale(1.45);
  }
  31% {
    transform: scale(1.465);
  }
  32% {
    transform: scale(1.48);
  }
  33% {
    transform: scale(1.495);
  }
  34% {
    transform: scale(1.51);
  }
  35% {
    transform: scale(1.525);
  }
  36% {
    transform: scale(1.54);
  }
  37% {
    transform: scale(1.555);
  }
  38% {
    transform: scale(1.57);
  }
  39% {
    transform: scale(1.585);
  }
  40% {
    transform: scale(1.6);
  }
  41% {
    transform: scale(1.615);
  }
  42% {
    transform: scale(1.63);
  }
  43% {
    transform: scale(1.645);
  }
  44% {
    transform: scale(1.66);
  }
  45% {
    transform: scale(1.675);
  }
  46% {
    transform: scale(1.69);
  }
  47% {
    transform: scale(1.705);
  }
  48% {
    transform: scale(1.72);
  }
  49% {
    transform: scale(1.735);
  }
  50% {
    transform: scale(1.75);
  }
  51% {
    transform: scale(1.765);
  }
  52% {
    transform: scale(1.78);
  }
  53% {
    transform: scale(1.795);
  }
  54% {
    transform: scale(1.81);
  }
  55% {
    transform: scale(1.825);
  }
  56% {
    transform: scale(1.84);
  }
  57% {
    transform: scale(1.855);
  }
  58% {
    transform: scale(1.87);
  }
  59% {
    transform: scale(1.885);
  }
  60% {
    transform: scale(1.9);
  }
  61% {
    transform: scale(1.915);
  }
  62% {
    transform: scale(1.93);
  }
  63% {
    transform: scale(1.945);
  }
  64% {
    transform: scale(1.96);
  }
  65% {
    transform: scale(1.975);
  }
  66% {
    transform: scale(1.99);
  }
  67% {
    transform: scale(2.005);
  }
  68% {
    transform: scale(2.02);
  }
  69% {
    transform: scale(2.035);
  }
  70% {
    transform: scale(2.05);
  }
  71% {
    transform: scale(2.065);
  }
  72% {
    transform: scale(2.08);
  }
  73% {
    transform: scale(2.095);
  }
  74% {
    transform: scale(2.11);
  }
  75% {
    transform: scale(2.125);
  }
  76% {
    transform: scale(2.14);
  }
  77% {
    transform: scale(2.155);
  }
  78% {
    transform: scale(2.17);
  }
  79% {
    transform: scale(2.185);
  }
  80% {
    transform: scale(2.2);
  }
  81% {
    transform: scale(2.215);
  }
  82% {
    transform: scale(2.23);
  }
  83% {
    transform: scale(2.245);
  }
  84% {
    transform: scale(2.26);
  }
  85% {
    transform: scale(2.275);
  }
  86% {
    transform: scale(2.29);
  }
  87% {
    transform: scale(2.305);
  }
  88% {
    transform: scale(2.32);
  }
  89% {
    transform: scale(2.335);
  }
  90% {
    transform: scale(2.35);
  }
  91% {
    transform: scale(2.365);
  }
  92% {
    transform: scale(2.38);
  }
  93% {
    transform: scale(2.395);
  }
  94% {
    transform: scale(2.41);
  }
  95% {
    transform: scale(2.425);
  }
  96% {
    transform: scale(2.44);
  }
  97% {
    transform: scale(2.455);
  }
  98% {
    transform: scale(2.47);
  }
  99% {
    transform: scale(2.485);
  }
  100% {
    transform: scale(2.5);
  }
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
  background: rgba(0, 0, 0, 0.5);
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
  font-family: "Montserrat";
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
  font-family: "Montserrat";
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
  z-index: 10000;
}

.form textarea {
  border-radius: 8px;
  height: 80px;
  font-size: 16px;
  font-family: "Montserrat";
  z-index: 10000;
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

@media (max-width: 2560px) {
  .checkboxes-container__upper {
    justify-content: flex-start;
  }
  .checkboxes__upper {
    padding-left: 5%;
    gap: 1%;
  }
  .checkbox-item__upper {
    font-size: 80%;
  }
  .business-arrow__down--funnel {
    width: 8%;
    left: 10%;
  }
  .funnel-moving {
    transform: translateX(120px) translateY(-350px) rotate(60deg);
  }
  .business_up {
    bottom: 36%;
  }
  .business_up-arrow {
    bottom: 52%;
  }
  .tree {
    margin-top: 34%;
  }
  .drops-container {
    top: 100px;
  }
  .coins__container {
    position: absolute;
    bottom: 110px;
    right: -4.5%;
    width: 350px;
    height: 250px;
    z-index: 100;
    border-radius: 15%;
  }
  .lightbox-content h2 {
    margin-top: 1%;
    font-size: 2rem;
    margin-bottom: 3%;
  }
  .lightbox-checkboxes {
    grid-gap: 1.5%;
  }
  .lightbox__checkbox-item--label {
    font-size: 1rem;
  }
  .form {
    margin-top: 10%;
    margin-bottom: 5%;
  }
  .form input {
    height: 5%;
  }
  .form textarea {
    height: 15%;
  }
  .form button {
    margin-top: 10px;
  }
  .apply-button {
    font-size: 1.2rem;
    padding: 1rem 2rem;
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(150px);
    }
  }

  .drop-fall-enter-active {
    transition:
      transform 4s,
      opacity 1s;
  }
}

@media (max-width: 2304px) {
  .checkboxes__upper {
    margin-bottom: 0;
    padding-left: 5%;
    gap: 6% !important;
  }
  .checkbox-item__upper {
    font-size: 110% !important;
  }
  .checkbox-item__upper--input {
    width: 20px;
    height: 20px;
  }
  .grow_buisness-with-mosaic {
    top: 1% !important;
    width: 75% !important;
  }
  .business-arrow__down {
    right: 15%;
    top: 8%;
  }
  .instruction-image {
    width: 150%;
  }
  .take-money {
    width: 39%;
  }
  .take-money__arrow {
    top: 20%;
    width: 9%;
  }
  .business-arrow__down--funnel {
    width: 10%;
    top: 20%;
    left: 25%;
  }
  .business_up {
    bottom: 35%;
  }
  .business_up-arrow {
    bottom: 50%;
  }
  .tree {
    margin-top: 38%;
  }
  .funnel-moving {
    transform: translateX(190px) translateY(-480px) rotate(60deg);
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0.1;
      transform: translateY(250px);
    }
  }
  .drops-container {
    top: 80px;
  }
  .coins__container {
    bottom: 160px;
    width: 520px;
    height: 390px;
  }
  .lightbox-content h2 {
    margin-top: 1%;
    font-size: 2.5rem;
    margin-bottom: 3%;
  }
  .lightbox-checkboxes {
    grid-gap: 1rem;
  }
  .lightbox__checkbox-item--label {
    font-size: 1.2rem;
  }
  .form {
    margin-top: 5%;
    margin-bottom: 10%;
  }
  .form input {
    height: 7%;
  }
  .form textarea {
    height: 20%;
  }
  .form button {
    margin-top: 5%;
  }
  .apply-button {
    font-size: 1.2rem;
    padding: 1rem 2rem;
  }
}

@media (max-width: 1920px) {
  .checkboxes-container__upper {
    justify-content: flex-start;
  }
  .checkboxes__upper {
    padding: 2%;
    gap: 7%;
  }
  .checkbox-item__upper {
    font-size: 120%;
  }
  .grow_buisness-with-mosaic {
    top: 2%;
    width: 80%;
  }
  .business-arrow__down {
    right: 15%;
    top: 6%;
  }
  .instruction-image {
    width: 120%;
  }
  .take-money {
    width: 35%;
  }
  .business-arrow__down--funnel {
    width: 12%;
    top: 34%;
    left: 22%;
  }
  .funnel-moving {
    transform: translateX(140px) translateY(-550px) rotate(60deg);
  }
  .drops-container {
    top: 90px;
  }
  .tree {
    margin-top: 51.5%;
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(400px);
    }
  }
  .coins__container {
    bottom: 140px;
    width: 430px;
    height: 310px;
  }

  .business_up {
    bottom: 27%;
  }
  .business_up-arrow {
    bottom: 38%;
  }
  .lightbox-content h2 {
    font-size: 3rem;
    margin-bottom: 30px;
  }
  .lightbox-checkboxes {
    grid-gap: 5%;
  }
  .lightbox__checkbox-item--label {
    font-size: 1.5rem;
  }
  .form {
    margin-top: 20%;
    margin-bottom: 10%;
  }
  .form input {
    height: 10%;
  }
  .form textarea {
    height: 30%;
  }
  .form button {
    margin-top: 40px;
    width: 250px;
    height: 80px;
    text-align: center;
  }
  .apply-button {
    font-size: 2rem;
  }
}

@media only screen and (min-width: 1920px) and (max-width: 1920px) and (min-height: 963px) and (max-height: 963px) {
  .business-arrow__down--funnel {
    width: 8%;
    left: 10%;
  }
  .business_up {
    bottom: 30%;
  }
  .business_up-arrow {
    bottom: 42%;
  }
  .instruction-image {
    width: 100%;
  }
  .tree {
    margin-top: 45%;
  }
  .business-arrow__down--funnel {
    width: 12%;
    top: 30%;
    left: 20%;
  }
  .drops-container {
    top: 100px;
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(300px);
    }
  }
  .lightbox-content h2 {
    margin-bottom: 30px;
  }
  .lightbox-checkboxes {
    grid-gap: 3%;
  }
  .form {
    margin-top: 10%;
    margin-bottom: 10%;
  }
}

@media only screen and (min-width: 1920px) and (max-width: 1920px) and (min-height: 912px) and (max-height: 912px) {
  .checkboxes__upper {
    padding-left: 5%;
    gap: 5% !important;
  }
  .checkbox-item__upper {
    font-size: 110%;
  }
  .business-arrow__down {
    right: 15%;
    top: 8%;
  }
  .instruction-image {
    width: 120%;
  }
  .take-money {
    width: 39%;
  }
  .take-money__arrow {
    top: 20%;
    width: 9%;
  }
  .business-arrow__down--funnel {
    width: 10%;
    top: 25%;
    left: 21%;
  }
  .business_up {
    bottom: 35%;
  }
  .business_up-arrow {
    bottom: 50%;
  }
  .tree {
    margin-top: 37% !important;
  }
  .funnel-moving {
    transform: translateX(190px) translateY(-480px) rotate(60deg);
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0.1;
      transform: translateY(250px);
    }
  }
  .drops-container {
    top: 80px;
  }
  .tree {
    margin-top: 40%;
  }
  .coins__container {
    bottom: 130px;
    width: 440px;
    height: 310px;
  }
  .lightbox-content h2 {
    margin-top: 1%;
    font-size: 2.5rem;
    margin-bottom: 3%;
  }
  .lightbox-checkboxes {
    grid-gap: 1rem;
  }
  .lightbox__checkbox-item--label {
    font-size: 1.2rem;
  }
  .form {
    margin-top: 5%;
    margin-bottom: 10%;
  }
  .form input {
    height: 7%;
  }
  .form textarea {
    height: 20%;
  }
  .form button {
    margin-top: 5%;
  }
  .apply-button {
    font-size: 1.2rem;
    padding: 1rem 2rem;
  }
}

@media (max-width: 1400px) {
  .checkboxes__upper {
    padding: 2%;
  }
  .checkbox-item__upper {
    font-size: 80% !important;
  }
  .business-arrow__down {
    right: 15%;
    top: 4%;
  }
  .business-arrow__down--funnel {
    width: 15%;
    top: 45%;
    left: 20%;
  }
  .instruction-image {
    width: 100%;
  }
  .funnel-moving {
    transform: translateX(120px) translateY(-500px) rotate(60deg);
  }
  .drops-container {
    top: 80px;
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0.1;
      transform: translateY(300px);
    }
  }
  .tree {
    margin-top: 63% !important;
  }
  .coins__container {
    bottom: 100px;
    width: 320px;
    height: 220px;
  }
  .business_up {
    bottom: 22.5%;
  }
  .business_up-arrow {
    bottom: 34.5%;
  }
  .lightbox-content h2 {
    font-size: 2rem;
    margin-bottom: 5%;
  }
  .lightbox-checkboxes {
    grid-gap: 3%;
  }
  .form {
    margin-top: 20%;
    margin-bottom: 10%;
  }
}

@media only screen and (min-width: 1366px) and (max-width: 1366px) and (min-height: 1024px) and (max-height: 1024px) {
  .grow_buisness-with-mosaic {
    top: 2% !important;
    width: 80% !important;
  }
  .business-arrow__down {
    right: 15%;
    top: 6%;
  }
  .checkboxes__upper {
    margin: 0;
    padding: 10px;
    grid-gap: 15px;
  }
  .checkbox-item__upper {
    font-size: 85%;
  }
  .business-arrow__down--funnel {
    width: 10%;
    top: 55%;
    left: 23%;
  }
  .instruction-image {
    width: 97%;
  }
  .funnel-moving {
    transform: translateX(120px) translateY(-450px) rotate(60deg);
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(310px);
    }
  }
  .drops-container {
    top: 190px;
  }
  .tree {
    margin-top: 77% !important;
  }
  .coins__container {
    bottom: 100px;
    width: 320px;
    height: 220px;
  }
  .business_up {
    bottom: 19%;
  }
  .business_up-arrow {
    bottom: 30%;
  }
  .lightbox-content h2 {
    font-size: 2.5rem;
    margin-bottom: 5%;
  }
  .lightbox-checkboxes {
    grid-gap: 3%;
  }
  .form {
    margin-top: 20%;
    margin-bottom: 10%;
  }
}

@media only screen and (min-width: 1280px) and (max-width: 1280px) and (min-height: 800px) and (max-height: 800px) {
  .checkboxes__upper {
    padding: 2%;
    gap: 2% !important;
  }
  .checkbox-item__upper {
    font-size: 80%;
  }
  .business-arrow__down {
    right: 15%;
    top: 5%;
  }
  .instruction-image {
    width: 95%;
  }
  .take-money {
    width: 33%;
  }
  .business-arrow__down {
    top: 6%;
  }
  .business-arrow__down--funnel {
    width: 10%;
    top: 42%;
    left: 21%;
  }
  .funnel-moving {
    transform: translateX(120px) translateY(-400px) rotate(60deg);
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0.1;
      transform: translateY(250px);
    }
  }
  .drops-container {
    top: 80px;
  }
  .tree {
    margin-top: 54% !important;
  }
  .coins__container {
    bottom: 90px;
    width: 290px;
    height: 205px;
  }
  .lightbox-content h2 {
    margin-top: 1%;
    font-size: 2rem;
    margin-bottom: 3%;
  }
  .lightbox-checkboxes {
    grid-gap: 1.5%;
  }
  .lightbox__checkbox-item--label {
    font-size: 1rem;
  }
  .form {
    margin-top: 10%;
    margin-bottom: 10%;
  }
  .form input {
    height: 5%;
  }
  .form textarea {
    height: 15%;
  }
  .apply-button {
    font-size: 1.2rem;
    padding: 1rem 2rem;
  }
}

@media only screen and (min-width: 1180px) and (max-width: 1180px) and (min-height: 820px) and (max-height: 820px) {
  .business-arrow__down {
    right: 15%;
    top: 5%;
  }
  .checkboxes__upper {
    padding-top: 7% !important;
    grid-gap: 5px !important;
  }
  .checkbox-item__upper {
    font-size: 80%;
  }
  .checkbox-item__upper label {
    font-size: 80%;
  }
  .take-money {
    width: 30%;
  }
  .instruction-image {
    width: 90%;
  }
  .business-arrow__down--funnel {
    width: 10%;
    top: 48%;
    left: 23%;
  }
  .funnel-moving {
    transform: translateX(120px) translateY(-400px) rotate(60deg);
  }
  .drops-container {
    top: 110px;
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0.1;
      transform: translateY(250px);
    }
  }
  .tree {
    margin-top: 65% !important;
  }
  .coins__container {
    bottom: 80px;
    width: 270px;
    height: 200px;
  }
  .business_up {
    bottom: 23%;
  }
  .business_up-arrow {
    bottom: 34%;
  }
  .lightbox-content h2 {
    font-size: 1.5rem;
    margin-bottom: 5%;
  }
  .lightbox-checkboxes {
    grid-gap: 3%;
  }
  .lightbox__checkbox-item--label {
    font-size: 1rem;
  }
  .form {
    margin-top: 20%;
    margin-bottom: 10%;
  }
  .form input {
    height: 5%;
  }
  .form textarea {
    height: 13%;
  }
  .apply-button {
    font-size: 1.2rem;
    padding: 1rem 2rem;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 1366px) and (max-height: 1366px) {
  .service-selection__upper {
    height: 55%;
    background-color: #ffffff;
  }
  .service-selection__lower {
    height: 45%;
  }
  .checkboxes-container {
    left: 10%;
    top: 5%;
    width: 40%;
    height: 47%;
  }

  .checkboxes__upper {
    grid-template-columns: repeat(2, 1fr);
  }

  .checkboxes {
    grid-gap: 8%;
  }
  .checkbox-item label {
    font-size: 120%;
  }

  .checkbox-item.checked {
    color: #ff6400;
    font-weight: bold;
  }
  .checkbox-item input {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .funnel-container {
    top: 2%;
    right: 1%;
  }
  .funnel-moving {
    transform: translateX(-320px) translateY(200px) rotate(-60deg);
  }
  .drops-container {
    top: 70px;
    left: 35%;
  }
  .ground {
    bottom: -120%;
  }
  .take-money {
    right: 25%;
    top: 33%;
    width: 30%;
  }
  .take-money__arrow {
    top: 42%;
    right: 45%;
    width: 11%;
  }
  .cases-image {
    width: 45%;
  }
  .lightbox-content {
    height: 100%;
    padding: 0;
    border-radius: 0;
  }

  .lightbox-content h2 {
    font-size: 36px;
    margin-bottom: 20px;
    z-index: 999;
  }

  .lightbox-checkboxes {
    grid-gap: 10px;
  }
  .form input,
  .form textarea {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
  }

  .apply-button {
    font-size: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #ffffff;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 768px) and (max-height: 768px) {
  .business-arrow__down {
    right: 15%;
    top: 5%;
  }
  .checkboxes__upper {
    padding-top: 4% !important;
    grid-gap: 2% !important;
  }
  .checkbox-item__upper {
    font-size: 75% !important;
  }
  .checkbox-item__upper label {
    font-size: 75% !important;
  }
  .instruction-image {
    width: 75%;
  }
  .take-money {
    width: 33%;
  }
  .take-money__arrow {
    width: 11%;
  }
  .business-arrow__down--funnel {
    width: 10%;
    top: 51%;
    left: 24%;
  }
  .funnel-moving {
    transform: translateX(90px) translateY(-300px) rotate(60deg);
  }
  .drops-container {
    top: 160px;
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0.1;
      transform: translateY(200px);
    }
  }
  .tree {
    margin-top: 73% !important;
  }
  .coins__container {
    bottom: 70px;
    width: 235px;
    height: 170px;
  }
  .business_up {
    bottom: 20%;
  }
  .business_up-arrow {
    bottom: 34%;
  }
  .lightbox-content h2 {
    font-size: 1.5rem;
    margin-bottom: 5%;
  }
  .lightbox-checkboxes {
    grid-gap: 3%;
  }
  .lightbox__checkbox-item--label {
    font-size: 1rem;
  }
  .form {
    margin-top: 20%;
    margin-bottom: 10%;
  }
  .form input {
    height: 5%;
  }
  .form textarea {
    height: 13%;
  }
  .form button {
    margin-top: 20px;
    width: 270px;
    height: 60px;
  }
  .apply-button {
    font-size: 1.5rem;
    padding: 1rem 2rem;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 600px) and (max-height: 600px) {
  .business-arrow__down {
    right: 15%;
    top: 5%;
  }
  .checkboxes__upper {
    padding-top: 4% !important;
    grid-gap: 2% !important;
  }
  .heckbox-item__upper {
    font-size: 80%;
  }
  .checkbox-item__upper--input {
    width: 12px;
    height: 12px;
    border-radius: 4px;
    border: 2px solid #9e9e9e;
    background-color: transparent;
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    cursor: pointer;
  }
  .checkbox-item__upper label {
    font-size: 80%;
  }
  .grow_buisness-with-mosaic {
    top: 0.5%;
    width: 80%;
  }
  .instruction-image {
    width: 75%;
  }
  .take-money {
    width: 33%;
  }
  .business-arrow__down--funnel {
    width: 10%;
    top: 36%;
    left: 23%;
  }
  .funnel-moving {
    transform: translateX(90px) translateY(-320px) rotate(60deg);
  }
  .drops-container {
    top: 10px;
  }
  .drop.one-size {
    width: 60px;
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0.1;
      transform: translateY(230px);
    }
  }
  .tree {
    margin-top: 45% !important;
  }
  .coins__container {
    bottom: 70px;
    width: 235px;
    height: 170px;
  }
  .business_up {
    bottom: 30%;
  }
  .business_up-arrow {
    bottom: 46%;
  }
  .lightbox-content h2 {
    font-size: 1.5rem;
    margin-bottom: 5%;
  }
  .lightbox-checkboxes {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3%;
  }
  .lightbox__checkbox-item--label {
    font-size: 80%;
  }
  .form {
    margin-top: 5%;
    margin-bottom: 10%;
  }
  .form input {
    height: 5%;
  }
  .form textarea {
    height: 13%;
  }
  .form button {
    margin-top: 20px;
    width: 270px;
    height: 60px;
  }
  .apply-button {
    font-size: 1.5rem;
    padding: 1rem 2rem;
  }
}

@media only screen and (min-width: 820px) and (max-width: 820px) and (min-height: 1180px) and (max-height: 1180px) {
  .service-selection__upper {
    height: 55%;
    background-color: #ffffff;
  }
  .service-selection__lower {
    height: 45%;
  }
  .checkboxes-container {
    left: 10%;
    top: 5%;
    width: 40%;
    height: 47%;
  }

  .checkboxes {
    grid-gap: 6%;
  }
  .checkbox-item label {
    font-size: 120%;
  }

  .checkbox-item.checked {
    color: #ff6400;
    font-weight: bold;
  }
  .checkbox-item input {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .funnel-container {
    top: 2%;
    right: 1%;
  }
  .funnel-moving {
    transform: translateX(-260px) translateY(200px) rotate(-60deg);
  }
  .drops-container {
    top: 70px;
    left: 35%;
  }
  .ground {
    bottom: -90%;
  }
  .take-money {
    right: 25%;
    top: 33%;
    width: 30%;
  }
  .take-money__arrow {
    top: 42%;
    right: 45%;
    width: 11%;
  }
  .cases-image {
    width: 45%;
  }
  .lightbox-content {
    height: 100%;
    padding: 0;
    border-radius: 0;
  }

  .lightbox-content h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .lightbox-checkboxes {
    grid-gap: 1%;
  }
  .form input,
  .form textarea {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
  }
  .form input {
    height: 28px;
  }

  .form textarea {
    height: 65px;
  }

  .form button {
    margin-top: 20px;
    width: 300px;
    height: 52px;
    background-color: #ff6400;
    color: #ffffff;
  }

  .apply-button {
    font-size: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #ffffff;
  }
}

@media only screen and (min-width: 768px) and (max-width: 768px) and (max-height: 1024px) and (min-height: 1024px) {
  .service-selection__upper {
    height: 55%;
    background-color: #ffffff;
  }
  .service-selection__lower {
    height: 45%;
  }
  .checkboxes-container {
    left: 10%;
    top: 5%;
    width: 40%;
    height: 47%;
  }

  .checkboxes {
    grid-gap: 3%;
  }
  .checkbox-item label {
    font-size: 120%;
  }

  .checkbox-item.checked {
    color: #ff6400;
    font-weight: bold;
  }
  .checkbox-item input {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .funnel-container {
    top: 2%;
    right: 1%;
  }
  .funnel-moving {
    transform: translateX(-250px) translateY(170px) rotate(-60deg);
  }
  .drops-container {
    top: 70px;
    left: 35%;
  }
  .ground {
    bottom: -120%;
  }
  .take-money {
    right: 25%;
    top: 33%;
    width: 30%;
  }
  .take-money__arrow {
    top: 42%;
    right: 45%;
    width: 11%;
  }
  .cases-image {
    width: 45%;
  }
  .lightbox-content {
    height: 100%;
    padding: 0;
    border-radius: 0;
  }

  .lightbox-content h2 {
    font-size: 28px;
    margin-bottom: 15px;
  }

  .lightbox-checkboxes {
    grid-gap: 1%;
  }

  .form input,
  .form textarea {
    width: 100%;
    margin: 10px 0;
    padding: 5px;
  }
  .form input {
    height: 26px;
  }

  .form textarea {
    height: 46px;
  }

  .form button {
    margin-top: 10px;
    width: 300px;
    height: 52px;
    background-color: #ff6400;
    color: #ffffff;
  }

  .apply-button {
    font-size: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #ffffff;
  }
}

@media (max-width: 767px) {
  .service-selection__upper {
    height: 55%;
    background-color: #ffffff;
  }
  .service-selection__lower {
    height: 45%;
  }
  .checkboxes-container {
    left: 1%;
    top: 5%;
    width: 20%;
    height: 47%;
  }

  .checkboxes {
    width: 70%;
    grid-gap: 1%;
  }
  .checkbox-item label {
    font-size: 120%;
  }

  .checkbox-item.checked {
    color: #ff6400;
    font-weight: bold;
  }
  .checkbox-item input {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .funnel-container {
    top: 130%;
    right: 20%;
  }
  .funnel-moving {
    transform: translateX(-40px) translateY(-200px) rotate(-60deg);
  }
  .drops-container {
    top: 70px;
    left: 35%;
  }
  .take-money {
    right: 40%;
    top: 35%;
    width: 30%;
  }
  .take-money__arrow {
    top: 50%;
    right: 45%;
    width: 11%;
  }
  .cases-image {
    width: 80%;
  }
  .lightbox-content {
    height: 100%;
    padding: 0;
    border-radius: 0;
  }

  .lightbox-content h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .lightbox__checkboxes-container {
    margin-left: -30%;
    margin-bottom: 2%;
  }

  .lightbox-checkboxes {
    font-size: 12px;
    width: 50%;
    grid-gap: 0.5%;
  }

  .form input,
  .form textarea {
    width: 100%;
    margin: 5px 0;
    padding: 5px;
  }
  .form input {
    height: 26px;
  }

  .form textarea {
    height: 46px;
  }

  .form button {
    margin-top: 10px;
    width: 300px;
    height: 52px;
    background-color: #ff6400;
    color: #ffffff;
  }

  .apply-button {
    font-size: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #ffffff;
  }
}
@media (max-width: 430px) {
  .lightbox-content h2 {
    font-size: 28px;
    margin-bottom: 5px;
  }

  .lightbox-checkboxes {
    font-size: 12px;
    width: 50%;
    grid-gap: 1%;
    margin-bottom: 5%;
    margin-top: 5%;
  }
  .form {
    margin-top: 1%;
  }
  .form input,
  .form textarea {
    width: 80%;
  }
  .form input {
    height: 20px;
  }

  .form textarea {
    height: 40px;
  }

  .form button {
    margin-top: 2px;
    width: 300px;
    height: 48px;
    background-color: #ff6400;
    color: #ffffff;
  }

  .apply-button {
    font-size: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #ffffff;
  }
}
@media (max-width: 414px) {
  .checkboxes-container {
    left: 2%;
    top: 8%;
    width: 30%;
    height: 30%;
  }

  .checkboxes {
    width: 50%;
    grid-gap: 6%;
  }
  .checkbox-item label {
    font-size: 110%;
  }
  .checkbox-item input {
    width: 20px;
    height: 20px;
    border-radius: 3px;
  }
  .funnel-moving {
    transform: translateX(-20px) translateY(-180px) rotate(-60deg);
  }
  .lightbox-content h2 {
    font-size: 28px !important;
    margin-bottom: 5px;
  }

  .lightbox-checkboxes {
    font-size: 12px;
    width: 50%;
    grid-gap: 1%;
    margin-bottom: 10%;
    margin-top: 10%;
  }
  .form {
    margin-top: 1%;
  }
  .form input,
  .form textarea {
    width: 80%;
  }
  .form input {
    height: 20px;
  }

  .form textarea {
    height: 40px;
  }

  .form button {
    margin-top: 2px;
    width: 300px;
    height: 48px;
    background-color: #ff6400;
    color: #ffffff;
  }

  .apply-button {
    font-size: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #ffffff;
  }
}
@media (max-width: 390px) {
  .checkboxes-container {
    left: 2%;
    top: 8%;
    width: 20%;
    height: 30%;
  }

  .checkboxes {
    width: 50%;
    grid-gap: 5%;
  }
  .checkbox-item label {
    font-size: 100%;
  }
  .checkbox-item input {
    width: 20px;
    height: 20px;
    border-radius: 3px;
  }
  .funnel-moving {
    transform: translateX(-20px) translateY(-160px) rotate(-60deg);
  }
  .lightbox-content h2 {
    font-size: 20px !important;
    margin-bottom: 5px;
  }

  .lightbox-checkboxes {
    font-size: 12px;
    width: 50%;
    grid-gap: 0.5%;
  }
  .form {
    margin-top: 1%;
  }
  .form input,
  .form textarea {
    width: 80%;
  }
  .form input {
    height: 20px;
  }

  .form textarea {
    height: 40px;
  }

  .form button {
    margin-top: 2px;
    width: 300px;
    height: 48px;
    background-color: #ff6400;
    color: #ffffff;
  }

  .apply-button {
    font-size: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #ffffff;
  }
}
@media (max-width: 375px) {
  .checkboxes-container {
    left: 1%;
    top: 5%;
    width: 20%;
    height: 30%;
  }

  .checkboxes {
    margin-left: 50%;
    width: 70%;
    grid-gap: 3%;
  }
  .checkbox-item label {
    font-size: 90%;
  }
  .checkbox-item input {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }
  .funnel-container {
    top: 130%;
    right: 10%;
  }
  .funnel-image {
    width: 80%;
  }
  .funnel-moving {
    transform: translateX(-60px) translateY(-140px) rotate(-60deg);
  }
  .drops-container {
    top: 70px;
    left: 35%;
  }
  .take-money {
    right: 40%;
    top: 35%;
    width: 30%;
  }
  .take-money__arrow {
    top: 50%;
    right: 45%;
    width: 11%;
  }
  .ground {
    bottom: -35%;
  }
  .cases-image {
    width: 60%;
  }
  .lightbox-content h2 {
    font-size: 20px;
    text-align: center;
    margin: 1% auto;
  }

  .lightbox-checkboxes {
    font-size: 12px;
    width: 50%;
    grid-gap: 1%;
    margin-bottom: 1%;
    margin-top: 2%;
  }

  .form input,
  .form textarea {
    width: 80%;
  }
  .form input {
    height: 18px;
  }

  .form textarea {
    height: 35px;
  }
}
@media (max-width: 360px) {
  .checkboxes-container {
    left: 1%;
    top: 5%;
    width: 20%;
    height: 30%;
  }

  .checkboxes {
    width: 50%;
    grid-gap: 3%;
  }
  .checkbox-item label {
    font-size: 90%;
  }
  .checkbox-item input {
    width: 18px;
    height: 18px;
    border-radius: 3px;
  }
  .funnel-moving {
    transform: translateX(-60px) translateY(-140px) rotate(-60deg);
  }
  .ground {
    bottom: -10%;
  }
  .lightbox-content h2 {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .lightbox-checkboxes {
    font-size: 12px;
    width: 50%;
    grid-gap: 1%;
    margin-bottom: 3%;
    margin-top: 2%;
  }
  .form {
    margin-top: 1%;
  }
  .form input,
  .form textarea {
    width: 80%;
  }
  .form input {
    height: 20px;
  }

  .form textarea {
    height: 40px;
  }

  .form button {
    margin-top: 2px;
    width: 300px;
    height: 48px;
    background-color: #ff6400;
    color: #ffffff;
  }

  .apply-button {
    font-size: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #ffffff;
  }
}
</style>
