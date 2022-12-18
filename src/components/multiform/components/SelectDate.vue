<template>
  <div>
    <div class="valid-groups">
      <span class="must">Must</span>
      <label class="text" for="name">{{ this.label }}</label>
    </div>
    <div>
      <DatePicker
        placeholder="0000/00/00"
        v-model="date1"
        format="YYYY/MM/DD"
        class="date"
        :class="{ 'error-box': this.errorMessage }"
        :default-value="new Date()"
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
        :default-value="new Date()"
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
export default {
  data() {
    return {
      date1: "",
      date2: "",
    };
  },
  components: { DatePicker },
  methods: {
    disableAfterToday(date) {
      const today = new Date();
      return date > today;
    },
    onChange() {
      this.$emit(
        "updateDate",
        { date1: this.date1, date2: this.date2 },
        this.id
      );
    },
  },
  props: ["label", "range", "dateCheck", "errorMessage", "id"],
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
.error-box {
  border: 1px 1solid red;
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
