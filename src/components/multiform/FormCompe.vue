<template>
  <div class="container">
    <div class="reason-valid">
      <div class="valid-groups">
        <span class="must">Must</span>
        <label class="text">Lý do muốn ứng tuyển vào công ty</label>
      </div>
      <textarea
        type="text"
        class="text-area"
        @keyup="charCount"
        v-model="message"
        :class="{ error: error }"
        maxlength="1001"
      ></textarea>
      <p :class="{ 'error-text': error }">{{ this.char }}/1000</p>
      <p class="error-text" v-if="error">Không vượt quá 1000 kí tự</p>
    </div>
    <div class="salary">
      <div class="valid-groups">
        <span class="must">Must</span>
        <label class="text">Mức lương mong muốn</label>
      </div>
      <div class="box">
        <input type="number" class="box-salary" />
        <span>VNĐ</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      error: false,
      char: 0,
    };
  },
  methods: {
    charCount() {
      this.char = this.message.length;
      this.char > 1000 ? (this.error = true) : (this.error = false);
    },
  },
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
