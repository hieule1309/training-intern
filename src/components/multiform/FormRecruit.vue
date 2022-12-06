<template>
  <div class="container">
    <div class="name-valid">
      <div class="valid-groups">
        <span class="must">Must</span>
        <label class="text" for="name">Họ và tên</label>
      </div>
      <input
        type="text"
        class="valid-input"
        :class="{ error: errorname }"
        @keyup="errorHandle"
        name="name"
        id="name"
        v-model="name"
        @input="onChange"
        required
      />
      <p class="error-text" v-if="errorname">Không vượt quá 100 kí tự</p>
    </div>
    <div class="date-valid">
      <div class="valid-groups">
        <span class="must">Must</span>
        <label class="text" for="date">Ngày sinh</label>
      </div>
      <DatePicker
        placeholder="0000/00/00"
        v-model="time"
        title-format="0000/00/00"
        class="date"
        :default-value="new Date()"
        :disabled-date="disableAfterToday"
        id="date"
        @input="onChange"
      />
    </div>
    <div class="citi-valid">
      <label class="text">Thành Phố</label>
      <br />
      <select
        name="citie"
        id="citie"
        v-model="city"
        @input="onChange"
        class="cities"
      >
        <option value="hanoi">Hà Nội</option>
        <option value="tphcm">TP Hồ Chí Minh</option>
        <option value="danang">Đà Nẵng</option>
      </select>
    </div>
    <div class="position-valid">
      <label class="text">Vị trí làm việc</label>
      <p class="text-ms">Có thể chọn nhiều vị trí mà bạn muốn làm việc.</p>
      <div class="auto-input">
        <Autocomplete />
      </div>
    </div>
    <div class="introduc-valid">
      <label class="text" for="description">Mô tả về bản thân</label>
      <br />
      <textarea
        type="text"
        class="text-area"
        @keyup="charCount"
        name="description"
        id="description"
        :class="{ error: error }"
        v-model="description"
        @input="onChange"
      ></textarea>
      <p :class="{ 'error-text': error }">{{ this.char }}/1000</p>
      <p class="error-text" v-if="error">Vượt quá độ dài qui định</p>
    </div>
    <div class="image-valid">
      <label class="text">Ảnh cá nhân</label>
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
      char: 0,
      error: false,
      errorname: false,
      name: "",
      description: "",
      city: "",
    };
  },
  props: {
    formValues: {
      name: String,
      date: String,
      city: String,
      position: Array,
      description: String,
      img: String,
    },
  },
  components: { DatePicker, Autocomplete, DropZone },
  methods: {
    disableAfterToday(date) {
      const today = new Date();
      return date > today;
    },
    charCount() {
      this.char = this.description.length;
      this.char > 1000 ? (this.error = true) : (this.error = false);
    },
    errorHandle() {
      this.name.length > 100
        ? (this.errorname = true)
        : (this.errorname = false);
    },
    onChange() {
      this.$emit("formValuesChange", {
        label: "recruit",
        data: {
          ...this.formValues,
          name: this.name,
          date: this.time,
          city: this.city,
          description: this.description,
        },
      });
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
