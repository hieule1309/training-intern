<template>
  <div class="todo-col">
    <h3>{{ col.label }}</h3>
    <div class="todos">
      <TodoItem
        :addMode="true"
        :todo="todoAdd"
        v-if="showAddMode"
        @onCancel="onCancel"
        @onAddNewItem="onAddNewItem"
      />
      <div class="todos-list" v-if="todos.length">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @onChangeStatus="onChangeStatus"
        />
      </div>
      <button class="btn-add" v-if="col.status === 1" @click="addNewItem">
        Thêm
      </button>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import { getFormatTime } from "../../utils/time";
// import { v4 as idv4 } from "uuid";
export default {
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
    col: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    TodoItem,
  },
  data() {
    return {
      todoAdd: {
        name: "",
        createdAt: getFormatTime(new Date()),
        status: 1,
      },
      showAddMode: false,
    };
  },
  methods: {
    addNewItem() {
      if (!this.showAddMode) this.showAddMode = true;
    },
    onCancel() {
      this.todoAdd.name = "";
      this.showAddMode = false;
    },
    onAddNewItem(name) {
      this.todoAdd.name = name;
      this.$emit("onAddNewItem", this.todoAdd);
      this.onCancel();
    },
    onChangeStatus(data) {
      this.$emit("onChangeStatus", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-col {
  h3 {
    margin-bottom: 16px;
  }
  .todos {
    min-height: calc(100vh - 211px);
    background: #f0f0f0;
    border-radius: 4px;
    padding: 12px;
    position: relative;
    .todos-list {
      max-height: calc(100vh - 256px);
      padding-bottom: 72px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 8px;
        cursor: default;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: #dcdcdc;
        border-radius: 12px;
      }
    }
    .btn-add {
      width: calc(100% - 24px);
      border: 1px solid #27ae60;
      color: #27ae60;
      border-radius: 4px;
      font-weight: bold;
      background: #f0f0f0;
      height: 32px;
      position: absolute;
      bottom: 12px;
      left: 12px;
      cursor: pointer;
    }
  }
}
</style>
