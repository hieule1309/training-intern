<template>
  <div>
    <TitleGroup :title="this.label" v-if="this.required" />
    <p v-else class="text">{{ this.label }}</p>
    <div>
      <input
        class="input"
        :class="{ errorm: this.errorMessage }"
        type="text"
        v-model="value"
        @input="onChange"
      />
    </div>
    <!-- <p class="error-text" v-if="error">
      Không vượt quá {{ this.maxLength }} kí tự
    </p> -->
    <p v-if="this.errorMessage" class="isCheck">{{ this.errorMessage }}</p>
  </div>
</template>

<script>
import TitleGroup from "./TitleGroup.vue";
export default {
  data() {
    return {
      error: false,
      value: "",
    };
  },
  props: [
    "label",
    "maxLength",
    "isNumber",
    "isCheck",
    "errorMessage",
    "id",
    "required",
    "stt",
  ],
  components: { TitleGroup },
  computed: {},
  methods: {
    errorHandle() {
      this.value.length > this.maxLength
        ? (this.error = true)
        : (this.error = false);
      this.onChange();
    },
    onChange() {
      this.$emit("updateInput", this.value, this.id, this.stt);
    },
  },
  mounted() {
    console.log("Input");
  },
};
</script>

<style lang="scss" scoped>
.must {
  padding: 2px 8px;
  gap: 10px;
  color: #ffffff;
  width: 45px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  background: #627d98;
  border-radius: 3px;
}
.text {
  font-size: 14px;
  line-height: 20px;
  margin-left: 4px;
}
.input {
  width: 528px;
  border: none;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 8px 10px;
  height: 100%;
  line-height: 20px;
}
.error-text {
  color: #ed5d5d;
  font-size: 14px;
}
.small {
  border: none;
  width: 85px;
}
.box {
  border: 1px solid #dcdcdc;
  width: 119px;
  display: flex;
  align-items: center;

  .VND {
    font-size: 14px;
    line-height: 20px;
  }
}
.error {
  border: 1px solid red;
}
.errorm {
  border: 1px solid red;
}
.isCheck {
  color: red;
  font-size: 14px;
}
</style>
