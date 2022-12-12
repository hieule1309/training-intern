<template>
  <div class="container">
    <div class="reason-valid">
      <!-- <div class="valid-groups">
        <span class="must">Must</span>
        <label class="text">Lý do muốn ứng tuyển vào công ty</label>
      </div> -->
      <TitleGroup :title="reason" />
      <TextArenaInput
        @getDescription="getDescription"
        :maxLength="this.maxLength"
      />
    </div>
    <div class="salary">
      <!-- <div class="valid-groups">
        <span class="must">Must</span>
        <label class="text">Mức lương mong muốn</label>
      </div> -->
      <TitleGroup :title="desiredSalary" />
      <div class="box">
        <input
          type="number"
          class="box-salary"
          placeholder="Number"
          v-model="salary"
          @input="onChange"
          @keyup="errorHandle"
        />
        <span>VNĐ</span>
      </div>
      <p class="error-text" v-if="error">Tối đa 10 chữ số</p>
    </div>
  </div>
</template>

<script>
import TextArenaInput from "./TextArenaInput.vue";
import TitleGroup from "./components/TitleGroup.vue";

export default {
  data() {
    return {
      description: "",
      maxLength: 1000,
      salary: 0,
      reason: "Lý do muốn ứng tuyển vào công ty",
      desiredSalary: "Mức lương mong muốn",
      error: false,
      required: true,
      desError: false,
    };
  },
  methods: {
    errorHandle() {
      if (this.salary.length > 10) {
        this.error = true;
      } else {
        this.error = false;
      }
      if (this.salary && this.description && !this.desError) {
        this.required = false;
      } else {
        this.required = true;
      }

      this.$emit("handleError", this.required);
    },
    getDescription(data) {
      this.description = data.des;
      this.desError = data.error;
      this.onChange();
      this.errorHandle();
    },
    onChange() {
      this.$emit("updateConfirm", {
        reason: this.description,
        salary: this.salary,
      });
    },
  },
  components: { TextArenaInput, TitleGroup },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 32px 24px;
  gap: 10px;

  width: 926px;
  height: 346px;

  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;

  .text-area {
    padding: 8px 10px;
    width: 528px;
    height: 152px;
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    resize: none;
  }
  .box {
    padding: 10px 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 119px;
    height: 40px;
    background: #ffffff;

    border: 1px solid #dbdbdb;
    border-radius: 4px;
    align-items: center;
    .box-salary {
      font-size: 14px;
      line-height: 20px;
      color: #333333;
      width: 63px;
      height: 20px;
      border: none;
      resize: none;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    span {
      font-size: 14px;
      line-height: 20px;
      color: #333333;
    }
  }
}
.error {
  border: 1px solid #ed5d5d !important;
}

.error-text {
  color: #ed5d5d;
  font-size: 14px;
}
</style>
