import axios from "axios";

const autocompleteModule = {
  namespaced: true,
  state: {
    items: [],
    itemSelected: [],
  },
  getters: {
    loadItems: (state) => state.items,
    loadItemSelected: (state) => state.itemSelected,
  },
  mutations: {
    SET_PROVICES(state, payload) {
      state.items = payload;
    },
    SELECTED_ITEM(state, payload) {
      state.itemSelected.push(payload);
      const idx = state.items.findIndex((p) => p.name == payload.name);
      state.items.splice(idx, 1);
    },
    DELETE_ITEM(state, payload) {
      state.itemSelected.splice(payload.idx, 1);
      state.items.push(payload.item);
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
