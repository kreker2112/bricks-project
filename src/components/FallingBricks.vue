<template>
  <div class="falling-bricks" ref="container">
    <a href="#">
      <img
        class="bricks-frame"
        src="../images/logos/bricks-frame.png"
        alt="bricks-frame"
      />
    </a>
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

    <!-- Статически созданные кирпичи -->
    <div
      class="brick"
      style="
        width: 180px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 265px;
        left: calc(6px + 82% + 15px);
        transform: rotate(-8.07deg);
        background-color: #ff6400;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Контекст
    </div>
    <div
      class="brick"
      style="
        width: 121px;
        height: 70px;
        bottom: 135px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 290px;
        left: calc(3px + 31% + 15px);
        transform: rotate(-6.07deg);
        background-color: #ffffff;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Ідеї
    </div>
    <div
      class="brick"
      style="
        width: 201px;
        height: 70px;
        bottom: 135px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 215px;
        left: 25px;
        transform: rotate(-8.22deg);
        background-color: #ff6400;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Концепції
    </div>

    <div
      class="brick"
      style="
        width: 246px;
        height: 70px;
        bottom: 135px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 72px;
        left: 35px;
        transform: rotate(39.57deg);
        background-color: #ffffff;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Брендування
    </div>

    <div
      class="brick"
      style="
        width: 128px;
        height: 70px;
        bottom: 135px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 220px;
        left: calc(3px + 25% + 6px);
        transform: rotate(11.1deg);
        background-color: #ff6400;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      SMM
    </div>
    <div
      class="brick"
      style="
        width: 153px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 152px;
        left: calc(3px + 13% + 6px);
        transform: rotate(-2.76deg);
        background-color: #d8d8d8;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Аудит
    </div>
    <div
      class="brick"
      style="
        width: 213px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 45px;
        left: calc(3px + 20% + 5px);
        transform: rotate(25.45deg);
        background-color: #ff6400;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Маркетинг
    </div>
    <div
      class="brick"
      style="
        width: 186px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 140px;
        left: calc(3px + 27% + 5px);
        transform: rotate(-10.7deg);
        background-color: #d8d8d8;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Стратегії
    </div>
    <div
      class="brick"
      style="
        width: 199px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 42px;
        left: calc(3px + 36% + 11px);
        transform: rotate(25.63deg);
        background-color: #d8d8d8;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Інтеграції
    </div>
    <div
      class="brick"
      style="
        width: 232px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 193px;
        left: calc(2px + 40% + 6px);
        transform: rotate(20.08deg);
        background-color: #ff6400;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Просування
    </div>
    <div
      class="brick"
      style="
        width: 172px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 85px;
        left: calc(2px + 52% + 5px);
        transform: rotate(-8.95deg);
        background-color: #ffffff;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Дизайн
    </div>
    <div
      class="brick"
      style="
        width: 182px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 285px;
        left: calc(30px + 49% + 8px);
        transform: rotate(-25.14deg);
        background-color: #d8d8d8;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Логотип
    </div>
    <div
      class="brick"
      style="
        width: 177px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 247px;
        left: calc(20px + 63% + 8px);
        transform: rotate(-3.94deg);
        border-radius: 16px;
        background-color: #d8d8d8;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Неймінг
    </div>
    <div
      class="brick"
      style="
        width: 120px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 159px;
        left: calc(2px + 63% + 8px);
        transform: rotate(17.88deg);
        background-color: #d8d8d8;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      SEO
    </div>
    <div
      class="brick"
      style="
        width: 199px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 50px;
        left: calc(5px + 62%);
        transform: rotate(-33.74deg);
        background-color: #ff6400;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Розсилки
    </div>
    <div
      class="brick"
      style="
        width: 235px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        bottom: 155px;
        left: calc(75px + 71% + 20px);
        transform: rotate(26.68deg);
        background-color: #ff6400;
        color: #002d6e;
        border-radius: 16px;
      "
    >
      Партнерство
    </div>
    <div
      class="brick"
      style="
        font-style: Montserrat;
        font-size: 25px;
        font-weight: bold;
        width: 105px;
        height: 65px;
        bottom: 92px;
        left: calc(5px + 79% + 7px);
        transform: rotate(6.99deg);
        color: #002d6e;
        background-color: #d9d9d9;
        border-radius: 16px;
      "
    >
      TV
    </div>
    <div
      class="brick"
      style="
        width: 289px;
        height: 70px;
        font-style: Montserrat;
        font-size: 25px;
        font-weight: 900;
        bottom: 15px;
        left: calc(30px + 65% + 80px);
        transform: rotate(-5.73deg);
        color: #002d6e;
        background-color: #ffffff;
        border-radius: 16px;
      "
    >
      Позиціонування
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const onDragStart = (event, service) => {
      console.log("Drag start:", service);
      event.dataTransfer.setData("service", service);
    };

    return {
      onDragStart,
    };
  },
};
</script>

<style scoped>
.falling-bricks {
  position: relative;
  width: 100%;
  height: 100%; /* Высота 100% от высоты родительского контейнера */
  background-color: #002d6e;
  background-image: url(../images/logos/logo.png);
  background-repeat: no-repeat;
  background-position: center 220px;
  background-size: auto;
  overflow: hidden;
}

.bricks-frame {
  margin-left: 18px;
  margin-top: 19px;
}

.ideas {
  width: 100%;
  margin-top: 335px;
  color: #ffffff;
  z-index: 1;
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
}

.instruments,
.add {
  pointer-events: auto; /* Чтобы изображения снова могли быть интерактивными */
}

.instruments {
  position: absolute;
  top: 555px;
  left: 105px;
  width: 335px;
  z-index: 2;
}

.instruments__arrow {
  position: absolute;
  top: 605px;
  left: 450px;
}

.add {
  position: absolute;
  width: 227px;
  top: 538px;
  right: 202px;
  z-index: 2;
}

.add-arrow {
  position: absolute;
  top: 485px;
  right: 79px;
}

.brick {
  z-index: 0 !important;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
