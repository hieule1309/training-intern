<template>
  <div class="todo-item">
    <input
      type="text"
      v-model="name"
      placeholder="Nhập tên nhiệm vụ"
      v-if="addMode"
    />
    <div class="title" v-else>{{ todo.name }}</div>
    <div class="time">{{ todo.createdAt }}</div>
    <div class="list-button" v-if="todo.status == 1">
      <button class="btn-submit" @click="handleSubmitClick">
        {{ getSubmitBtn }}
      </button>
      <button class="btn-cancel" @click="handleCancelClick">
        {{ getCancelBtn }}
      </button>
    </div>
    <div class="status-finish" v-if="todo.status == 2">
      Hoàn thành lúc: <br />{{ todo.lastModified }}
    </div>
    <div class="status-cancel" v-if="todo.status == 3">
      Đã hủy lúc: <br />{{ todo.lastModified }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
    addMode: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      name: "",
    };
  },
  computed: {
    getSubmitBtn() {
      return this.addMode ? "Lưu" : "Hoàn thành";
    },
    getCancelBtn() {
      return this.addMode ? "Hủy" : "Từ bỏ";
    },
  },
  methods: {
    handleSubmitClick() {
      this.addMode
        ? this.$emit("onAddNewItem", this.name)
        : this.$emit("onChangeStatus", { id: this.todo.id, status: 2 });
    },
    handleCancelClick() {
      this.addMode
        ? this.$emit("onCancel")
        : this.$emit("onChangeStatus", { id: this.todo.id, status: 3 });
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-item {
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  padding: 8px;
  background: #fff;
  margin-bottom: 8px;
  input {
    width: 100%;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    outline: 0;
  }
  .title {
    font-weight: bold;
    font-size: 16px;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .time {
    color: #666;
    margin: 8px 0;
  }
  .list-button {
    display: flex;
    gap: 12px;
    button {
      width: calc(50% - 6px);
      border-radius: 4px;
      border: none;
      outline: 0;
      height: 24px;
      cursor: pointer;
      &.btn-submit {
        background: #27ae60;
        color: #fff;
      }
      &.btn-cancel {
        background: #c0392b;
        color: #fff;
      }
    }
  }
  .status-finish {
    color: #27ae60;
  }
  .status-cancel {
    color: #c0392b;
  }
}
</style>
