const formModules = {
  namespaced: true,
  state: {
    recruit: {
      name: "",
      date: "",
      city: "",
      position: [],
      description: "",
      img: "",
    },
    expWorks: [],
    confirm: {
      reason: "",
      salary: "",
    },
    formInfo: [
      {
        id: 1,
        label: "Ho va ten",
        name: "",
        dob: "",
        city: "",
        position: [],
        description: "",
        img: "",
      },
    ],
    error: true,
  },
  getters: {
    getRecruit: (state) => state.recruit,
    getExpWorks: (state) => state.expWorks,
    getConfirm: (state) => state.confirm,
    getError: (state) => state.error,
  },
  mutations: {
    UPDATE_RECRUIT(state, payload) {
      state.recruit = payload;
    },
    UPDATE_EXPWORKS(state, payload) {
      state.expWorks = payload;
    },
    UPDATE_CONFIRM(state, payload) {
      state.confirm = payload;
    },
    HANDLE_ERROR(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    updateRecruit({ commit }, payload) {
      commit("UPDATE_RECRUIT", payload);
    },
    updateExpWorks({ commit }, payload) {
      commit("UPDATE_EXPWORKS", payload);
    },
    updateConfirm({ commit }, payload) {
      commit("UPDATE_CONFIRM", payload);
    },
    handleError({ commit }, payload) {
      commit("HANDLE_ERROR", payload);
    },
  },
};

export default formModules;
