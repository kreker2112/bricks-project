<!-- FormComponent.vue -->
<template>
  <div class="right__section">
    <h2>Зв'яжіться з нами</h2>
    <form class="form-right__section" @submit.prevent="submitForm">
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
.right__section {
  background-color: #002d6e;
  color: #ffffff;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right__section h2 {
  font-size: 42px;
  font-family: "Montserrat";
  font-weight: 400;
}

.form-right__section {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

input,
textarea {
  width: 289px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 16px;
  padding-left: 10px;
}

textarea {
  height: 78px;
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
@media only screen and (min-width: 1280px) and (max-width: 1280px) and (min-height: 800px) and (max-height: 800px) {
  .right__section h2 {
    font-size: 32px;
  }
}

@media only screen and (min-width: 1180px) and (max-width: 1180px) and (min-height: 820px) and (max-height: 820px) {
  .right__section h2 {
    font-size: 28px;
  }
  .form-right__section input {
    width: 80%;
  }
  .form-right__section textarea {
    width: 80%;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 600px) and (max-height: 600px) {
  .right__section h2 {
    font-size: 28px;
  }
  .form-right__section input {
    width: 80%;
  }
  .form-right__section textarea {
    width: 80%;
  }
}
@media only screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 1366px) and (max-height: 1366px) {
  .right__section {
    padding: 0 2%;
  }
  .right__section h2 {
    text-align: center;
  }
  button {
    font-size: 24px;
    font-weight: bold;
    padding: 20px 30px;
  }
}
@media only screen and (min-width: 820px) and (max-width: 820px) and (max-height: 1180px) and (min-height: 1180px) {
  .right__section h2 {
    font-size: 32px;
    text-align: center;
  }
  .form-right__section input {
    width: 80%;
  }
  .form-right__section textarea {
    width: 80%;
  }
  button {
    font-size: 18px;
    font-weight: bold;
    padding: 12px 24px;
  }
}
@media only screen and (min-width: 768px) and (max-width: 768px) and (max-height: 1024px) and (min-height: 1024px) {
  .right__section h2 {
    font-size: 32px;
    text-align: center;
  }
  .form-right__section input {
    width: 80%;
  }
  .form-right__section textarea {
    width: 80%;
  }
  button {
    font-size: 18px;
    font-weight: bold;
    padding: 12px 24px;
  }
}
@media (max-width: 767px) {
  .right__section {
    width: 375px;
    height: 932px;
  }
  .right__section h2 {
    font-size: 32px;
  }

  input,
  textarea {
    width: 60%;
  }

  input {
    height: 30px;
  }

  textarea {
    height: 78px;
  }

  button {
    width: 65%;
    font-size: 20px;
    padding: 12px 25px;
  }
}
@media (max-width: 390px) {
  .right__section h2 {
    font-size: 24px;
  }

  input,
  textarea {
    width: 75%;
  }

  input {
    height: 30px;
  }

  textarea {
    height: 78px;
  }

  button {
    width: 80%;
    font-size: 16px;
    padding: 12px 25px;
  }
}
</style>
