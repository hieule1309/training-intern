<template>
  <div>
    <div class="container">
      <div
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover.prevent
        @drop="onDrop"
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
          ref="file"
        />
      </div>

      <div v-if="errors" class="text-error">{{ this.messages }}</div>
      <div v-if="success" class="text-success">{{ this.messages }}</div>
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

import {
  getFileType,
  validateDuplicate,
  maxFilesUpload,
  limitFileType,
  filesMaxLength,
} from "@/utils/validate";
import { MAX_SIZE_MB } from "@/constants/index";

export default {
  data() {
    return {
      active: false,
      success: false,
      errors: false,
      filesList: [],
      messages: "",
    };
  },
  props: {
    maxsize: {
      type: Number,
      required: false,
    },
    maxFilesUpload: {
      type: Number,
      required: false,
    },
    maxFileLength: {
      type: Number,
      required: false,
    },
    limitFiles: {
      type: Array,
      required: false,
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
      this.$refs.file.files = e.dataTransfer.files;
      this.onInputChange();
    },
    onInputChange() {
      const uploadFiles = [...this.$refs.file.files];
      // if (
      //   this.maxFilesUpload &&
      //   maxFilesUpload(uploadFiles, this.maxFilesUpload)
      // ) {
      //   uploadFiles.forEach((file) => {
      //     if (validateDuplicate(file, this.filesList)) {
      //       this.errors = true;
      //       this.messages = "File is already existed";
      //     } else if (this.maxsize && file.size > this.maxsize) {
      //       this.errors = true;
      //       this.messages = `The maximum file size is ${MAX_SIZE_MB}MB`;
      //     } else if (
      //       this.limitFiles &&
      //       !limitFileType(file.name, this.limitFiles)
      //     ) {
      //       this.errors = true;
      //       this.messages = "File type is not allowed to upload";
      //     } else if (
      //       this.maxFileLength &&
      //       !filesMaxLength(this.filesList, this.maxFileLength)
      //     ) {
      //       this.errors = true;
      //       this.messages = `You can only upload maximum ${this.maxFileLength} files`;
      //     } else {
      //       this.messages = "";
      //       this.errors = false;
      //       this.filesList.push(file);
      //       Array.from(this.filesList).forEach((file) => {
      //         file.extType = getFileType(file.name);
      //       });
      //     }
      //   });
      // } else {
      //   this.errors = true;
      //   this.messages = `You can only selected maximum ${this.maxFilesUpload} files`;
      // }
      uploadFiles.forEach((file) => {
        if (validateDuplicate(file, this.filesList)) {
          this.errors = true;
          this.messages = "File is already existed";
        } else if (this.maxsize && file.size > this.maxsize) {
          this.errors = true;
          this.messages = `The maximum file size is ${MAX_SIZE_MB}MB`;
        } else if (
          this.limitFiles &&
          !limitFileType(file.name, this.limitFiles)
        ) {
          this.errors = true;
          this.messages = "File type is not allowed to upload";
        } else if (
          this.maxFileLength &&
          !filesMaxLength(this.filesList, this.maxFileLength)
        ) {
          this.errors = true;
          this.messages = `You can only upload maximum ${this.maxFileLength} files`;
        } else if (
          this.maxFilesUpload &&
          !maxFilesUpload(uploadFiles, this.maxFilesUpload)
        ) {
          this.messages = `You can only selected maximum ${this.maxFilesUpload} files`;
          this.errors = true;
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
      this.errors = false;
      this.filesList.splice(index, 1);
    },
    uploadFiles() {
      this.$emit("uploadFiles", this.filesList);
      this.filesList = [];
      this.errors = false;
      this.success = true;
      this.messages = "Success to upload";
    },
  },
};
</script>

<style scoped lang="scss">
.container {
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
.text-success {
  color: rgb(11, 177, 11);
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
