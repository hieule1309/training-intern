<template>
  <div>
    <div class="valid-groups">
      <span class="must">Must</span>
      <label class="text" for="name">{{ this.title }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
  },
};
</script>

<style lang="scss" scoped>
.valid-groups {
  margin-bottom: 2px;
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
  font-size: 12px;
  line-height: 20px;
  font-weight: 600;
}
.text {
  font-size: 14px;
  line-height: 20px;
  margin-left: 8px;
  color: #333333;
}
</style>
