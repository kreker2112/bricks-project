<template>
  <div class="service-selection">
    <div class="service-selection__upper">
      <img
        class="grow_buisness-with-mosaic"
        src="../images/grow_buisness-with-mosaic.png"
        alt="grow_buisness"
      />
      <img
        class="business-arrow__down"
        src="../images/business-arrow__down.png"
        alt="business-arrow__down"
      />
      <div class="instruction-container">
        <div class="instruction-service__container">
          <img
            src="../images/logos/instruction-service/service-arrow.png"
            alt="service-arrow"
            class="service-arrow"
          />
          <img
            src="../images/logos/instruction-service/service-container.png"
            alt="service-container"
            class="service-container"
          />
          <img
            src="../images/logos/instruction-service/service.png"
            alt="service"
            class="service"
          />
        </div>
        <img
          src="../images/logos/instruction-funnel.png"
          alt="instruction-funnel"
          class="instruction-funnel"
        />
        <img
          src="../images/logos/instruction-funnel-water.png"
          alt="instruction-funnel-water"
        />
        <img
          src="../images/logos/instruction-grow.png"
          alt="instruction-grow"
        />
      </div>
      <div class="funnel-container">
        <img
          :class="['funnel-image', isPouring ? 'funnel-moving' : '']"
          src="../images/logos/funnel.svg"
          alt="funnel"
          @click="pourWater"
          @dragenter.prevent="onDragEnterFunnel"
          @dragleave.prevent="onDragLeaveFunnel"
          @drop="onDrop"
          @dragover.prevent="onDragOverFunnel"
          @mouseenter="isHoveringOverFunnel = true"
          @mouseleave="isHoveringOverFunnel = false"
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
          <button class="close-button" @click="closeLightbox">&times;</button>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import dropBig from "../images/drop-big.png";
import dropMedium from "../images/drop-medium.png";
import dropSmall from "../images/drop-small.png";

export default {
  setup() {
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

    const selectedServices = ref([]);
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

    const addServiceOnHover = (service) => {
      if (!selectedServices.value.includes(service)) {
        selectedServices.value.push(service);
      }
    };

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
      const dropSizes = ["big", "medium", "small"];
      const dropSources = {
        big: dropBig,
        medium: dropMedium,
        small: dropSmall,
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
      }, 500);
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
      const coinImages = Array(6).fill("src/images/big-coin.png");
      coins.value = coinImages;
      setTimeout(() => {
        coins.value = [];
        showLightbox.value = true;
        lightboxSelectedServices.value = [...selectedServices.value];
      }, 4000);
    };

    const onDrop = (event) => {
      const service = event.dataTransfer.getData("service");
      console.log("Dropped service:", service);
      addServiceOnHover(service);
    };

    const onDragOverFunnel = (event) => {
      event.preventDefault();
      const service = event.dataTransfer.getData("service");
      addServiceOnHover(service);
    };

    const onDragEnterFunnel = () => {
      isHoveringOverFunnel.value = true;
    };

    const onDragLeaveFunnel = () => {
      isHoveringOverFunnel.value = false;
    };

    const applySelection = () => {
      const container = document.querySelector(".main-content");
      container.scrollTo({ left: window.innerWidth, behavior: "smooth" });
      setTimeout(() => {
        router.push("/second-page");
      }, 600); // Задержка для завершения анимации прокрутки
    };

    const closeLightbox = () => {
      showLightbox.value = false;
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
      addServiceOnHover,
      isHoveringOverFunnel,
      onDragOverFunnel,
      onDragEnterFunnel,
      onDragLeaveFunnel,
      lightboxName,
      lightboxPhone,
      lightboxMessage,
      applySelection,
      closeLightbox,
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

.instruction-container {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  left: 24px;
  top: 25px;
  width: 337px;
  height: 140px;
  border-radius: 16px;
  background-color: #ffffff;
}

.instruction-funnel {
  margin-top: 35px;
}

.service-arrow {
  position: absolute;
  bottom: 15px;
  left: 55px;
}

.service-container {
  position: absolute;
  bottom: 20px;
  left: 74px;
}

.service {
  position: absolute;
  bottom: 24px;
  left: 84px;
}

.instruction-service__container {
  position: relative;
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
    opacity 0.001s ease-in-out,
    transform 0.001s ease-in-out;
}

.small-tree.hidden {
  animation: fadeOut 0.001s forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  25% {
    opacity: 0.8;
    transform: scale(0.7);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  100% {
    opacity: 0;
    transform: scale(0.1);
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
  animation: growTree 5s ease-in-out forwards;
}

@keyframes growTree {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1.5);
  }
  75% {
    transform: scale(1.75);
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
  transition: transform 2s;
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
  bottom: 74px;
  width: 282px;
  height: 249px;
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.568);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.lightbox-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 740px;
  height: 918px;
  color: #ededed;
  background-color: #002d6e;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
}

.lightbox-content h2 {
  font-size: 36px;
  margin-bottom: 80px;
}

.lightbox__checkboxes-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lightbox-checkboxes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
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
  background-color: ff6400;
  font-size: 18px;
  padding: 9.43px 18.85px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
