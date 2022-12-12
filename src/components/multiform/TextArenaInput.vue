<template>
  <div class="wrapper">
    <textarea
      type="text"
      class="text-area"
      v-model="description"
      :class="{ error: error }"
      @input="onChange"
      @keydown="charCount"
    ></textarea>
    <p :class="{ 'error-text': error }" v-if="showCount">
      {{ this.char }}/{{ this.maxLength }}
    </p>
    <p class="error-text" v-if="error">
      Không vượt quá {{ this.maxLength }} kí tự
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: "",
      error: false,
      char: 0,
    };
  },
  props: {
    maxLength: { type: Number },
    showCount: { type: Boolean, default: true },
  },
  methods: {
    charCount() {
      this.char = this.description.length;
      this.char > this.maxLength ? (this.error = true) : (this.error = false);
    },
    onChange() {
      this.$emit("getDescription", {
        des: this.description,
        error: this.error,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .text-area {
    padding: 8px 10px;
    width: 528px;
    height: 152px;
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    resize: none;
  }
  .error {
    border: 1px solid #ed5d5d !important;
  }

  .error-text {
    color: #ed5d5d;
    font-size: 14px;
  }
}
</style>
