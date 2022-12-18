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
    <FormPage
      v-for="(field, index) in formInfos[activePhase].fields"
      :key="index"
      :form="field.data"
      :id="field.id"
      @deleteForm="deleteForm"
      @updateInput="updateInput"
      @updateDate="updateDate"
      @updateSelect="updateSelect"
      @updateTextarena="updateTextarena"
      @updateJob="updateJob"
      @updateImg="updateImg"
      @updateSalary="updateSalary"
      :isCheck="isCheck"
      :dateCheck="dateCheck"
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
                  component: "Input",
                  label: "Họ và tên",
                  name: "",
                  maxLength: 100,
                  errorMessage: null,
                  required: true,
                },
                {
                  component: "SelectDate",
                  label: "Ngày sinh",
                  birthday: "",
                  errorMessage: null,
                  required: true,
                },
                {
                  component: "Select",
                  label: "Thành phố",
                  city: "",
                  options: ["Hà Nội", "Đà Nẵng", "TP Hồ Chí Minh"],
                },
                {
                  component: "JobSelect",
                  label: "Vị trí làm việc",
                  subTitle: "Có thể chọn nhiều vị trí mà bạn muốn làm việc",
                  positions: [],
                },
                {
                  component: "TextArenaInput",
                  label: "Mô tả về bản thân",
                  description: "",
                  maxLength: 1000,
                  showCount: true,
                },
                { component: "ImgSelect", label: "Ảnh cá nhân", img: "" },
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
                  company: "",
                  required: true,
                  options: ["VNG", "MOR", "FPT"],
                  delete: true,
                },
                {
                  component: "Input",
                  label: "Vị trí từng làm",
                  oldPosition: "",
                  errorMessage: null,
                  required: true,
                },
                {
                  component: "SelectDate",
                  label: "Thời gian làm việc",
                  startDate: "",
                  endDate: "",
                  required: true,
                  errorMessage: null,
                  range: true,
                },
                {
                  component: "TextArenaInput",
                  label: "Mô tả công việc",
                  description: "",
                  maxLength: 5000,
                  showCount: false,
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
                  description: "",
                  maxLength: 1000,
                  required: true,
                  showCount: true,
                },
                {
                  component: "InputSalary",
                  label: "Mức lương mong muốn",
                  salary: "",
                  maxLength: 10,

                  required: true,
                },
              ],
            },
          ],
        },
      ],
      activePhase: 0,
      isCheck: false,
      dateCheck: false,
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
                company: "",
                required: true,
                options: ["VNG", "MOR", "FPT"],
                delete: true,
              },
              {
                component: "Input",
                label: "Vị trí từng làm",
                oldPosition: "",
                required: true,
              },
              {
                component: "SelectDate",
                label: "Thời gian làm việc",
                starDate: "",
                endDate: "",
                required: true,
                range: true,
              },
              {
                component: "TextArenaInput",
                label: "Mô tả công việc",
                description: "",
                maxLength: 5000,
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
              if (d.label === "Họ và tên") {
                d.name = data;
                this.formValue.name = d.name;
              }
            })
          );
        }
        if (this.activePhase + 1 === form.stt) {
          form.fields
            .filter((item) => item.id === id)
            .forEach((item) =>
              item.data.forEach((d) => {
                if (d.label === "Vị trí từng làm") {
                  d.oldPosition = data;
                }
              })
            );
        }
      });
    },
    updateDate(data, id) {
      this.formInfos.forEach((form) => {
        if (this.activePhase + 1 === form.stt) {
          form.fields.forEach((item) =>
            item.data.forEach((d) => {
              if (d.label === "Ngày sinh") {
                d.birthday = data.date1;
                this.formValue.birthday = d.birthday;
              }
            })
          );
        }
        if (this.activePhase + 1 === form.stt) {
          form.fields
            .filter((item) => item.id === id)
            .forEach((item) =>
              item.data.forEach((d) => {
                if (d.label === "Thời gian làm việc") {
                  d.startDate = data.date1;
                  d.endDate = data.date2;
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
              if (d.label === "Thành phố") {
                d.city = data;
                this.formValue.city = d.city;
              }
            })
          );
        }
        if (this.activePhase + 1 === form.stt) {
          form.fields
            .filter((item) => item.id === id)
            .forEach((item) =>
              item.data.forEach((d) => {
                if (d.label === "Company") {
                  d.company = data;
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
              if (d.label === "Mô tả về bản thân") {
                d.description = data;
                this.formValue.yourself = d.description;
              }
            })
          );
        }
        if (this.activePhase + 1 === form.stt) {
          form.fields
            .filter((item) => item.id === id)
            .forEach((item) =>
              item.data.forEach((d) => {
                if (d.label === "Mô tả công việc") {
                  d.description = data;
                }
              })
            );
        }
        if (this.activePhase + 1 === form.stt) {
          form.fields.forEach((item) =>
            item.data.forEach((d) => {
              if (d.label === "Lý do muốn ứng tuyển vào công ty") {
                d.description = data;
                this.formValue.reason = d.description;
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
              if (d.label === "Vị trí làm việc") {
                d.positions = data;
                this.formValue.job = d.positions;
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
              if (d.label === "Ảnh cá nhân") {
                d.img = data;
                this.formValue.img = d.img;
              }
            })
          );
        }
      });
    },
    updateSalary(data) {
      this.formInfos.forEach((form) => {
        if (this.activePhase + 1 === form.stt) {
          form.fields.forEach((item) =>
            item.data.forEach((d) => {
              if (d.label === "Mức lương mong muốn") {
                d.salary = data;
                this.formValue.salary = d.salary;
              }
            })
          );
        }
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
                company: field.data[0].company,
                oldJob: field.data[1].oldPosition,
                startDate: field.data[2].startDate,
                endDate: field.data[2].endDate,
                description: field.data[3].description,
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
                  if (d.label === "Họ và tên") {
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
                  if (d.label === "Họ và tên") {
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
                  if (d.label === "Ngày sinh") {
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
                  if (d.label === "Mô tả về bản thân") {
                    d.errorMessage = "This field is max 1000 characters";
                  }
                })
              );
            }
          });
        }
      }
      if (this.activePhase === 1) {
        const Arr = this.formInfos.filter((form) => form.stt === 2)[0].fields;

        for (let i = 0; i < Arr.length; i++) {
          let company = Arr[i].data.find((f) => f.label === "Company");
          let oldJob = Arr[i].data.find((f) => f.label === "Vị trí từng làm");
          let date = Arr[i].data.find((f) => f.label === "Thời gian làm việc");
          // let des = Arr[i].data.find((f) => f.label === "Mô tả công việc");
          let startDate = new Date(date.startDate).getTime();
          let endDate = new Date(date.endDate).getTime();
          if (!company.company) {
            valid = true;
            company.errorMessage = "This field is required";
          }
          if (!oldJob.oldPosition) {
            valid = true;
            oldJob.errorMessage = "This field is required";
          } else if (oldJob.oldPosition.length > 100) {
            valid = true;
            oldJob.errorMessage = "This field is max 100 characters";
          }
          if (!date.startDate && !date.endDate) {
            valid = true;
            date.errorMessage = "This field is required";
          } else if (startDate > endDate) {
            valid = true;
            date.errorMessage = "Start date must be less than end date";
          }
          for (let j = 1; j < Arr.length; j++) {
            let date2 = Arr[j].data.find(
              (f) => f.label === "Thời gian làm việc"
            );

            let nextStartDate = new Date(date2.startDate).getTime();
            if (i != j) {
              if (nextStartDate < endDate && nextStartDate > startDate) {
                valid = true;
                date2.errorMessage = `Inappropriate working hours.`;
              }
            }
          }
          if (!valid) {
            company.errorMessage = null;
            oldJob.errorMessage = null;
            date.errorMessage = null;
          }
        }
      }
      if (this.activePhase === 2) {
        if (!this.formValue.reason) {
          valid = true;
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  if (d.label === "Lý do muốn ứng tuyển vào công ty") {
                    d.errorMessage = "This field is required";
                  }
                })
              );
            }
          });
        } else if (this.formValue.reason.length > 1000) {
          valid = true;
          this.formInfos.forEach((form) => {
            if (this.activePhase + 1 === form.stt) {
              form.fields.forEach((item) =>
                item.data.forEach((d) => {
                  if (d.label === "Lý do muốn ứng tuyển vào công ty") {
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
                  if (d.label === "Mức lương mong muốn") {
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
                  if (d.label === "Mức lương mong muốn") {
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
                  d.errorMessage = null;
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
