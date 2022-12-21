<template>
  <div class="container">
    <h3 class="title">Đơn ứng tuyển</h3>
    <div class="steps">
      <div class="step" v-for="step in steps" :key="step.id">
        <p
          class="step-tag"
          :class="{
            active: step.id === activePhase,
            pass: step.id < activePhase,
          }"
        >
          {{ step.stt }}
        </p>
        <p class="step-text">{{ step.name }}</p>
      </div>
      <div class="line"></div>
    </div>

    <FormPage
      v-for="(field, index) in formInfos[activePhase].fields"
      :key="index"
      :form="field.data"
      :id="field.id"
      :step="activePhase"
      @deleteForm="deleteForm"
      @updateInput="updateInput"
      @updateDate="updateDate"
      @updateSelect="updateSelect"
      @updateTextarena="updateTextarena"
      @updateJob="updateJob"
      @updateImg="updateImg"
      @updateSalary="updateSalary"
    />
    <div class="add-company" v-if="activePhase === 1">
      <img class="plus" src="@/assets/Plus.png" />
      <span class="text" @click="add">Thêm công ty</span>
    </div>
    <div class="btn-group">
      <button class="btn" v-if="activePhase === 2" @click="submit">
        Hoàn Thành
      </button>
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
import FormPage from "./FormPage.vue";
import { v4 as idv4 } from "uuid";

export default {
  data() {
    return {
      steps: [
        {
          id: 0,
          stt: 1,
          name: "Thông tin cá nhân",
        },
        {
          id: 1,
          stt: 2,
          name: "Kinh nghiệm làm việc",
        },
        {
          id: 2,
          stt: 3,
          name: "Xác nhận thông tin",
        },
      ],
      formInfos: [
        {
          stt: 1,
          fields: [
            {
              id: 1,
              data: [
                {
                  stt: idv4(),
                  component: "Input",
                  label: "Họ và tên",
                  key: "fullName",
                  value: "",
                  maxLength: 100,
                  errorMessage: null,
                  required: true,
                },
                {
                  stt: idv4(),
                  component: "SelectDate",
                  label: "Ngày sinh",
                  key: "birthday",
                  value: "",
                  errorMessage: null,
                  required: true,
                },
                {
                  stt: idv4(),
                  component: "Select",
                  label: "Thành phố",
                  key: "city",
                  value: "",
                  options: ["Hà Nội", "Đà Nẵng", "TP Hồ Chí Minh"],
                },
                {
                  stt: idv4(),
                  component: "JobSelect",
                  label: "Vị trí làm việc",
                  key: "positions",
                  subTitle: "Có thể chọn nhiều vị trí mà bạn muốn làm việc",
                  value: [],
                },
                {
                  stt: idv4(),
                  component: "TextArenaInput",
                  label: "Mô tả về bản thân",
                  key: "aboutYourSelf",
                  value: "",
                  maxLength: 1000,
                  errorMessage: null,
                  showCount: true,
                },
                {
                  stt: idv4(),
                  component: "ImgSelect",
                  label: "Ảnh cá nhân",
                  key: "img",
                  value: "",
                },
              ],
            },
          ],
        },
        {
          stt: 2,
          fields: [
            {
              id: 1,
              data: [
                {
                  component: "Select",
                  label: "Company",
                  key: "company",
                  value: "",
                  required: true,
                  options: ["VNG", "MOR", "FPT"],
                  errorMessage: null,
                  delete: true,
                },
                {
                  component: "Input",
                  label: "Vị trí từng làm",
                  key: "oldPosition",
                  value: "",
                  errorMessage: null,
                  required: true,
                },
                {
                  component: "SelectDate",
                  label: "Thời gian làm việc",
                  key: "workingTime",
                  value: { startDate: "", endDate: "" },
                  required: true,
                  errorMessage: null,
                  range: true,
                },
                {
                  component: "TextArenaInput",
                  label: "Mô tả công việc",
                  key: "aboutWork",
                  value: "",
                  maxLength: 5000,
                  showCount: false,
                  errorMessage: null,
                },
              ],
            },
          ],
        },
        {
          stt: 3,
          fields: [
            {
              id: 1,
              data: [
                {
                  component: "TextArenaInput",
                  label: "Lý do muốn ứng tuyển vào công ty",
                  key: "reason",
                  value: "",
                  errorMessage: null,
                  maxLength: 1000,
                  required: true,
                  showCount: true,
                },
                {
                  component: "InputSalary",
                  label: "Mức lương mong muốn",
                  key: "salary",
                  value: "",
                  maxLength: 10,
                  errorMessage: null,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
      activePhase: 0,
      isCheck: false,
      formValue: {
        yourself: "",
        expWorks: [],
      },
    };
  },
  components: { FormPage },
  methods: {
    nextClick() {
      this.validate();
      this.getValue();
      if (this.isCheck) {
        this.activePhase += 0;
      } else {
        this.activePhase += 1;
      }
    },
    backClick() {
      this.activePhase -= 1;
    },
    submit() {
      this.validate();
      if (!this.isCheck) {
        console.log("formValues", this.formValue);
        alert("Thanks for Submit");
      }
    },
    add() {
      this.formInfos.forEach((form) => {
        if (form.stt === 2) {
          form.fields.push({
            id: idv4(),
            data: [
              {
                component: "Select",
                label: "Company",
                key: "company",
                value: "",
                errorMessage: null,
                required: true,
                options: ["VNG", "MOR", "FPT"],
                delete: true,
              },
              {
                component: "Input",
                label: "Vị trí từng làm",
                key: "oldPosition",
                value: "",
                errorMessage: null,
                required: true,
              },
              {
                component: "SelectDate",
                label: "Thời gian làm việc",
                key: "workingTime",
                value: { startDate: "", endDate: "" },
                required: true,
                errorMessage: null,
                range: true,
              },
              {
                component: "TextArenaInput",
                label: "Mô tả công việc",
                key: "aboutWork",
                value: "",
                maxLength: 5000,
                errorMessage: null,
                showCount: false,
              },
            ],
          });
        }
      });
    },
    deleteForm(data) {
      this.formInfos.forEach((form) => {
        if (form.stt === 2) {
          let id = form.fields.findIndex((field) => field.id === data);
          form.fields.splice(id, 1);
        }
      });
    },
    updateInput(data, id) {
      this.formInfos.forEach((form) => {
        if (this.activePhase + 1 === form.stt) {
          form.fields.forEach((item) =>
            item.data.forEach((d) => {
              if (d.key === "fullName") {
                d.value = data;
                this.formValue.name = d.value;
              }
            })
          );
        }
        if (this.activePhase + 1 === form.stt) {
          form.fields
            .filter((item) => item.id === id)
            .forEach((item) =>
              item.data.forEach((d) => {
                if (d.key === "oldPosition") {
                  d.value = data;
                }
              })
            );
        }
      });
      // let Arr = [];
      // this.formInfos.forEach((form) => {
      //   form.fields.forEach(
      //     (item) => (Arr = item.data.filter((d) => d.stt === index)[0])
      //   );
      // });
      // console.log(Arr);
    },
    updateDate(data, id) {
      this.formInfos.forEach((form) => {
        if (this.activePhase + 1 === form.stt) {
          form.fields.forEach((item) =>
            item.data.forEach((d) => {
              if (d.key === "birthday") {
                d.value = data.startDate;
                this.formValue.birthday = d.value;
              }
            })
          );
        }
        if (this.activePhase + 1 === form.stt) {
          form.fields
            .filter((item) => item.id === id)
            .forEach((item) =>
              item.data.forEach((d) => {
                if (d.key === "workingTime") {
                  d.value.startDate = data.startDate;
                  d.value.endDate = data.endDate;
                }
              })
            );
        }
      });
    },
    updateSelect(data, id) {
      this.formInfos.forEach((form) => {
        if (this.activePhase + 1 === form.stt) {
          form.fields.forEach((item) =>
            item.data.forEach((d) => {
              if (d.key === "city") {
                d.value = data;
                this.formValue.city = d.value;
              }
            })
          );
        }
        if (this.activePhase + 1 === form.stt) {
          form.fields
            .filter((item) => item.id === id)
            .forEach((item) =>
              item.data.forEach((d) => {
                if (d.key === "company") {
                  d.value = data;
                }
              })
            );
        }
      });
    },
    updateTextarena(data, id) {
      this.formInfos.forEach((form) => {
        if (this.activePhase + 1 === form.stt) {
          form.fields.forEach((item) =>
            item.data.forEach((d) => {
              if (d.key === "aboutYourSelf") {
                d.value = data;
                this.formValue.yourself = d.value;
              }
            })
          );
        }
        if (this.activePhase + 1 === form.stt) {
          form.fields
            .filter((item) => item.id === id)
            .forEach((item) =>
              item.data.forEach((d) => {
                if (d.key === "aboutWork") {
                  d.value = data;
                }
              })
            );
        }
        if (this.activePhase + 1 === form.stt) {
          form.fields.forEach((item) =>
            item.data.forEach((d) => {
              if (d.key === "reason") {
                d.value = data;
                this.formValue.reason = d.value;
              }
            })
          );
        }
      });
    },
    updateJob(data) {
      this.formInfos.forEach((form) => {
        if (this.activePhase + 1 === form.stt) {
          form.fields.forEach((item) =>
            item.data.forEach((d) => {
              if (d.key === "position") {
                d.value = data;
                this.formValue.job = d.value;
              }
            })
          );
        }
      });
    },
    updateImg(data) {
      this.formInfos.forEach((form) => {
        if (this.activePhase + 1 === form.stt) {
          form.fields.forEach((item) =>
            item.data.forEach((d) => {
              if (d.key === "img") {
                d.value = data;
                this.formValue.img = d.value;
              }
            })
          );
        }
      });
    },
    updateSalary(data) {
      this.formInfos.forEach((form) => {
        form.fields.forEach((item) =>
          item.data.forEach((d) => {
            if (d.key === "salary") {
              d.value = data;
              this.formValue.salary = d.value;
            }
          })
        );
      });
    },
    getValue() {
      if (this.activePhase === 1) {
        this.formInfos
          .filter((form) => form.stt === 2)[0]
          .fields.forEach((field) => {
            if (!this.isCheck) {
              this.formValue.expWorks.push({
                id: idv4(),
                label: field.data[0].label,
                company: field.data[0].value,
                oldJob: field.data[1].value,
                startDate: field.data[2].value,
                endDate: field.data[2].value,
                description: field.data[3].value,
              });
            }
          });
      }
    },
    validate() {
      let valid = false;
      this.formInfos
        .filter((form) => form.stt === 2)[0]
        .fields.forEach((field) =>
          field.data.forEach((d) => (d.errorMessage = null))
        );
      if (this.activePhase === 0) {
        if (!this.formValue.name) {
          valid = true;
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  if (d.key === "fullName") {
                    d.errorMessage = "This field is required";
                  }
                })
              );
            }
          });
        } else if (this.formValue.name.length > 100) {
          valid = true;
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  if (d.key === "fullName") {
                    d.errorMessage = "This field is max 100 characters";
                  }
                })
              );
            }
          });
        } else {
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  d.errorMessage = null;
                })
              );
            }
          });
        }
        if (!this.formValue.birthday) {
          valid = true;
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  if (d.key === "birthday") {
                    d.errorMessage = "This field is required";
                  }
                })
              );
            }
          });
        }

        if (this.formValue.yourself.length > 1000) {
          valid = true;
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  if (d.key === "aboutYourSelf") {
                    d.errorMessage = "This field is max 1000 characters";
                  }
                })
              );
            }
          });
        }
      }
      if (this.activePhase === 1) {
        const Arr = JSON.parse(
          JSON.stringify(this.formInfos.find((form) => form.stt === 2).fields)
        );

        for (let i = 0; i < Arr.length; i++) {
          let company = Arr[i].data.find((f) => f.key === "company");
          let oldJob = Arr[i].data.find((f) => f.key === "oldPosition");
          let date = Arr[i].data.find((f) => f.key === "workingTime");
          // let des = Arr[i].data.find((f) => f.label === "Mô tả công việc");
          let startDate = new Date(date.value.startDate).getTime();
          let endDate = new Date(date.value.endDate).getTime();
          if (!company.value) {
            valid = true;
            company.errorMessage = "This field is required";
          }
          if (!oldJob.value) {
            valid = true;
            oldJob.errorMessage = "This field is required";
          } else if (oldJob.value.length > 100) {
            valid = true;
            oldJob.errorMessage = "This field is max 100 characters";
          }
          if (!date.value.startDate || !date.value.endDate) {
            valid = true;
            date.errorMessage = "This field is required";
          } else if (startDate > endDate) {
            valid = true;
            date.errorMessage = "Start date must be less than end date";
          } else if (startDate === endDate) {
            valid = true;
            date.errorMessage = "Inappropriate working hours.";
          }
          for (let j = 1; j < Arr.length; j++) {
            let date2 = Arr[j].data.find(
              (f) => f.label === "Thời gian làm việc"
            );

            let nextStartDate = new Date(date2.value.startDate).getTime();
            let nextEndDate = new Date(date2.value.endDate).getTime();
            if (i != j) {
              if (
                (nextStartDate <= endDate && nextStartDate >= startDate) ||
                (nextEndDate >= startDate && nextEndDate <= endDate)
              ) {
                valid = true;
                date2.errorMessage = `Inappropriate working hours.`;
              }
            }
          }
          // if (!valid) {
          //   company.errorMessage = null;
          //   oldJob.errorMessage = null;
          //   date.errorMessage = null;
          // }
        }
        const idx = this.formInfos.findIndex((form) => form.stt === 2);
        this.formInfos[idx].fields = Arr;
      }
      if (this.activePhase === 2) {
        if (!this.formValue.reason) {
          valid = true;
          this.formInfos.forEach((form) => {
            form.fields.forEach((item) =>
              item.data.forEach((d) => {
                if (d.key === "reason") {
                  d.errorMessage = "This field is required";
                }
              })
            );
          });
        } else if (this.formValue.reason.length > 1000) {
          valid = true;
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  if (d.key === "reason") {
                    d.errorMessage = "This field is max 1000 characters";
                  }
                })
              );
            }
          });
        } else {
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  d.errorMessage = null;
                })
              );
            }
          });
        }
        if (!this.formValue.salary) {
          valid = true;
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  if (d.key === "salary") {
                    d.errorMessage = "This field is required";
                  }
                })
              );
            }
          });
        } else if (this.formValue.salary.length > 10) {
          valid = true;
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  if (d.key === "salary") {
                    d.errorMessage = "This field is max 10 characters";
                  }
                })
              );
            }
          });
        } else {
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  if (d.key === "salary") {
                    d.errorMessage = null;
                  }
                })
              );
            }
          });
        }
      }

      return (this.isCheck = valid);
    },
  },
  computed: {},
  watch: {},
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
  .input-fields {
    width: 1026px;
    padding: 20px 32px 24px;
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    margin: 18px 0;
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
      .pass {
        padding: 6px 12px;
        width: 32px;
        height: 32px;
        background: #617d98;
        border-radius: 90px;
        font-size: 14px;
        line-height: 21px;
      }
      .step-text {
        color: #333333;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
      }
    }
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
