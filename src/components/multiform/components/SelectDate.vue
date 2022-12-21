<template>
  <div>
    <TitleGroup :title="this.label" />
    <div>
      <DatePicker
        placeholder="0000/00/00"
        v-model="date1"
        format="YYYY/MM/DD"
        class="date"
        :class="{ 'error-box': this.errorMessage }"
        :disabled-date="disableAfterToday"
        @change="onChange"
      />
      <img v-if="range" src="@/assets/Vector.png" class="minus" />
      <DatePicker
        v-if="range"
        placeholder="0000/00/00"
        v-model="date2"
        format="YYYY/MM/DD"
        class="date"
        :class="{ 'error-box': this.errorMessage }"
        :disabled-date="disableAfterToday"
        @change="onChange"
      />
    </div>
    <p v-if="this.errorMessage" class="error">{{ this.errorMessage }}</p>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import TitleGroup from "./TitleGroup.vue";
export default {
  data() {
    return {
      date1: "",
      date2: "",
    };
  },
  components: { DatePicker, TitleGroup },
  methods: {
    disableAfterToday(date) {
      const today = new Date();
      return date > today;
    },
    onChange() {
      this.$emit(
        "updateDate",
        { startDate: this.date1, endDate: this.date2 },
        this.id
      );
    },
  },
  props: ["label", "range", "errorMessage", "id"],
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
  line-height: 20px;
  margin-left: 4px;
}
.error-box {
  border: 1px solid red;
}
.date {
  width: 118px;
  border-radius: 6px;
}
.minus {
  margin: 0 4px 4px 4px;
}
.error {
  font-size: 14px;
  color: red;
}
</style>
