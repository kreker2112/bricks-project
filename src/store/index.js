import { createStore } from "vuex";

export default createStore({
  state: {
    selectedServices: [],
    animationTrigger: false,
  },
  getters: {
    selectedServices: (state) => state.selectedServices,
    animationTrigger: (state) => state.animationTrigger,
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
      state.animationTrigger = !state.animationTrigger;
    },
  },
  actions: {
    addService({ commit }, service) {
      commit("ADD_SERVICE", service);
      commit("TRIGGER_ANIMATION");
    },
    removeService({ commit }, service) {
      commit("REMOVE_SERVICE", service);
    },
    triggerAnimation({ commit }) {
      commit("TRIGGER_ANIMATION");
    },
  },
});
