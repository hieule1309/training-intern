<template>
  <div class="container">
    <h3 class="title">Don ung tuyen</h3>
    <div class="steps">
      <div class="step" v-for="step in steps" :key="step.id">
        <p
          class="step-tag"
          :class="{ active: step.active, disable: step.disable }"
        >
          {{ step.id }}
        </p>
        <p class="step-text">{{ step.name }}</p>
      </div>
      <div class="line"></div>
    </div>
    <FormRecruit />
  </div>
</template>

<script>
import FormRecruit from "./FormRecruit.vue";
export default {
  data() {
    return {
      steps: [
        { id: 1, name: "Thông tin cá nhân", active: true },
        { id: 2, name: "Kinh nghiệm làm việc", active: false, disable: true },
        { id: 3, name: "Xác nhận thông tin", active: false, disable: true },
      ],
    };
  },
  components: { FormRecruit },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
  .title {
    font-size: 24px;
    line-height: 36px;
    color: #333333;
    font-weight: 400;
  }
  .steps {
    position: relative;
    display: flex;
    text-align: center;
    margin-left: -95px;
    .line {
      position: absolute;
      height: 0;
      width: 450px;

      border: 1px solid #dbdbdb;
      transform: rotate(-0.14deg);
      left: 155px;
      top: 18px;
    }
    .step {
      width: 126px;
      height: 72px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin-left: 95px;
      z-index: 2;
      .disable {
        background-color: #dbdbdb !important;
      }
      .step-tag {
        padding: 6px 12px;
        width: 32px;
        height: 32px;
        background: #617d98;
        border-radius: 90px;
        font-size: 14px;
        line-height: 21px;
        color: #fff;
      }
      .active {
        width: 40px;
        height: 40px;
        line-height: 30px;
      }
      .step-text {
        color: #333333;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
      }
    }
  }
}
</style>
