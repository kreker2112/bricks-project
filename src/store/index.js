// store.js
import { createStore } from "vuex";
import { toRaw } from "vue";

export default createStore({
  state: {
    selectedServices: [],
    animationTrigger: false,
    isLightboxVisible: false,
    formData: null,
  },
  getters: {
    selectedServices: (state) => state.selectedServices,
    animationTrigger: (state) => state.animationTrigger,
    isLightboxVisible: (state) => state.isLightboxVisible,
    formData: (state) => state.formData,
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
    SET_FORM_DATA(state, formData) {
      state.formData = toRaw(formData); // Используем toRaw для сохранения обычного объекта
    },
  },
  actions: {
    addService({ commit }, service) {
      commit("ADD_SERVICE", service);
      commit("TRIGGER_ANIMATION");
      console.log("Service added: ", service);
    },
    removeService({ commit }, service) {
      commit("REMOVE_SERVICE", service);
    },
    triggerAnimation({ commit }) {
      commit("TRIGGER_ANIMATION");
    },
    setLightboxVisibility({ commit }, visibility) {
      commit("SET_LIGHTBOX_VISIBILITY", visibility);
      console.log("Lightbox visibility set to: ", visibility);
    },
    setFormData({ commit }, formData) {
      commit("SET_FORM_DATA", formData);
      console.log("Form data set: ", formData);
    },
  },
});
