<template>
  <div>
    <h2>DropZone</h2>
    <div class="container">
      <div
        @dragenter.prevent="OnDragEnter"
        @dragleave.prevent="OnDragLeave"
        @dragover.prevent
        @drop.prevent="OnDrop"
        :class="{ 'active-drop': active, 'drop-error': error }"
        class="drop-zone"
      >
        <font-awesome-icon icon="cloud-arrow-up" class="icon" />
        <p class="text">Drag and Drop Files</p>
        <label for="dropzoneFile" class="text-link">Browse Files</label>
      </div>
      <input
        class="dropzone-file"
        type="file"
        @change="onInputChange"
        id="dropzoneFile"
      />
      <div v-if="error" class="text-error">The maximum file size is 10MB</div>
      <div class="files-group">
        <FileItem
          v-for="(file, index) in this.filesList"
          :key="index"
          :file="file"
          @onRemove="onRemove(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FileItem from "./dropzone/FileItem.vue";

export default {
  data() {
    return {
      dropzoneFile: "",
      active: false,
      filesList: [],
      error: false,
    };
  },
  components: { FileItem },
  methods: {
    OnDragEnter(e) {
      e.preventDefault();
      this.active = true;
    },
    OnDragLeave(e) {
      e.preventDefault();
      this.active = false;
    },
    OnDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.active = false;
      const files = e.dataTransfer.files;
      Array.from(files).forEach((file) => {
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
      console.log(this.filesList);
    },
    onInputChange(e) {
      console.log(e);
    },
    onRemove(index) {
      this.filesList.splice(index, 1);
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
</style>
