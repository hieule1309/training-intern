<template>
  <div class="container">
    <div class="selecte-company">
      <select name="company" id="company" class="selected">
        <option value="mor">MOR</option>
        <option value="vng">VNG</option>
        <option value="viettel">Viettel</option>
      </select>
      <img class="trash-img" src="@/assets/Trash.png" @click="remove" />
    </div>
    <div class="valid-position">
      <div class="valid-groups">
        <span class="must">Must</span>
        <label class="text" for="job">Vị trí từng làm</label>
      </div>
      <input
        type="text"
        class="valid-input"
        id="job"
        required
        :class="{ error: errorjob }"
        @keyup="errorHandle"
        v-model="job"
      />
      <p class="text-error" v-if="errorjob">Không vượt quá 100 kí tự</p>
    </div>
    <div class="date-valid">
      <div class="valid-groups">
        <span class="must">Must</span>
        <span class="text">Thời gian làm việc</span>
      </div>
      <div class="datepicker-group">
        <DatePicker
          placeholder="0000/00/00"
          v-model="time1"
          title-format="0000/00/00"
          class="date"
        />
        <div class="space"></div>
        <div class="minus"></div>
        <DatePicker
          placeholder="0000/00/00"
          v-model="time2"
          title-format="0000/00/00"
          class="date"
        />
      </div>
    </div>
    <div class="about-job">
      <p class="text">Mô tả về công việc</p>
      <textarea
        type="text"
        class="text-area"
        @keyup="errorHandle"
        v-model="message"
        :class="{ error: error }"
      ></textarea>
      <p class="text-error" v-if="error">Không vượt quá 5000 kí tự</p>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  data() {
    return {
      time1: "",
      time2: "",
      message: "",
      job: "",
      error: false,
      errorjob: false,
    };
  },
  methods: {
    errorHandle() {
      this.message.length > 5000 ? (this.error = true) : (this.error = false);
      this.job.length > 100 ? (this.errorjob = true) : (this.errorjob = false);
    },
    remove() {
      this.$emit("remove");
    },
  },
  components: { DatePicker },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;
  margin-bottom: 20px;
  width: 1026px;
  height: 504px;
  left: 254px;
  top: 324px;

  border: 1px solid #dcdcdc;
  border-radius: 4px;
  .selecte-company {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 16px;
    gap: 16px;

    width: 978px;
    height: 60px;

    background: #f8f8f8;
    border-radius: 4px;
    .selected {
      padding: 8px 10px;
      gap: 10px;

      width: 898px;
      height: 40px;
      background: #ffffff;
      /* Black / 04 */

      border: 1px solid #dbdbdb;
      border-radius: 4px;
    }
    .trash-img {
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  }
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
  padding: 8px 10px;
  gap: 10px;
  width: 528px;
  height: 40px;
  left: 24px;
  top: 134px;

  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}
.datepicker-group {
  display: flex;
  position: relative;
  .space {
    width: 32px;
  }
  .minus {
    position: absolute;
    width: 16px;
    height: 0;
    border: 1px solid #bfbfbf;
    left: 125px;
    top: 15px;
  }
}
.text-area {
  padding: 8px 10px;
  gap: 10px;
  width: 528px;
  height: 152px;
  left: 24px;
  top: 314px;

  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  resize: none;
}
.date {
  width: 118px;
  height: 40px;
}
.error {
  border: 1px solid #ed5d5d !important;
}

.text-error {
  color: #ed5d5d;
  font-size: 14px;
}
</style>
