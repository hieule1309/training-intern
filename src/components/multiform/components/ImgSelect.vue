<template>
  <div>
    <p class="title">{{ this.label }}</p>
    <DropZone
      @uploadFiles="uploadFiles"
      :maxFileLength="maxFileLength"
      :limitFiles="limitFiles"
      :title="title"
      :triggerText="triggerText"
    />
  </div>
</template>

<script>
import DropZone from "@/components/dropzone/DropZone.vue";
export default {
  data() {
    return {
      maxFileLength: 2,
      img: "",
      limitFiles: ["png", "jpg", "jpeg"],
      title: "Hãy kéo và thả ảnh vào đây hoặc",
      triggerText: "nhấn vào đây",
    };
  },
  props: ["label"],
  components: { DropZone },
  methods: {
    uploadFiles(data) {
      this.img = data[0].name;
      this.$emit("updateImg", this.img);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  line-height: 20px;
  color: #333333;
}
</style>
