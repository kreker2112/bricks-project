<template>
  <div class="right__section">
    <h2 v-if="!showSuccessMessage">Зв'яжіться з нами</h2>
    <form
      v-if="!showSuccessMessage"
      class="form-right__section"
      @submit.prevent="submitForm"
    >
      <input
        class="form-input"
        type="text"
        v-model="name"
        placeholder="Ім'я"
        required
      />
      <input
        class="form-input"
        type="tel"
        v-model="phone"
        placeholder="Телефон"
        pattern="^\+?[0-9\s\-]*$"
        inputmode="tel"
        required
      />
      <textarea
        class="form-textarea"
        v-model="message"
        placeholder="Повідомлення"
        required
      ></textarea>
      <button class="form-buttom" type="submit">Замовити дзвінок</button>
    </form>
    <div v-else class="success-message">
      <h2>Дякуємо за звернення!</h2>
      <p>Наш менеджер скоро зв'яжеться з вами</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const name = ref("");
    const phone = ref("");
    const message = ref("");
    const showSuccessMessage = ref(false);

    const submitForm = () => {
      const formData = {
        name: name.value,
        phone: phone.value,
        message: message.value,
      };
      console.log(formData);
      showSuccessMessage.value = true;
      // Здесь вы можете отправить данные на сервер или выполнить другие действия
    };

    return {
      name,
      phone,
      message,
      showSuccessMessage,
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

.form-input {
  width: 289px;
  height: 40px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 16px;
  padding-left: 10px;
}

.form-textarea {
  width: 289px;
  height: 78px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 16px;
  padding-left: 10px;
}

.form-buttom {
  margin-top: 60px;
  background-color: #ff6400;
  color: #ffffff;
  font-size: 22px;
  font-weight: bolder;
  padding: 12px 22px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.success-message {
  text-align: center;
}

.success-message h2 {
  font-size: 36px;
  font-family: "Montserrat";
  font-weight: 400;
  margin-bottom: 20px;
}

.success-message p {
  font-size: 20px;
  font-family: "Montserrat";
  font-weight: 300;
}

/* Media Queries */
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
