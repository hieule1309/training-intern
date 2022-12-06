<template>
  <div class="container">
    <h3 class="title">Đơn ứng tuyển</h3>
    <div class="steps">
      <div class="step" v-for="step in steps" :key="step.id">
        <p class="step-tag" :class="{ active: step.id === activePhase }">
          {{ step.stt }}
        </p>
        <p class="step-text">{{ step.name }}</p>
      </div>
      <div class="line"></div>
    </div>
    <!-- <FormRecruit v-if="activePhase === 0" />
    <FormExp v-if="activePhase === 1" />
    <FormCompe v-if="activePhase === 2" /> -->
    <KeepAlive
      ><component
        :is="forms[activePhase].component"
        :formValues="formValues[forms[activePhase].label]"
        @formValuesChange="updateForm"
    /></KeepAlive>
    <div class="btn-group">
      <button class="btn-complete" v-if="activePhase === 2">Hoàn Thành</button>
      <button
        class="btn"
        @click="nextClick"
        v-if="activePhase === 0 || activePhase === 1"
      >
        Tiếp
      </button>
      <button
        class="btn-primary"
        @click="backClick"
        v-if="activePhase === 1 || activePhase === 2"
      >
        Quay lại
      </button>
    </div>
  </div>
</template>

<script>
import FormRecruit from "./FormRecruit.vue";
import FormExp from "./FormExp.vue";
import FormCompe from "./FormCompe.vue";
export default {
  data() {
    return {
      steps: [
        { id: 0, stt: 1, name: "Thông tin cá nhân", active: true },
        { id: 1, stt: 2, name: "Kinh nghiệm làm việc", active: false },
        { id: 2, stt: 3, name: "Xác nhận thông tin", active: false },
      ],
      forms: [
        {
          component: FormRecruit,
          label: "recruit",
        },
        {
          component: FormExp,
          label: "expWorks",
        },
        { component: FormCompe, label: "confirm" },
      ],
      activePhase: 0,
      formValues: {
        recruit: {
          name: "",
          date: "",
          city: "",
          position: [],
          description: "",
          img: "",
        },
        expWorks: [
          {
            id: 1,
            company: "MOR",
            position: "Software engineer",
            startTime: "2003/12/02",
            endTime: "2005/08/01",
            description: "sss",
          },
        ],
        confirm: {
          reason: "",
          salary: "",
        },
      },
    };
  },
  components: { FormRecruit, FormExp, FormCompe },
  methods: {
    nextClick() {
      this.activePhase += 1;
    },
    backClick() {
      this.activePhase -= 1;
    },
    updateForm(payload) {
      this.formValues = {
        ...this.formValues,
        [payload.label]: payload.data,
      };
    },
  },
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

      .step-tag {
        padding: 6px 12px;
        width: 32px;
        height: 32px;
        background: #dbdbdb;
        border-radius: 90px;
        font-size: 14px;
        line-height: 21px;
        color: #fff;
      }
      .active {
        width: 40px;
        height: 40px;
        line-height: 30px;
        background: #617d98;
      }
      .step-text {
        color: #333333;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
      }
    }
  }
  .btn-group {
    .btn {
      margin-top: 10px;
      width: 102px;
      height: 40px;
      background: #627d98;
      border-radius: 3px;
      border: none;
      font-size: 16px;
      line-height: 24px;
      color: #fff;
      cursor: pointer;
    }
    .btn-primary {
      margin-top: 10px;
      width: 102px;
      height: 40px;
      background: #fff;
      border-radius: 3px;
      border: 1px solid #dcdcdc;
      font-size: 16px;
      line-height: 24px;
      color: #333;
      cursor: pointer;
      margin-left: 20px;
    }
    .btn-complete {
      width: 142px;
      height: 40px;
      width: 142px;
      height: 40px;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      cursor: pointer;
      border: none;
      color: #ffffff;
      background: #dcdcdc;
      border-radius: 3px;
      margin-top: 10px;
    }
  }
}
</style>
