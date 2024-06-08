import { createStore } from "vuex";

export default createStore({
  state: {
    selectedServices: [],
    animationTrigger: false, // Новое состояние для анимации
  },
  getters: {
    selectedServices: (state) => state.selectedServices,
    animationTrigger: (state) => state.animationTrigger, // Новый геттер для анимации
  },
  mutations: {
    ADD_SERVICE(state, service) {
      if (!state.selectedServices.includes(service)) {
        state.selectedServices.push(service);
      }
    },
    REMOVE_SERVICE(state, service) {
      state.selectedServices = state.selectedServices.filter(
        (s) => s !== service,
      );
    },
    TRIGGER_ANIMATION(state) {
      // Новая мутация для триггера анимации
      state.animationTrigger = !state.animationTrigger;
    },
  },
  actions: {
    addService({ commit }, service) {
      commit("ADD_SERVICE", service);
      commit("TRIGGER_ANIMATION"); // Запуск триггера анимации при добавлении сервиса
    },
    removeService({ commit }, service) {
      commit("REMOVE_SERVICE", service);
    },
    triggerAnimation({ commit }) {
      // Новое действие для запуска триггера анимации
      commit("TRIGGER_ANIMATION");
    },
  },
});
