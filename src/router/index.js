import Vue from "vue";
import VueRouter from "vue-router";
import LayoutComponent from "../layout/LayoutComponent.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Todo from "../components/Todo.vue";
import Autopage from "../components/Autopage";
import DropzonePage from "../components/DropzonePage";
import MultiFormPage from "../components/MultiFormPage";
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
        path: "/autopage",
        name: "AutoPage",
        component: Autopage,
      },
      {
        path: "/dropzonepage",
        name: "DropzonePage",
        component: DropzonePage,
      },
      {
        path: "/multiform",
        name: "MultiForm",
        component: MultiFormPage,
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
