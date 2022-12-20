<template>
  <div>
    <div class="form-container" :class="{ xlWidth: this.step === 1 }">
      <div v-for="(item, index) in form" :key="index">
        <keep-alive :max="10">
          <component
            :is="item.component"
            :label="item.label"
            :maxLength="item.maxLength"
            :options="item.options"
            :subTitle="item.subTitle"
            :range="item.range"
            :showCount="item.showCount"
            :delete="item.delete"
            :small="item.small"
            :optionsSelect="item.optionsSelect"
            :id="id"
            :stt="item.stt"
            :isCheck="isCheck"
            :dateCheck="dateCheck"
            :errorMessage="item.errorMessage"
            :required="item.required"
            @updateInput="updateInput"
            @updateDate="updateDate"
            @updateSelect="updateSelect"
            @updateTextarena="updateTextarena"
            @updateJob="updateJob"
            @updateImg="updateImg"
            @deleteForm="deleteForm"
            @updateSalary="updateSalary"
            class="component"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "./components/Input.vue";
import TextArenaInput from "./components/TextArenaInput.vue";
import SelectDate from "./components/SelectDate.vue";
import Select from "./components/Select.vue";
import JobSelect from "./components/JobSelect.vue";
import ImgSelect from "./components/ImgSelect.vue";
import InputSalary from "./components/InputSalary.vue";
export default {
  data() {
    return {};
  },

  props: ["form", "id", "isCheck", "dateCheck", "step"],
  methods: {
    updateInput(data, id, index) {
      this.$emit("updateInput", data, id, index);
    },
    updateDate(data, id) {
      this.$emit("updateDate", data, id);
    },
    updateSelect(data, id) {
      this.$emit("updateSelect", data, id);
    },
    updateTextarena(data, id) {
      this.$emit("updateTextarena", data, id);
    },
    updateJob(data) {
      this.$emit("updateJob", data);
    },
    updateImg(data) {
      this.$emit("updateImg", data);
    },
    updateSalary(data) {
      this.$emit("updateSalary", data);
    },
    deleteForm(data) {
      this.$emit("deleteForm", data);
    },
  },
  components: {
    Input,
    TextArenaInput,
    SelectDate,
    Select,
    JobSelect,
    ImgSelect,
    InputSalary,
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  width: 926px;
  padding: 20px 32px 24px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin: 18px 0;
}
.xlWidth {
  width: 1026px;
}
.component {
  margin-bottom: 4px;
}
</style>
