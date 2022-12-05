<template>
  <div>
    <h2>Dropzone Page</h2>
    <Dropzone ref="ref" @uploadFiles="uploadFiles" :maxsize="maxSize" />
  </div>
</template>

<script>
import Dropzone from "./dropzone/DropZone.vue";
import app from "../configs/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default {
  data() {
    return {
      maxSize: 10485760,
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
