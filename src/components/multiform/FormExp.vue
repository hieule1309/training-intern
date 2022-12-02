<template>
  <div class="container">
    <WorkExp v-for="key in count" :key="key" @remove="remove" />
    <div class="add-company">
      <img class="plus" src="@/assets/Plus.png" />
      <span class="text" @click="add">Thêm công ty</span>
    </div>
  </div>
</template>

<script>
import WorkExp from "./WorkExp.vue";
export default {
  data() {
    return {
      count: 1,
    };
  },
  components: { WorkExp },
  methods: {
    add() {
      this.count++;
    },
    remove() {
      this.count--;
    },
  },
};
</script>

<style lang="scss" scoped>
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
