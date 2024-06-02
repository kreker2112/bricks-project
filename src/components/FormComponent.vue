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

    const submitForm = () => {
      // handle form submission
    };

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
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

input,
textarea {
  width: 80%;
  margin: 10px 0;
}

button {
  background-color: orange;
  font-size: 18px;
  padding: 9.43px 18.85px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
