import { createStore } from "vuex";

export default createStore({
  state: {
    selectedServices: [],
    animationTrigger: false,
    isLightboxVisible: false,
  },
  getters: {
    selectedServices: (state) => state.selectedServices,
    animationTrigger: (state) => state.animationTrigger,
    isLightboxVisible: (state) => state.isLightboxVisible,
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
    SET_LIGHTBOX_VISIBILITY(state, visibility) {
      state.isLightboxVisible = visibility;
    },
  },
  actions: {
    addService({ commit }, service) {
      commit("ADD_SERVICE", service);
      commit("TRIGGER_ANIMATION");
      console.log("Service added: ", service); // Debug output
    },
    removeService({ commit }, service) {
      commit("REMOVE_SERVICE", service);
    },
    triggerAnimation({ commit }) {
      commit("TRIGGER_ANIMATION");
    },
    setLightboxVisibility({ commit }, visibility) {
      commit("SET_LIGHTBOX_VISIBILITY", visibility);
      console.log("Lightbox visibility set to: ", visibility); // Debug output
    },
  },
});
