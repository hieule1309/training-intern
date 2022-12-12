<template>
  <div class="file-item">
    <img
      class="file-img"
      v-if="file.extType === FILE_TYPE.EXCEL"
      src="@/assets/excel.png"
    />
    <img
      class="file-img"
      v-if="file.extType === FILE_TYPE.DOC"
      src="@/assets/word.png"
    />
    <img
      class="file-img"
      v-if="file.extType === FILE_TYPE.PDF"
      src="@/assets/pdf.png"
    />
    <img
      class="file-img"
      v-if="file.extType === FILE_TYPE.UNKNOW"
      src="@/assets/000.png"
    />

    <div class="file-content">
      <p class="file-name">{{ file.name }}</p>
      <p class="file-size">{{ niceBytes(file.size) }}</p>
    </div>
    <font-awesome-icon class="close" icon="close" @click="onRemove" />
  </div>
</template>

<script>
import { FILE_TYPE } from "@/constants/index";
export default {
  data() {
    return { FILE_TYPE };
  },
  props: ["file"],
  methods: {
    niceBytes(x) {
      const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      let l = 0,
        n = parseInt(x, 10) || 0;
      while (n >= 1024 && ++l) {
        n = n / 1024;
      }
      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
    },
    onRemove(file) {
      this.$emit("onRemove", file);
    },
  },
};
</script>

<style lang="scss" scoped>
.file-item {
  display: flex;
  width: 244px;
  height: 48px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  position: relative;
  align-items: center;
  margin-left: 16px;
  margin-top: 8px;

  .file-img {
    width: 32px;
    height: 32px;
  }
  .file-content {
    margin-left: 4px;

    .file-name {
      color: #333333;
      font-size: 12px;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 170px;
    }
    .file-size {
      color: #666666;
      font-size: 10px;
      line-height: 14px;
    }
  }
  .close {
    position: absolute;
    right: 5px;
    cursor: pointer;
  }
}
.error {
  color: red;
}
</style>
