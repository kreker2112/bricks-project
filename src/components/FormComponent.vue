<!-- FormComponent.vue -->
<template>
  <div class="form">
    <h2>Зв'яжіться з нами</h2>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="name" placeholder="Ім'я" required />
      <input type="tel" v-model="phone" placeholder="Телефон" required />
      <textarea
        v-model="message"
        placeholder="Повідомлення"
        required
      ></textarea>
      <button type="submit">Замовити дзвінок</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const name = ref("");
    const phone = ref("");
    const message = ref("");

    const submitForm = () => {};

    return {
      name,
      phone,
      message,
      submitForm,
    };
  },
};
</script>

<style scoped>
.form {
  background-color: #002d6e;
  color: white;
  padding: 20px;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form h2 {
  font-size: 42px;
  font-family: "Montserrat";
  font-weight: 400;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

input {
  width: 289px;
  height: 49px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 16px;
  padding-left: 10px;
}

textarea {
  width: 289px;
  height: 78px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 16px;
  padding-left: 10px;
}

button {
  margin-top: 60px;
  background-color: #ff6400;
  color: #ffffff;
  font-size: 18px;
  font-weight: bolder;
  padding: 9.43px 18.85px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
