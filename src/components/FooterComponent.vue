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
  padding: 0 20px;
  box-sizing: border-box;
  height: 121px;
  flex-shrink: 0;
}

.footer-frame {
  margin-left: 41px;
}

.left {
  margin-left: 24.77px;
  width: 181px;
  height: 39px;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: bold;
}

.center {
  position: relative;
}

.center a {
  margin: 0 10px;
  color: #ffffff;
  text-decoration: none;
  position: relative;
  font-family: "Montserrat";
  font-size: 18px;
}

.right {
  margin-right: 65.92px;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;
}

.right a {
  color: #ffffff;
  text-decoration: none;
  font-size: 32px;
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
