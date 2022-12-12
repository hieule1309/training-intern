<template>
  <div class="container">
    <div class="name-valid">
      <!-- <div class="valid-groups">
        <span class="must">Must</span>
        <label class="text" for="name">Họ và tên</label>
      </div> -->
      <TitleGroup :title="fullName" />
      <input
        type="text"
        class="valid-input"
        :class="{ error: errorname }"
        name="name"
        id="name"
        v-model="name"
        @input="onChange"
        @keydown="errorHandle"
      />
      <p class="error-text" v-if="errorname">Không vượt quá 100 kí tự</p>
    </div>
    <div class="date-valid">
      <TitleGroup :title="dob" />
      <DatePicker
        placeholder="0000/00/00"
        v-model="time"
        value-type="format"
        format="YYYY/MM/DD"
        class="date"
        :default-value="new Date()"
        :disabled-date="disableAfterToday"
        id="date"
        @change="onChange"
        :clearable="false"
      />
    </div>
    <div class="citi-valid">
      <label class="block" for="citie">Thành Phố</label>
      <select
        name="citie"
        id="citie"
        v-model="city"
        @change="onChange"
        class="cities"
      >
        <option disabled value="">Please select your city--</option>
        <option>Hà Nội</option>
        <option>TP Hồ Chí Minh</option>
        <option>Đà Nẵng</option>
      </select>
    </div>
    <div class="position-valid">
      <label class="block">Vị trí làm việc</label>
      <p class="text-ms">Có thể chọn nhiều vị trí mà bạn muốn làm việc.</p>
      <div class="auto-input">
        <Autocomplete
          :items="this.position"
          :itemSelected="this.positionSelected"
          @selectedItem="selectedItem"
          @deletedItem="deletedItem"
          placeholder="Choose your position"
          @input="onChange"
        />
      </div>
    </div>
    <div class="introduc-valid">
      <label class="block" for="description">Mô tả về bản thân</label>
      <TextArenaInput
        @getDescription="getDescription"
        :maxLength="this.maxLength"
        @input="onChange"
      />
    </div>
    <div class="image-valid">
      <label class="block">Ảnh cá nhân</label>
      <DropZone @change="onChange" @uploadFiles="uploadFiles" />
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Autocomplete from "@/components/autocompleted/Autocomplete.vue";
import DropZone from "@/components/dropzone/DropZone.vue";
import TextArenaInput from "./TextArenaInput.vue";
import TitleGroup from "./components/TitleGroup.vue";

export default {
  data() {
    return {
      time: "",
      errorname: false,
      name: "",
      description: "",
      city: "",
      img: null,
      desErrors: false,
      position: [
        { name: "FE Developer" },
        { name: "BE Developer" },
        { name: "Software Engineer" },
        { name: "AI Engineer" },
        { name: "Embedded Software" },
      ],
      positionSelected: [],
      maxLength: 1000,
      fullName: "Họ và tên",
      dob: "Ngày sinh",
      required: true,
    };
  },
  props: {
    // formValues: {
    //   name: String,
    //   date: String,
    //   city: String,
    //   position: Array,
    //   description: String,
    //   img: String,
    // },
  },
  components: {
    DatePicker,
    Autocomplete,
    DropZone,
    TextArenaInput,
    TitleGroup,
  },
  methods: {
    disableAfterToday(date) {
      const today = new Date();
      return date > today;
    },
    errorHandle() {
      this.name.length > 100
        ? (this.errorname = true)
        : (this.errorname = false);
    },
    handleError() {
      if (this.name && this.time && !this.errorname && !this.desErrors) {
        this.required = false;
      } else {
        this.required = true;
      }
      this.$emit("handleError", this.required);
    },
    onChange() {
      this.$emit("updateRecruit", {
        name: this.name,
        date: this.time,
        city: this.city,
        description: this.description,
        positionSelected: this.positionSelected,
        img: this.img,
      });
      this.handleError();
    },
    selectedItem(data) {
      this.positionSelected.push(data);
      const idx = this.position.findIndex((p) => p.name == data.name);
      this.position.splice(idx, 1);
    },
    deletedItem(data) {
      this.positionSelected.splice(data.idx, 1);
      this.position.push(data.item);
    },
    getDescription(data) {
      this.description = data.des;
      this.desErrors = data.error;
      this.onChange();
    },
    uploadFiles(data) {
      this.img = data[0].name;

      this.onChange();
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
  .block {
    display: block;
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
  border-radius: 6px;
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
  width: 528px;
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
