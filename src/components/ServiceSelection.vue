<!-- ServiceSelection.vue -->
<template>
  <div
    v-if="!isVerticalLayout"
    class="service-selection"
    ref="serviceSelection"
  >
    <!-- Горизонтальная разметка -->
    <div class="service-selection__upper">
      <div class="checkboxes-container__upper">
        <img
          class="instruments__img"
          :class="{ animated: isGrowBusinessAnimating }"
          src="../images/logos/instruments.png"
          alt="instruments"
        />
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
        </div>
      </div>

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
      <img
        v-if="isAnyCheckboxSelected && showFunnelCircle"
        class="funnel-circle"
        src="../images/funnel-circle.svg"
        alt="funnel-circle"
        @click="hideFunnelCircle"
      />
      <img
        v-if="isAnyCheckboxSelected && showFunnelCircle"
        class="funnel-circle__arrow"
        src="../images/logos/funnel-circle__arrow.svg"
        alt="funnel-circle__arrow"
      />

      <div class="service-selection__lower--tree">
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
          <img
            v-if="!isAnyCheckboxSelected && !isPouring"
            class="add-arrow"
            src="../images/logos/add-arrow.png"
            :class="{ animated: isArrowAnimating }"
            alt="add-arrow"
          />
          <img class="ground" src="../images/ground.png" alt="ground" />

          <div class="ground-instruction_container">
            <img
              v-if="!isAnyCheckboxSelected && !isPouring"
              class="add"
              src="../images/logos/add.png"
              alt="add"
            />
            <img
              v-if="isAnyCheckboxSelected && !isPouring && !isGrown"
              class="grow_business-with-mosaic"
              :class="{ animated: isGrowBusinessAnimating }"
              src="../images/grow_buisness-with-mosaic.png"
              alt="grow-business-with-mosaic"
            />
            <img
              v-if="isPouring || (isGrown && !isTakeMoneyWhiteVisible)"
              class="business-up"
              src="../images/business_up.svg"
              alt="business-up"
            />
            <img
              v-if="isTakeMoneyWhiteVisible"
              class="take-money-white"
              src="../images/money.png"
              alt="take-money"
            />
          </div>
          <img
            v-if="isPouring || (isGrown && !isTakeMoneyWhiteVisible)"
            class="business-grow-arrow"
            src="../images/business_up-arrow-white.png"
            alt="business-grow"
          />
          <img
            v-if="isTakeMoneyWhiteVisible"
            class="take-money-arrow"
            src="../images/business_up-arrow-white.png"
            alt="take-money-arrow"
          />
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

    <!-- Лайтбокс для горизонтальной разметки -->
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

  <!-- Вертикальная разметка -->

  <div
    v-if="isVerticalLayout"
    class="service-selection--vertical"
    ref="serviceSelection"
  >
    <div class="service-selection__upper--vertical">
      <div class="instruction-image__container--vertical">
        <img
          class="instruction-image--vertical"
          src="../images/instruction.png"
          alt="instruction"
        />
      </div>

      <img
        v-if="!showLightbox"
        :class="[
          'funnel-image--vertical',
          isPouring ? 'funnel-moving--vertical' : '',
          isAnimating ? 'funnel-animating--vertical' : '',
        ]"
        src="../images/logos/funnel-left.png"
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

      <div class="service-selection__checboxes-instruction container">
        <div class="checkboxes-container--vertical">
          <form class="checkboxes--vertical">
            <div
              v-for="(service, index) in services"
              :key="service"
              :class="[
                'checkbox-item--vertical',
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
    </div>
    <div class="service-selection__lower--vertical">
      <div class="service-selection__lower--tree--vertical">
        <img
          class="business_up--vertical"
          :class="{ invisible: isGrown }"
          src="../images/business-up_vertical.svg"
          alt="business_up"
        />
        <img
          class="business_up-arrow--vertical"
          :class="{ invisible: isGrown }"
          src="../images/business_up-arrow.png"
          alt="business_up-arrow"
        />
        <img
          class="take-money--vertical"
          :class="{ invisible: !isTakeMoneyWhiteVisible }"
          src="../images/money-vertical.svg"
          alt="take-money"
        />
        <img
          class="take-money__arrow--vertical"
          :class="{ invisible: !isTakeMoneyWhiteVisible }"
          src="../images/money-arrow-vertical.png"
          alt="money-arrow"
        />
        <div class="small-tree__container--vertical">
          <transition name="tree-fade">
            <img
              v-if="showSmallTree"
              class="small-tree--vertical"
              src="@/images/small-tree.svg"
              alt="small-tree"
            />
          </transition>
          <transition name="tree-grow" @after-enter="onTreeGrown">
            <img
              v-if="isGrown"
              class="big-tree--vertical"
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
        <div class="ground-container--vertical">
          <img
            class="ground--vertical"
            src="../images/ground.png"
            alt="ground"
          />
        </div>

        <div class="drops-container--vertical">
          <img
            v-for="(drop, index) in drops"
            :key="index"
            :class="['drop--vertical', drop.size]"
            :src="drop.src"
            alt="drop"
          />
        </div>
      </div>
      <div class="service-selection__lower--cases--vertical">
        <div class="service-selection__lower--cases-arrow--vertical">
          <img
            class="cases-arrow--vertical"
            src="../images/logos/cases-arrow.png"
            alt="cases-arrow"
          />
        </div>
        <div class="service-selection__lower--cases-image--vertical">
          <img
            class="cases-image--vertical"
            src="../images/logos/cases.png"
            alt="cases"
          />
        </div>
      </div>
    </div>

    <!-- Лайтбокс для вертикальной разметки -->
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
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
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
    const isArrowAnimating = ref(true);
    const isAnimating = ref(false);
    const showFunnelCircle = ref(true);
    const isTakeMoneyWhiteVisible = ref(false);

    let checkboxCounter = 0;
    let arrowAnimationInterval;
    let growBusinessAnimationTimeout;

    const showLightbox = computed(() => store.getters.isLightboxVisible);

    const updateIsVerticalLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const verticalLayouts = [
        { width: 1024, height: 1366 },
        { width: 820, height: 1180 },
        { width: 768, height: 1024 },
      ];

      return (
        verticalLayouts.some(
          (layout) => layout.width === width && layout.height === height,
        ) ||
        width <= 767 ||
        width <= 430 ||
        width <= 414 ||
        width <= 390 ||
        width <= 375 ||
        width <= 360
      );
    };

    const delayedOpenLightbox = () => {
      setTimeout(() => {
        openLightbox();
      }, 2000);
    };

    const isVerticalLayout = ref(updateIsVerticalLayout());

    const updateIsMobile = () => {
      isVerticalLayout.value = updateIsVerticalLayout();
    };

    onMounted(() => {
      window.addEventListener("resize", updateIsMobile);
      updateIsMobile(); // Initial check
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
          src: require("../images/drops.svg"),
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
      const coinImages = Array(selectedServiceCount).fill(
        require("../images/coin.svg"),
      );
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
            delayedOpenLightbox();
            lightboxSelectedServices.value = [...selectedServices.value];
            console.log(lightboxSelectedServices.value);
            isGrowBusinessAnimating.value = false;
            isPouring.value = false;
          },
          selectedServiceCount * 100 + 1000,
        );
      }, 10);
    };

    const getCoinStyle = (index, total) => {
      isTakeMoneyWhiteVisible.value = true;
      const container = document.querySelector(".coins__container");
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const coinSize = Math.max(70, containerWidth / (total * 20));

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

          const distance = Math.sqrt(
            Math.pow(coinX - x, 2) + Math.pow(coinY - y, 2),
          );
          if (distance < coinSize * 20) {
            overlapping = true;
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
      const formData = {
        name: lightboxName.value,
        phone: lightboxPhone.value,
        message: lightboxMessage.value,
        services: [...lightboxSelectedServices.value],
      };
      console.log("ServiceSelection formData: ", formData);
      store.dispatch("setFormData", formData);
      router.push("/second-page");
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

    const hideFunnelCircle = () => {
      pourWater();
      showFunnelCircle.value = false;
    };

    const isAnyCheckboxSelected = computed(
      () => selectedServices.value.length > 0,
    );

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
      isVerticalLayout,
      isAnyCheckboxSelected,
      showFunnelCircle,
      hideFunnelCircle,
      isTakeMoneyWhiteVisible,
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

.instruments__img {
  position: absolute;
  left: 5%;
  top: 2%;
  width: 76%;
  transition: transform 2s ease-in-out;
}

.instruments__img.animated {
  transform: scale(1.1);
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

.ground-instruction_container {
  position: absolute;

  left: 20%;

  width: 80%;
  height: 20%;

  display: flex;
  justify-content: start;
  align-items: center;
}

.add {
  z-index: 11;
}

.add-arrow {
  position: absolute;
  bottom: 13%;
  left: 7%;
  width: 10%;
  z-index: 11;
}

.add-arrow.animated {
  animation: bounce 1s infinite;
}

.grow_business-with-mosaic {
  z-index: 11;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.funnel-circle {
  position: absolute;
  left: 1%;
  bottom: 37%;
  width: 20%;
  z-index: 1007;
  animation: pulse 2s infinite;
  cursor: pointer;
}

.funnel-circle__arrow {
  position: absolute;
  left: 20%;
  bottom: 25%;
  width: 12%;
  z-index: 1008;
  animation: bounce 1s infinite;
}

.business-up {
  z-index: 1001;
}

.business-grow-arrow {
  position: absolute;
  left: 62%;
  bottom: 20%;
  transform: rotate(45deg);
  z-index: 1001;
}

.take-money-white {
  z-index: 1001;
}

.take-money-arrow {
  position: absolute;
  left: 68%;
  bottom: 17%;
  width: 6%;
  z-index: 1001;
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
  animation: growTree 3s linear forwards;
}

@keyframes growTree {
  0% {
    transform: scale(1);
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

/* Стили для вертикальной разметки */

.service-selection--vertical {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.service-selection__upper--vertical {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  background-color: #828282;
  width: 100%;
  height: 60%;
}

.funnel-image--vertical {
  position: absolute;
  width: 100%;
  cursor: pointer;
  transition: transform 2s ease-in-out;
  z-index: 10;
}

.funnel-animating--vertical {
  transform: scale(1.3);
}

.funnel-moving--vertical {
  transform: translateX(-200px) translateY(180px) rotate(-60deg);
}

.drops-container--vertical {
  position: absolute;
  top: 177px;
  left: 45%;
  transform: translate(-50%, -100%);
  pointer-events: none;
}

.drop--vertical {
  left: calc(50% - 40px);
  animation: drop-fall 3s linear forwards;
}

.service-selection__lower--vertical {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;
  z-index: 1;
}
.instruction-image__container--vertical {
  position: relative;
  display: flex;
  flex-direction: column;
  object-fit: contain;
  width: 50%;
}

.instruction-image--vertical {
  position: relative;
  top: 1%;
  left: 2%;
}
.service-selection__lower--tree--vertical {
  position: relative;
  width: 82%;
  background-color: #ededed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1;
}
.ground-container--vertical {
  position: relative;
  height: 40%;
  width: 100%;
  z-index: 10;
}

.ground--vertical {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
.small-tree__container--vertical {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 60%;
  z-index: 20;
}

.small-tree--vertical {
  position: absolute;
  left: 30%;
  bottom: -17.5%;
  width: 15%;
  transition:
    opacity 0.0005s ease-out,
    transform 0.0005s ease-out;
  z-index: 90;
}

.small-tree--vertical.hidden {
  animation: fadeOut 0.0005s ease-out;
}

.big-tree--vertical {
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

.big-tree--vertical.tree-grow {
  transform: scale(3);
  opacity: 1;
  animation: growTree 3s ease-in-out forwards;
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

.business_up--vertical {
  margin-top: 4%;
  margin-left: 4%;
  width: 29%;
  z-index: 50;
}

.business_up-arrow--vertical {
  margin-top: 1%;
  margin-left: 16%;
  width: 10%;
  z-index: 50;
}

.take-money--vertical {
  position: absolute;
  right: 25%;
  top: 45%;
  width: 29%;
  z-index: 50;
}

.take-money__arrow--vertical {
  position: absolute;
  top: 56%;
  right: 47%;
  width: 10%;
  z-index: 50;
}
.service-selection__lower--cases--vertical {
  position: relative;
  width: 18%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
}

.service-selection__lower--cases-arrow--vertical {
  width: 100%;
}

.cases-arrow--vertical {
  margin-left: 40%;
  width: 50%;
}

.cases-image--vertical {
  width: 60%;
}

.service-selection__lower--cases-image--vertical {
  width: 100%;
}

.checkboxes-container--vertical {
  position: absolute;
  left: 10%;
  top: 5%;
  width: 200%;
  height: 200%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkboxes--vertical {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.checkbox-item--vertical {
  display: flex;
  align-items: center;
  font-family: "Montserrat";
  font-weight: 10%;
  color: #9e9e9e;
  width: 100%;
  box-sizing: border-box;
}

.checkbox-item--vertical label {
  font-size: 90%;
}

.checkbox-item--vertical.checked {
  color: #ffffff;
}

.checkbox-item--vertical input {
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

.checkbox-item--vertical input:checked::after {
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
@media (max-width: 2560px) {
  .checkboxes__upper {
    padding-left: 5%;
    gap: 1%;
  }
  .checkbox-item__upper {
    font-size: 80%;
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
    right: -5%;
    bottom: 160px;
    width: 500px;
    height: 370px;
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

  .instruction-image {
    width: 120%;
  }
  .take-money {
    width: 35%;
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
    right: -3.5%;
    bottom: 140px;
    width: 420px;
    height: 280px;
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
    gap: 5% !important;
  }
  .checkbox-item__upper {
    font-size: 110%;
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
    bottom: 140px;
    right: -3%;
    width: 420px;
    height: 270px;
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

@media only screen and (min-width: 1400px) and (max-width: 1400px) and (min-height: 933px) and (max-height: 933px) {
  .checkboxes__upper {
    margin-left: -10%;
    padding: 2%;
  }
  .checkbox-item__upper {
    font-size: 80% !important;
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
  .checkboxes-container__upper {
    justify-content: flex-start;
  }
  .checkboxes__upper {
    grid-gap: 5% !important;
  }
  .checkbox-item__upper label {
    font-size: 80%;
  }
  .instruction-image {
    width: 97%;
  }
  .funnel-circle {
    width: 20%;
    bottom: 30%;
  }
  .funnel-circle__arrow {
    width: 12%;
    bottom: 20%;
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
    width: 300px;
    height: 210px;
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
  .instruments__img {
    top: 1%;
    width: 80%;
  }
  .checkboxes-container__upper {
    justify-content: start;
  }
  .checkboxes__upper {
    margin-top: 2%;
    padding: 2%;
    gap: 2% !important;
  }
  .checkbox-item__upper {
    font-size: 80%;
  }

  .checkbox-item__upper label {
    font-size: 80%;
  }

  .instruction-image {
    width: 95%;
  }
  .take-money {
    width: 33%;
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
    width: 280px;
    height: 195px;
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
  .grow_buisness-with-mosaic {
    top: 2% !important;
    width: 80% !important;
  }
  .checkboxes-container__upper {
    justify-content: flex-start;
  }
  .checkboxes__upper {
    grid-gap: 3% !important;
  }
  .checkbox-item__upper label {
    font-size: 70%;
  }
  .instruction-image {
    width: 97%;
  }
  .funnel-circle {
    width: 20%;
    bottom: 30%;
  }
  .funnel-circle__arrow {
    width: 12%;
    bottom: 20%;
  }
  .funnel-moving {
    transform: translateX(100px) translateY(-370px) rotate(60deg);
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(250px);
    }
  }
  .drops-container {
    top: 70px;
  }
  .tree {
    margin-top: 63% !important;
  }
  .coins__container {
    bottom: 90px;
    width: 250px;
    height: 180px;
  }
  .business_up {
    bottom: 19%;
  }
  .business_up-arrow {
    bottom: 30%;
  }
  .lightbox-content h2 {
    font-size: 2rem;
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
  .form button {
    margin-top: 20px;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 1366px) and (max-height: 1366px) {
  .service-selection__upper--vertical {
    display: flex;
    height: 55%;
    background-color: #ffffff;
  }
  .service-selection__lower--vertical {
    height: 45%;
  }

  .instruction-image__container {
    width: 50%;
  }
  .funnel-image--vertical {
    width: 30%;
    right: 1%;
    top: -25%;
  }
  .checkboxes-container--vertical {
    left: 5%;
    top: 39%;
    width: 100%;
    height: 60%;
  }

  .checkboxes--vertical {
    grid-gap: 1%;
  }
  .checkbox-item--vertical label {
    font-size: 120%;
  }

  .checkbox-item--vertical.checked {
    color: #ff6400;
    font-weight: bold;
  }
  .checkbox-item--vertical input {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .funnel-moving--vertical {
    transform: translateX(-400px) translateY(380px) rotate(-60deg);
  }
  .small-tree__container--vertical {
    width: 120%;
    right: 10%;
    top: 10%;
  }

  .coins__container {
    left: 20%;
    bottom: 70%;
    width: 350px;
    height: 270px;
  }
  .drops-container--vertical {
    top: 70px;
    left: 35%;
  }
  .ground--vertical {
    bottom: -120%;
  }
  .take-money--vertical {
    right: 10%;
    top: 33%;
    width: 30%;
  }
  .take-money__arrow--vertical {
    top: 42%;
    right: 30%;
    width: 6%;
    transform: rotate(70deg);
  }
  .cases-image--vertical {
    width: 60%;
  }
  .lightbox-content {
    width: 600px;
    height: 90%;
    padding: 0;
    border-radius: 30px;
    z-index: 803;
  }

  .lightbox-content h2 {
    margin-top: 2rem;
    font-size: 2.5rem;
    margin-bottom: 10%;
    z-index: 999;
  }

  .lightbox-checkboxes {
    grid-gap: 20px;
  }
  .form {
    margin-top: 10%;
  }
  .form input {
    width: 80%;
    height: 5%;
    margin: 10px 0;
    padding: 10px;
  }
  .form textarea {
    width: 80%;
    height: 30%;
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
  .grow_buisness-with-mosaic {
    top: 2% !important;
    width: 80% !important;
  }
  .checkboxes-container__upper {
    justify-content: flex-start;
  }
  .checkboxes__upper {
    grid-gap: 3% !important;
  }
  .checkbox-item__upper input {
    width: 16px;
    height: 16px;
    border-radius: 6px;
  }
  .checkbox-item__upper label {
    font-size: 6%;
  }
  .instruction-image {
    width: 97%;
  }
  .funnel-circle {
    width: 20%;
    bottom: 30%;
  }
  .funnel-circle__arrow {
    width: 12%;
    bottom: 20%;
  }
  .funnel-moving {
    transform: translateX(100px) translateY(-370px) rotate(60deg);
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(250px);
    }
  }
  .drops-container {
    top: 70px;
  }
  .tree {
    margin-top: 66% !important;
  }
  .coins__container {
    bottom: 70px;
    width: 220px;
    height: 160px;
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
  .instruments__img {
    top: 1%;
  }
  .checkboxes-container__upper {
    justify-content: flex-start;
  }
  .checkboxes__upper {
    padding-top: 4% !important;
    grid-gap: 3% !important;
  }
  .checkbox-item__upper label {
    font-size: 63% !important;
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
    font-size: 72%;
  }
  .cases-image--vertical {
    width: 60%;
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
    bottom: 80px;
    width: 225px;
    height: 150px;
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
  .service-selection__upper--vertical {
    display: flex;
    height: 55%;
    background-color: #ffffff;
  }
  .service-selection__lower--vertical {
    height: 45%;
  }

  .instruction-image__container {
    width: 50%;
  }
  .funnel-image--vertical {
    width: 30%;
    right: 1%;
    top: -25%;
  }
  .checkboxes-container--vertical {
    left: 5%;
    top: 39%;
    width: 100%;
    height: 60%;
  }

  .checkboxes--vertical {
    grid-gap: 1%;
  }
  .checkbox-item--vertical label {
    font-size: 120%;
  }

  .checkbox-item--vertical.checked {
    color: #ff6400;
    font-weight: bold;
  }
  .checkbox-item--vertical input {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .funnel-moving--vertical {
    transform: translateX(-400px) translateY(380px) rotate(-60deg);
  }
  .small-tree__container--vertical {
    width: 120%;
    right: 10%;
    top: 10%;
  }

  .coins__container {
    left: 19%;
    bottom: 70%;
    width: 290px;
    height: 180px;
  }
  .drops-container--vertical {
    top: 70px;
    left: 35%;
  }
  .ground--vertical {
    bottom: -120%;
  }
  .take-money--vertical {
    right: 10%;
    top: 33%;
    width: 30%;
  }
  .take-money__arrow--vertical {
    top: 42%;
    right: 30%;
    width: 6%;
    transform: rotate(70deg);
  }
  .funnel-moving--vertical {
    transform: translateX(-330px) translateY(380px) rotate(-60deg);
  }
  .small-tree--vertical {
    bottom: -30%;
  }
  .big-tree--vertical {
    bottom: -30%;
  }
  .cases-image--vertical {
    margin-top: 10%;
    width: 70%;
  }
  .lightbox-content {
    width: 600px;
    height: 90%;
    padding: 0;
    border-radius: 30px;
    z-index: 803;
  }

  .lightbox-content h2 {
    margin-top: 2rem;
    font-size: 2.5rem;
    margin-bottom: 10%;
    z-index: 999;
  }

  .lightbox-checkboxes {
    grid-gap: 20px;
  }
  .form {
    margin-top: 10%;
  }
  .form input {
    width: 80%;
    height: 5%;
    margin: 10px 0;
    padding: 10px;
  }
  .form textarea {
    width: 80%;
    height: 30%;
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

@media only screen and (min-width: 768px) and (max-width: 768px) and (max-height: 1024px) and (min-height: 1024px) {
  .service-selection__upper--vertical {
    display: flex;
    height: 55%;
    background-color: #ffffff;
  }
  .service-selection__lower--vertical {
    height: 45%;
  }

  .instruction-image__container {
    width: 50%;
  }
  .funnel-image--vertical {
    width: 30%;
    right: 1%;
    top: -25%;
  }
  .checkboxes-container--vertical {
    left: 5%;
    top: 39%;
    width: 100%;
    height: 60%;
  }

  .checkboxes--vertical {
    grid-gap: 1%;
  }
  .checkbox-item--vertical label {
    font-size: 120%;
  }

  .checkbox-item--vertical.checked {
    color: #ff6400;
    font-weight: bold;
  }
  .checkbox-item--vertical input {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .funnel-moving--vertical {
    transform: translateX(-300px) translateY(250px) rotate(-60deg) !important;
  }
  .small-tree__container--vertical {
    width: 120%;
    right: 10%;
    top: 5%;
  }

  .coins__container {
    left: 19%;
    bottom: 70%;
    width: 290px;
    height: 180px;
  }
  .drops-container--vertical {
    top: 70px;
    left: 35%;
  }
  .ground--vertical {
    bottom: -120%;
  }
  .take-money--vertical {
    right: 10%;
    top: 33%;
    width: 30%;
  }
  .take-money__arrow--vertical {
    top: 42%;
    right: 30%;
    width: 6%;
    transform: rotate(70deg);
  }
  .funnel-moving--vertical {
    transform: translateX(-330px) translateY(380px) rotate(-60deg);
  }
  .small-tree--vertical {
    bottom: -30%;
  }
  .big-tree--vertical {
    bottom: -30%;
  }
  .cases-image--vertical {
    margin-top: 10%;
    width: 65%;
  }
  .lightbox {
    z-index: 10007;
  }
  .lightbox-content {
    width: 600px;
    height: 75%;
    padding: 0;
    border-radius: 30px;
    z-index: 900 !important;
  }

  .lightbox-content h2 {
    margin-top: 2rem;
    font-size: 2rem;
    margin-bottom: 10%;
    z-index: 999;
  }

  .lightbox-checkboxes {
    grid-gap: 3%;
  }
  .lightbox__checkbox-item--label {
    font-size: 1.2rem;
  }
  .form {
    margin-top: 10%;
  }
  .form input {
    width: 80%;
    height: 10%;
    margin: 10px 0;
    padding: 10px;
  }
  .form textarea {
    width: 80%;
    height: 30%;
    margin: 5px 0;
    padding: 10px;
  }

  .form button {
    margin-top: 20px;
    width: 270px;
    height: 60px;
  }

  .apply-button {
    font-size: 24px;
    padding: 8px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #ffffff;
  }
}

@media (max-width: 767px) {
  .service-selection__upper--vertical {
    display: flex;
    height: 55%;
    background-color: #ffffff;
  }
  .service-selection__lower--vertical {
    height: 45%;
  }

  .instruction-image__container--vertical {
    width: 60% !important;
  }
  .funnel-image--vertical {
    width: 30%;
    right: 1%;
    top: -25%;
  }
  .checkboxes-container--vertical {
    left: -5% !important;
    top: 30% !important;
    width: 100%;
    height: 60%;
  }

  .checkboxes--vertical {
    grid-gap: 2px !important;
  }
  .checkbox-item--vertical input {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .checkbox-item--vertical label {
    font-size: 85% !important;
  }

  .checkbox-item--vertical.checked {
    color: #1a1614;
    font-weight: bold;
  }
  .checkbox-item--vertical input {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }
  .funnel-image--vertical {
    top: -20% !important;
    right: -1% !important;
    width: 40% !important;
  }
  .small-tree__container--vertical {
    width: 120%;
    right: 10%;
    top: 5%;
  }

  .coins__container {
    left: 20%;
    bottom: 30%;
    width: 150px;
    height: 120px;
  }
  .drops-container--vertical {
    top: 20px;
    left: 35%;
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
  .take-money--vertical {
    right: 10%;
    top: 33%;
    width: 30%;
  }
  .take-money__arrow--vertical {
    top: 42%;
    right: 30%;
    width: 6%;
    transform: rotate(70deg);
  }
  .funnel-moving--vertical {
    transform: translateX(-160px) translateY(250px) rotate(-60deg) !important;
  }
  .small-tree--vertical {
    bottom: -11% !important;
  }
  .big-tree--vertical {
    bottom: -8% !important;
  }
  .cases-image--vertical {
    margin-top: 10%;
    width: 65%;
  }
  .lightbox {
    z-index: 10007;
  }

  .lightbox__checkboxes-container {
    margin-left: 3%;
    align-items: start;
  }
  .lightbox-content {
    width: 400px !important;
    height: 75%;
    padding: 0;
    border-radius: 30px;
    z-index: 900 !important;
  }

  .lightbox-content h2 {
    margin-top: 2rem;
    font-size: 2rem;
    margin-bottom: 10%;
    z-index: 999;
  }

  .lightbox-checkboxes {
    grid-gap: 3%;
  }
  .lightbox__checkbox-item--label {
    font-size: 1.2rem;
  }
  .form {
    margin-top: 10%;
  }
  .form input {
    width: 80%;
    height: 10%;
    margin: 10px 0;
    padding: 10px;
  }
  .form textarea {
    width: 80%;
    height: 30%;
    margin: 5px 0;
    padding: 10px;
  }

  .form button {
    margin-top: 30px !important;
    width: 270px;
    height: 60px;
  }

  .apply-button {
    font-size: 24px;
    padding: 8px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #ffffff;
  }
}
@media (max-width: 430px) {
  .checkboxes-container--vertical {
    left: 2%;
    top: 10%;
    width: 30%;
    height: 30%;
  }

  .checkboxes--vertical {
    width: 50%;
    grid-gap: 6%;
  }
  .checkbox-item--vertical label {
    font-size: 110%;
  }
  .checkbox-item--vertical input {
    width: 20px;
    height: 20px;
    border-radius: 3px;
  }
  .funnel-container--vertical {
    top: 150%;
    right: 18%;
  }
  .funnel-moving--vertical {
    transform: translateX(-90px) translateY(-220px) rotate(-60deg);
  }
  .take-money--vertical {
    top: 43%;
  }
  .take-money__arrow--vertical {
    top: 57%;
  }
  .small-tree--vertical {
    bottom: -30%;
  }
  .big-tree--vertical {
    bottom: -29%;
  }
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
  .checkboxes-container--vertical {
    left: -6% !important;
    top: 30% !important;
  }

  .checkboxes--vertical {
    width: 50%;
    grid-gap: 8% !important;
  }
  .checkbox-item--vertical label {
    font-size: 80% !important;
  }
  .checkbox-item--vertical input {
    width: 20px;
    height: 20px;
    border-radius: 3px;
  }
  .funnel-container--vertical {
    top: 147%;
    right: 16.5%;
  }
  .funnel-moving--vertical {
    transform: translateX(-120px) translateY(200px) rotate(-60deg) !important;
  }
  .lightbox-content h2 {
    font-size: 24px !important;
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
    margin-top: 20px !important;
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
  .cases-image--vertical {
    width: 80%;
  }
}
@media (max-width: 412px) {
  .checkboxes-container--vertical {
    top: 30% !important;
  }
  .checkbox-item--vertical label {
    font-size: 75% !important;
  }
  .big-tree--vertical {
    bottom: -10% !important;
  }
}
@media (max-width: 390px) {
  .checkboxes-container--vertical {
    left: 2%;
    top: 9%;
    width: 20%;
    height: 30%;
  }

  .checkboxes--vertical {
    width: 50%;
    grid-gap: 9% !important;
  }
  .checkbox-item--vertical label {
    font-size: 80% !important;
  }
  .checkbox-item--vertical input {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }
  .funnel-container--vertical {
    top: 140%;
    right: 16.5%;
  }
  .take-money--vertical {
    top: 40%;
  }
  .take-money__arrow--vertical {
    top: 56%;
    left: 43%;
  }
  .funnel-moving--vertical {
    transform: translateX(-80px) translateY(-190px) rotate(-60deg);
  }

  .lightbox-content {
    width: 380px !important;
  }

  .lightbox-content h2 {
    padding: 0 1%;
    font-size: 22px !important;
    margin-bottom: 5px;
  }

  .lightbox-checkboxes {
    margin-top: 2%;
    margin-bottom: 2%;
    font-size: 12px;
    width: 50%;
    grid-gap: 1%;
  }

  .lightbox-checkboxes label {
    font-size: 1.1rem !important;
  }
  .form {
    margin-top: 4%;
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
    margin-top: 10px !important;
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
  .checkboxes-container--vertical {
    left: 1%;
    top: 35% !important;
  }

  .checkboxes--vertical {
    margin-left: 50%;
    width: 70%;
    grid-gap: 5% !important;
  }
  .checkbox-item--vertical label {
    font-size: 70% !important;
  }
  .checkbox-item--vertical input {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }
  .funnel-container--vertical {
    top: 150% !important;
    right: 15%;
  }
  .funnel-image--vertical {
    width: 80%;
  }
  .funnel-moving--vertical {
    transform: translateX(-120px) translateY(150px) rotate(-60deg) !important;
  }
  .drops-container--vertical {
    top: 70px;
    left: 35%;
  }
  @keyframes drop-fall {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0.1;
      transform: translateY(150px);
    }
  }
  .small-tree--vertical {
    bottom: 3% !important;
  }
  .big-tree--vertical {
    bottom: 5% !important;
  }
  .coins__container {
    left: 20%;
    bottom: 70%;
    width: 130px;
    height: 90px;
  }
  .take-money--vertical {
    right: 10%;
    top: 45%;
    width: 30%;
  }
  .take-money__arrow--vertical {
    top: 49%;
    left: 60% !important;
    width: 8%;
  }
  .ground--vertical {
    bottom: -5%;
  }
  .cases-image--vertical {
    width: 60%;
  }
  .lightbox-content h2 {
    font-size: 16px !important;
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

  .lightbox-checkboxes input {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }

  .lightbox-checkboxes label {
    font-size: 100% !important;
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
  .form button {
    margin-top: 5px !important;
  }
}
@media (max-width: 360px) {
  .checkboxes-container--vertical {
    left: 1%;
    top: 6%;
    width: 20%;
    height: 30%;
  }

  .checkboxes--vertical {
    margin-left: 30%;
    width: 50%;
    grid-gap: 10%;
  }
  .checkbox-item--vertical label {
    font-size: 65% !important;
  }
  .checkbox-item--vertical input {
    width: 18px;
    height: 18px;
    border-radius: 3px;
  }
  .funnel-container--vertical {
    top: 140%;
    right: 15%;
  }
  .take-money--vertical {
    top: 45%;
  }
  .take-money__arrow--vertical {
    top: 58%;
  }
  .funnel-moving--vertical {
    transform: translateX(-80px) translateY(-200px) rotate(-60deg);
  }
  .ground--vertical {
    bottom: -3%;
  }
  .small-tree--vertical {
    bottom: -9% !important;
  }
  .big-tree--vertical {
    bottom: -10% !important;
  }
  .coins__container {
    left: 20% !important;
    bottom: 40% !important;
    width: 130px !important;
    height: 90px !important;
  }
  .lightbox-content h2 {
    margin-top: 20px;
    font-size: 20px !important;
    margin-bottom: 5px;
  }

  .lightbox-checkboxes {
    font-size: 12px;
    width: 50%;
    grid-gap: 1.5%;
    margin-bottom: 9%;
    margin-top: 4%;
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
    margin-top: 9px !important;
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
