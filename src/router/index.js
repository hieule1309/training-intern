import Vue from "vue";
import VueRouter from "vue-router";
import LayoutComponent from "../layout/LayoutComponent.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Todo from "../components/Todo.vue";
import Autocomplete from "../components/Autocomplete";
import DropzonePage from "../components/DropzonePage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: LayoutComponent,
    children: [
      {
        path: "",
        name: "Home",
        component: HelloWorld,
      },
      {
        path: "/todo",
        name: "Todo",
        component: Todo,
      },
      {
        path: "/autocomplete",
        name: "Autocomplete",
        component: Autocomplete,
      },
      {
        path: "/dropzonepage",
        name: "DropzonePage",
        component: DropzonePage,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
