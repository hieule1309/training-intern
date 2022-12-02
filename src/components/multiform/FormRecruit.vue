<template>
  <div class="container">
    <div class="name-valid">
      <div class="valid-groups">
        <span class="must">Must</span>
        <label class="text" for="username">Họ và tên</label>
      </div>
      <input
        type="text"
        class="valid-input"
        :class="{ error: errorname }"
        @keyup="errorHandle"
        v-model="name"
        name="username"
        id="username"
        required
      />
      <p class="error-text" v-if="errorname">Không vượt quá 100 kí tự</p>
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
    <div class="position-valid">
      <p class="text">Vị trí làm việc</p>
      <p class="text-ms">Có thể chọn nhiều vị trí mà bạn muốn làm việc.</p>
      <div class="auto-input"><Autocomplete /></div>
    </div>
    <div class="introduc-valid">
      <p class="text">Mô tả về bản thân</p>
      <textarea
        type="text"
        class="text-area"
        @keyup="charCount"
        v-model="message"
        :class="{ error: error }"
      ></textarea>
      <p :class="{ 'error-text': error }">{{ this.char }}/1000</p>
      <p class="error-text" v-if="error">Vượt quá độ dài qui định</p>
    </div>
    <div class="image-valid">
      <p class="text">Ảnh cá nhân</p>
      <DropZone />
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Autocomplete from "@/components/autocompleted/Autocomplete.vue";
import DropZone from "@/components/dropzone/DropZone.vue";
export default {
  data() {
    return {
      time: null,
      charac: 0,
      name: "",
      message: "",
      char: 0,
      error: false,
      errorname: false,
    };
  },
  components: { DatePicker, Autocomplete, DropZone },
  methods: {
    disableAfterToday(date) {
      const today = new Date();
      return date > today;
    },
    charCount() {
      this.char = this.message.length;
      this.char > 1000 ? (this.error = true) : (this.error = false);
    },
    errorHandle() {
      this.name.length > 100
        ? (this.errorname = true)
        : (this.errorname = false);
    },
  },
  computed: {},
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
  position: relative;
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
  .text-ms {
    font-size: 12px;
    line-height: 20px;
    color: #666666;
    margin-left: 12px;
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

.auto-input {
  height: 50px;
}
.text-area {
  padding: 8px 10px;
  gap: 10px;
  width: 528px;
  height: 152px;
  left: 32px;
  top: 370px;

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
</style>
