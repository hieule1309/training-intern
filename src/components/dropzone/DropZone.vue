<template>
  <div>
    <div class="container">
      <div
        @dragenter.prevent="onDragEnter"
        @dragleave.prevent="onDragLeave"
        @dragover.prevent
        @drop.prevent="onDrop"
        :class="{ 'active-drop': active, 'drop-error': errors }"
        class="drop-zone"
      >
        <font-awesome-icon icon="cloud-arrow-up" class="icon" />
        <p class="text">Drag and Drop Files</p>
        <label for="dropzoneFile" class="text-link">Browse Files </label>
        <input
          class="dropzone-file"
          type="file"
          @change="onInputChange"
          id="dropzoneFile"
          multiple
        />
      </div>
      <!-- <input
        class="dropzone-file"
        type="file"
        @change="onInputChange"
        id="dropzoneFile"
      /> -->
      <div v-if="errors" class="text-error">{{ this.messages }}</div>
      <div class="files-group">
        <FileItem
          v-for="(file, index) in this.filesList"
          :key="index"
          :file="file"
          @onRemove="onRemove(index)"
        />
      </div>
      <button class="btn" @click="uploadFiles">Submit</button>
    </div>
  </div>
</template>

<script>
import FileItem from "./FileItem.vue";
// import { FILE_TYPE } from "@/constants/index";
import { getFileType, validateDuplicate } from "@/utils/validate";

export default {
  data() {
    return {
      dropzoneFile: "",
      active: false,
      // filesList: [],
      errors: false,
      filesList: [],
      messages: "",
    };
  },
  props: {
    maxsize: {
      type: Number,
    },
  },
  components: { FileItem },
  methods: {
    onDragEnter(e) {
      e.preventDefault();
      this.active = true;
    },
    onDragLeave(e) {
      e.preventDefault();
      this.active = false;
    },
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.active = false;
      Array.from(e.dataTransfer.files).forEach((file) => {
        if (validateDuplicate(file, this.filesList)) {
          this.errors = true;
          this.messages = "File is already existed";
        } else if (file.size > this.maxsize) {
          this.errors = true;
          this.messages = "The maximum file size is 10MB";
        } else {
          this.messages = "";
          this.errors = false;
          this.filesList.push(file);
          Array.from(this.filesList).forEach((file) => {
            file.extType = getFileType(file.name);
          });
        }
      });
    },
    onInputChange(e) {
      Array.from(e.target.files).forEach((file) => {
        if (validateDuplicate(file, this.filesList)) {
          this.errors = true;
          this.messages = "File is already existed";
        } else if (file.size > this.maxsize) {
          this.errors = true;
          this.messages = "The maximum file size is 10MB";
        } else {
          this.messages = "";
          this.errors = false;
          this.filesList.push(file);
          Array.from(this.filesList).forEach((file) => {
            file.extType = getFileType(file.name);
          });
        }
      });
    },
    onRemove(index) {
      this.filesList.splice(index, 1);
    },
    uploadFiles() {
      this.$emit("uploadFiles", this.filesList);
      this.filesList = [];
      this.errors = false;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 100px;
  margin-left: 250px;
  .drop-error {
    border: 1px solid red;
  }
}
.drop-zone {
  background: #f8f8f8;
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  width: 842px;
  height: 232px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.text {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  line-height: 22px;
}
.text-link {
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
  line-height: 22px;
}
.icon {
  font-size: 32px;
  color: #b4c8df;
}
.dropzone-file {
  display: none;
}
.active-drop {
  color: #fff;
  border-color: rgb(104, 240, 240);
  background-color: rgb(187, 250, 185);
  label {
    color: #fff;
  }
}
.text-error {
  color: red;
}
.files-group {
  margin-top: 16px;
  display: flex;
  margin-left: -16px;
  flex-wrap: wrap;
  width: 842px;
}
.btn {
  background-color: rgb(10, 196, 10);
  border: none;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  margin-top: 4px;
  cursor: pointer;
}
</style>
