<template>
  <footer class="footer">
    <div class="left">вирішуємо проблему в 1 клік</div>
    <div class="center">
      <a href="#">ПРО НАС</a>
      <a href="#">МАРКЕТИНГ</a>
      <a href="#">АНАЛІТИКА</a>
      <a href="#">ДИЗАЙН</a>
      <a href="#">ПРОСУВАННЯ</a>
    </div>
    <div class="right">
      <i class="fa fa-facebook"></i>
      <i class="fa fa-instagram"></i>
      0 800 123 45 67
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 121px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.left {
  flex: 1;
}
.center {
  flex: 1;
  display: flex;
  justify-content: center;
}
.center a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
}
.right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.right i {
  margin-right: 10px;
}
</style>
