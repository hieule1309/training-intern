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

    <component
      :is="forms[activePhase].component"
      @updateRecruit="updateRecruit"
      @updateExpWorks="updateExpWorks"
      @updateConfirm="updateConfirm"
      @handleError="handleError"
    />
    <div class="btn-group">
      <button
        class="btn"
        :class="{ disabled: this.getError }"
        v-if="activePhase === 2"
        @click="submit"
      >
        Hoàn Thành
      </button>
      <button
        class="btn"
        @click="nextClick"
        v-if="activePhase === 0 || activePhase === 1"
        :class="{ disabled: this.getError }"
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
import { mapActions, mapGetters } from "vuex";
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
    };
  },
  components: { FormRecruit, FormExp, FormCompe },
  methods: {
    ...mapActions("formModules", [
      "updateRecruit",
      "updateExpWorks",
      "updateConfirm",
      "handleError",
    ]),
    nextClick() {
      if (!this.getError) {
        this.activePhase += 1;
        this.handleError(true);
      }
    },
    backClick() {
      this.activePhase -= 1;
      this.handleError(true);
    },
    submit() {
      console.log("formValues", [
        this.getRecruit,
        this.getExpWorks,
        this.getConfirm,
      ]);
    },
    // updateForms(payload) {
    //   this.formValues = {
    //     ...this.formValues,
    //     [payload.label]: payload.data,
    //   };
    // },
  },
  computed: {
    ...mapGetters("formModules", [
      "getError",
      "getRecruit",
      "getExpWorks",
      "getConfirm",
    ]),
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
    .disabled {
      color: #ffffff;
      background: #dcdcdc;
    }
  }
}
</style>
