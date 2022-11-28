import axios from "axios";

const autocompleteModule = {
  namespaced: true,
  state: {
    provinces: [],
  },
  getters: {
    provinces: (state) => state.provinces,
  },
  mutations: {
    SET_PROVICES(state, payload) {
      state.provinces = payload;
    },
  },
  actions: {
    async getProvinces({ commit }) {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/p/"
        );
        commit("SET_PROVICES", response.data);
      } catch {
        console.log("error");
      }
    },
  },
};

export default autocompleteModule;
