<template>
  <div>
    <h2>Dropzone Page</h2>
    <Dropzone
      ref="ref"
      :errors="error"
      @onDrop="onDrop"
      :files="filesList"
      @uploadFiles="uploadFiles"
      @onRemove="onRemove"
    />
  </div>
</template>

<script>
import Dropzone from "./dropzone/DropZone.vue";
import app from "../configs/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
export default {
  data() {
    return {
      filesList: [],
      error: false,
    };
  },
  components: { Dropzone },
  methods: {
    onDrop(data) {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   this.active = false;
      //   const files = e.dataTransfer.files;
      Array.from(data).forEach((file) => {
        if (file.size > 10000000) {
          this.error = true;
        } else {
          this.error = false;
          this.filesList.push(file);
          Array.from(this.filesList).forEach((file) => {
            if (
              file.type === "application/vnd.ms-excel" ||
              file.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ) {
              file.extType = 1;
            } else if (
              file.type === "application/msword" ||
              file.type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ) {
              file.extType = 2;
            } else if (file.type === "application/pdf") {
              file.extType = 3;
            } else {
              file.extType = 4;
            }
          });
        }
      });
    },
    onRemove(index) {
      this.filesList.splice(index, 1);
    },
    async uploadFiles() {
      try {
        await this.filesList.forEach((file) => {
          const storage = getStorage(app);
          const storageRef = ref(storage, "filesList/" + file.name);
          uploadBytes(storageRef, file).then((snapshot) => {
            console.log("uploaded", snapshot);
          });
        });
        setTimeout((this.filesList = []), 3000);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
