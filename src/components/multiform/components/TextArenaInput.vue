<template>
  <div class="wrapper">
    <TitleGroup v-if="this.required" :title="this.label" />
    <p class="title" v-else>{{ this.label }}</p>
    <textarea
      type="text"
      class="text-area"
      v-model="description"
      :class="{ error: this.errorMessage }"
      @input="charCount"
    ></textarea>
    <p :class="{ 'error-text': this.errorMessage }" v-if="showCount">
      {{ this.char }}/{{ this.maxLength }}
    </p>
    <p class="error-text" v-if="this.errorMessage">
      {{ this.errorMessage }}
    </p>
  </div>
</template>

<script>
import TitleGroup from "./TitleGroup.vue";
export default {
  data() {
    return {
      description: "",
      error: false,
      char: 0,
    };
  },
  props: ["maxLength", "showCount", "label", "errorMessage", "id", "required"],
  methods: {
    charCount() {
      this.char = this.description.length;
      // this.char > this.maxLength ? (this.error = true) : (this.error = false);
      this.onChange();
    },
    onChange() {
      this.$emit("updateTextarena", this.description, this.id);
    },
  },
  components: { TitleGroup },
  mounted() {
    console.log("textarena mounted");
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
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
  .title {
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
