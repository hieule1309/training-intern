import axios from "axios";

const autocompleteModule = {
  namespaced: true,
  state: {
    provinces: [],
    proviSelected: [],
  },
  getters: {
    loadProvinces: (state) => state.provinces,
    loadProviSelected: (state) => state.proviSelected,
  },
  mutations: {
    SET_PROVICES(state, payload) {
      state.provinces = payload;
    },
    SELECTED_ITEM(state, province) {
      state.proviSelected.push(province);
      const idx = state.provinces.findIndex((p) => p.name == province.name);
      state.provinces.splice(idx, 1);
    },
    DELETE_ITEM(state, province) {
      state.proviSelected.splice(province, 1);
      state.provinces.push(province);
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
    selectedItem({ commit }, data) {
      commit("SELECTED_ITEM", data);
    },
    deletedItem({ commit }, data) {
      commit("DELETE_ITEM", data);
    },
  },
};

export default autocompleteModule;
