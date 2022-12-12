import Vue from "vue";
import Vuex from "vuex";
import todosModule from "./modules/todos.js";
import autocompleteModule from "./modules/autocomplete";
import formModules from "./modules/form";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { todosModule, autocompleteModule, formModules },
});
