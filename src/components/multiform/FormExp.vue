<template>
  <div class="wrapper">
    <div class="container" v-for="(job, i) in jobs" :key="job.id">
      <div class="selecte-company">
        <select
          name="company"
          id="company"
          v-model="job.company"
          class="selected"
          @change="updateExpWorks"
        >
          <option value="mor">MOR</option>
          <option value="vng">VNG</option>
          <option value="viettel">Viettel</option>
        </select>
        <img class="trash-img" src="@/assets/Trash.png" @click="remove(i)" />
      </div>
      <div class="valid-position">
        <TitleGroup :title="oldPosition" />
        <input
          type="text"
          class="valid-input"
          id="job"
          required
          :class="{ error: job.errorjob }"
          @keydown="errorHandle"
          v-model="job.job"
          maxlength="101"
          @input="updateExpWorks"
        />
        <p class="text-error" v-if="job.errorjob">Không vượt quá 100 kí tự</p>
      </div>
      <div class="date-valid">
        <TitleGroup :title="timeWorks" />
        <div class="datepicker-group">
          <DatePicker
            placeholder="0000/00/00"
            v-model="job.startDate"
            value-type="format"
            format="YYYY-MM-DD"
            class="date"
            @change="updateExpWorks"
          />
          <div class="space"></div>
          <div class="minus"></div>
          <DatePicker
            placeholder="0000/00/00"
            v-model="job.endDate"
            value-type="format"
            format="YYYY-MM-DD"
            class="date"
            :class="{ error: job.errorTime }"
            @change="updateExpWorks"
          />
        </div>
      </div>
      <div class="about-job">
        <p class="text">Mô tả về công việc</p>
        <TextArenaInput
          @getDescription="getDescription"
          :maxLength="job.maxLength"
          @input="updateExpWorks"
          :showCount="false"
        />
      </div>
    </div>
    <div class="add-company">
      <img class="plus" src="@/assets/Plus.png" />
      <span class="text" @click="add">Thêm công ty</span>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { v4 as idv4 } from "uuid";
import TitleGroup from "./components/TitleGroup.vue";
import TextArenaInput from "./TextArenaInput.vue";

export default {
  data() {
    return {
      count: 1,
      jobs: [
        {
          id: idv4(),
          company: "",
          startDate: "",
          endDate: "",
          description: "",
          job: "",
          error: false,
          errorjob: false,
          maxLength: 5000,
        },
      ],
      oldPosition: "Vị trí từng làm",
      timeWorks: "Thời gian làm việc",
      required: true,
    };
  },
  props: {},

  methods: {
    add() {
      this.jobs.push({
        id: idv4(),
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        job: "",
        error: false,
        errorjob: false,
        maxLength: 5000,
        errorTime: false,
      });
    },
    remove(i) {
      this.jobs.splice(i, 1);
    },
    errorHandle() {
      this.jobs.forEach((job) => {
        job.job.length > 100 ? (job.errorjob = true) : (job.errorjob = false);
      });
    },
    handleError() {
      this.jobs.forEach((job) => {
        if (
          job.job &&
          job.startDate &&
          job.endDate &&
          !job.errorjob &&
          !job.error
        ) {
          this.required = false;
        } else {
          this.required = true;
        }
      });
      this.$emit("handleError", this.required);
    },
    updateExpWorks() {
      this.$emit("updateExpWorks", this.jobs);
      this.handleError();
      this.errorTime();
    },
    getDescription(data) {
      this.jobs.forEach((job) => {
        job.description = data.des;
        job.error = data.error;
      });
      this.updateExpWorks();
    },
    errorTime() {},
  },
  components: { DatePicker, TitleGroup, TextArenaInput },
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
.add-company {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;
  width: 151px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  cursor: pointer;
  .text {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #48647f;
  }
}
</style>
