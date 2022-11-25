<template>
  <div class="todo-page">
    <h1>Todo</h1>
    <div class="search-wrapper">
      <input type="text" v-model="keyword" placeholder="Tìm kiếm" />
    </div>
    <div class="todo-list">
      <TodoColumn
        class="col"
        v-for="col in todoCols"
        :key="col.status"
        :col="col"
        :todos="getTodosByStatus(col.status)"
        @onAddNewItem="onAddNewItem"
        @onChangeStatus="onChangeStatus"
      />
    </div>
  </div>
</template>

<script>
import TodoColumn from "./todo/TodoColumn.vue";

import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    TodoColumn,
  },
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapGetters("todosModule", ["todoCols", "todoList"]),
    getTodosByStatus() {
      return (status) => {
        return this.todoList.filter(
          (item) => item.status === status && item.name.includes(this.keyword)
        );
      };
    },
  },
  methods: {
    ...mapActions("todosModule", ["onAddNewItem", "onChangeStatus"]),
  },
};
</script>

<style lang="scss" scoped>
.todo-page {
  h1 {
    margin-bottom: 24px;
  }
  .search-wrapper {
    margin-bottom: 32px;
    input {
      min-width: 300px;
      padding: 0 8px;
      height: 40px;
      margin-right: 16px;
      border-radius: 4px;
      outline: 0;
      border: 1px solid #dcdcdc;
    }
    button {
      height: 40px;
      padding: 0 12px;
      color: #fff;
      font-weight: bold;
      background: #27ae60;
      border-radius: 4px;
      outline: 0;
      border: 0;
      cursor: pointer;
    }
  }
  .todo-list {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    .col {
      width: calc(33.3333333333333% - 16px);
    }
  }
}
</style>
