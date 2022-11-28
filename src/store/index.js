import Vue from "vue";
import Vuex from "vuex";
import todosModule from "./modules/todos.js";
import autocompleteModule from "./modules/autocomplete";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { todosModule, autocompleteModule },
});
