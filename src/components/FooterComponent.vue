<!-- FooterComponent.vue -->
<template>
  <footer class="footer">
    <div class="footer-frame">
      <a href="#"><img src="../images/footerframe.png" alt="footerframe" /></a>
    </div>
    <div class="left">
      ВИРІШУЄМО <br />
      ПРОБЛЕМУ В 1 КЛІК
    </div>
    <div class="center">
      <a href="#">ПРО НАС</a>
      <a href="#">МАРКЕТИНГ</a>
      <a href="#">АНАЛІТИКА</a>
      <a href="#">ДИЗАЙН</a>
      <a href="#">ПРОСУВАННЯ</a>
    </div>
    <div class="right">
      <a href="#"><img src="../images/logos/facebook.png" alt="facebook" /></a>
      <a href="#"
        ><img src="../images/logos/instagram.png" alt="instagram"
      /></a>
      <a href="tel:08001234567">0 800 123 45 67</a>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  background-color: #ff6400;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1%;
  box-sizing: border-box;
  height: 80px;
  flex-shrink: 0;
}

.footer-frame {
  margin-left: 1%;
}

.footer-frame img {
  width: 90%;
}

.left {
  margin-left: 1%;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: "Montserrat";
  font-size: 100%;
  font-weight: bold;
}

.center {
  position: relative;
  width: 40%;
}

.center a {
  margin: 0 2%;
  color: #ffffff;
  text-decoration: none;
  position: relative;
  font-family: "Montserrat";
  font-size: 100%;
  font-weight: bold;
}

.right {
  margin-right: 2%;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6%;
}

.right a {
  color: #ffffff;
  text-decoration: none;
  font-size: 180%;
  display: flex;
  align-items: center;
}

@media (max-width: 1400px) {
  .center a {
    font-size: 90%;
  }
}

@media (max-width: 1280px) and (max-height: 800px) {
  .center a {
    font-size: 80%;
  }
}
</style>
