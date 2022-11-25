import { getFormatTime } from "../../utils/time";
import { v4 as idv4 } from "uuid";

const todosModule = {
  namespaced: true,
  state: {
    todoCols: [
      {
        status: 1,
        label: "Moi",
      },
      {
        status: 2,
        label: "Đã hoàn thành",
      },
      {
        status: 3,
        label: "Đã từ bỏ",
      },
    ],
    todoList: [
      {
        id: idv4(),
        name: "hieu",
        createdAt: getFormatTime(new Date()),
        status: 1,
      },
      {
        id: idv4(),
        name: "aaa",
        createdAt: getFormatTime(new Date()),
        status: 2,
        lastModified: getFormatTime(new Date()),
      },
      {
        id: idv4(),
        name: "aabbb",
        createdAt: getFormatTime(new Date()),
        status: 3,
        lastModified: getFormatTime(new Date()),
      },
    ],
  },
  getters: {
    todoCols: (state) => state.todoCols,
    todoList: (state) => state.todoList,
  },
  mutations: {
    ADD_NEWITEM(state, data) {
      state.todoList.push({ id: idv4(), ...data });
    },
    CHANGE_STATUS(state, payload) {
      const idx = state.todoList.findIndex((c) => c.id == payload.id);
      if (idx != -1) {
        state.todoList[idx].status = payload.status;
        state.todoList[idx]["lastModified"] = getFormatTime(new Date());
      }
      // state.todoList[payload.id].status = payload.status;
      // console.log(state.todoList[payload]);
    },
  },
  actions: {
    onAddNewItem({ commit }, data) {
      commit("ADD_NEWITEM", data);
    },
    onChangeStatus({ commit }, payload) {
      commit("CHANGE_STATUS", payload);
    },
  },
};

export default todosModule;
