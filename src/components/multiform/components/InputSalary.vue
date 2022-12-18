<template>
  <div>
    <div class="valid-groups">
      <span class="must">Must</span>
      <label class="text" for="name">{{ this.label }}</label>
    </div>
    <div :class="{ error: this.errorMessage }" class="box">
      <input class="input" type="number" v-model="value" @input="errorHandle" />
      <span class="VND">VND</span>
    </div>
    <p class="error-text" v-if="this.errorMessage">
      {{ this.errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      value: "",
    };
  },
  props: ["label", "maxLength", "small", "isNumber", "errorMessage"],
  computed: {},
  methods: {
    errorHandle() {
      this.value.length > this.maxLength
        ? (this.error = true)
        : (this.error = false);
      this.onChange();
    },
    onChange() {
      this.$emit("updateSalary", this.value);
    },
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
  border: none;
  width: 85px;
  border-radius: 4px;
  padding: 8px 10px;
  height: 100%;
  line-height: 20px;
}
.error-text {
  color: #ed5d5d;
  font-size: 14px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.box {
  border: 1px solid #dcdcdc;
  width: 119px;
  display: flex;
  align-items: center;
  border-radius: 4px;

  .VND {
    font-size: 14px;
    line-height: 20px;
  }
}
.error {
  border: 1px solid red;
}
</style>
