<template>
  <div>
    <p class="title">{{ this.label }}</p>
    <div :class="{ 'select-group': this.delete }">
      <select
        class="options"
        :class="{ fullWidth: this.delete, 'error-box': this.errorMessage }"
        v-model="value"
        @change="onChange"
      >
        <option v-for="(option, index) in this.options" :key="index">
          {{ option }}
        </option>
      </select>
      <img
        v-if="this.delete"
        class="trash-img"
        src="@/assets/Trash.png"
        @click="deleteForm"
      />
    </div>
    <p :class="{ error: this.errorMessage }" v-if="this.errorMessage">
      {{ this.errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  props: ["label", "options", "delete", "id", "errorMessage"],
  methods: {
    onChange() {
      this.$emit("updateSelect", this.value, this.id);
    },
    deleteForm() {
      this.$emit("deleteForm", this.id);
      console.log(this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  line-height: 20px;
}
.options {
  padding: 8px 10px;
  gap: 10px;

  width: 528px;
  height: 40px;

  background: #ffffff;

  border: 1px solid #dbdbdb;
  border-radius: 4px;
}
.select-group {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 16px;

  width: 978px;
  height: 60px;

  background: #f8f8f8;
  border-radius: 4px;
}
.fullWidth {
  width: 100%;
}
.trash-img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.error {
  font-size: 14px;
  color: red;
}
.error-box {
  border: 1px solid red;
}
</style>
