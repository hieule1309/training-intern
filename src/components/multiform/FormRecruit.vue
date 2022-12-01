<template>
  <div class="container">
    <div class="name-valid">
      <div class="valid-groups">
        <span class="must">Must</span>
        <span class="text">Họ và tên</span>
      </div>
      <input type="text" class="valid-input" />
    </div>
    <div class="date-valid">
      <div class="valid-groups">
        <span class="must">Must</span>
        <span class="text">Ngày sinh</span>
      </div>
      <DatePicker
        placeholder="0000/00/00"
        v-model="time"
        title-format="0000/00/00"
        class="date"
        :default-value="new Date()"
        :disabled-date="disableAfterToday"
      />
    </div>
    <div class="citi-valid">
      <p class="text">Thành Phố</p>
      <select name="citie" id="citie" class="cities">
        <option value="hanoi">Hà Nội</option>
        <option value="tphcm">TP Hồ Chí Minh</option>
        <option value="danang">Đà Nẵng</option>
      </select>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  data() {
    return {
      time: null,
    };
  },
  components: { DatePicker },
  methods: {
    disableAfterToday(date) {
      const today = new Date();
      return date > today;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 926px;
  height: 849px;
  gap: 10px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  .name-valid {
    width: 528px;
    height: 66px;
  }
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
  .valid-input {
    width: 528px;
    height: 40px;
    padding: 8px 10px;
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
  }
}
.date {
  width: 118px;
  height: 40px;
}
.cities {
  padding: 8px 10px;
  gap: 10px;

  width: 528px;
  height: 40px;

  /* White */

  background: #ffffff;
  /* Black / 04 */

  border: 1px solid #dbdbdb;
  border-radius: 4px;
}
</style>
