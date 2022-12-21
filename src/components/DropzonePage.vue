<template>
  <div>
    <h2>Dropzone Page</h2>
    <Dropzone
      ref="ref"
      @uploadFiles="uploadFiles"
      :maxsize="maxSize"
      :maxFileLength="maxFileLength"
      :limitFiles="limitFiles"
      :title="title"
      :triggerText="triggerText"
    />
  </div>
</template>

<script>
import Dropzone from "./dropzone/DropZone.vue";
import app from "../configs/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import toBytes from "@/utils/convert";
import {
  MAX_SIZE_MB,
  FILES_LENGTH,
  LIMIT_FILES,
  MAX_FILES,
} from "@/constants/index";

export default {
  data() {
    return {
      maxSize: toBytes(MAX_SIZE_MB, "MB"),
      maxFilesUpload: MAX_FILES,
      maxFileLength: FILES_LENGTH,
      limitFiles: LIMIT_FILES,
      title: "Drag and Drop Files",
      triggerText: "Browse Files",
    };
  },
  components: { Dropzone },
  methods: {
    async uploadFiles(data) {
      try {
        for (let i = 0; i < data.length; i++) {
          let storage = getStorage(app);
          let storageRef = ref(storage, "filesList/" + data[i].name);
          await uploadBytes(storageRef, data[i]);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
