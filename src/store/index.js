import { createStore } from "vuex";

// Create a new store instance.

export default createStore({
  state: {
    selectedServices: [],
  },
  getters: {
    selectedServices: (state) => state.selectedServices,
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
  },
  actions: {
    addService({ commit }, service) {
      commit("ADD_SERVICE", service);
    },
    removeService({ commit }, service) {
      commit("REMOVE_SERVICE", service);
    },
  },
});
