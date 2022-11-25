<template>
  <div>
    <h2>DropZone</h2>
    <div class="container">
      <div
        @dragenter.prevent="toggleActive"
        @dragleave.prevent="toggleActive"
        @dragover.prevent
        @drop.prevent="toggleActive"
        :class="{ 'active-drop': active }"
        class="drop-zone"
      >
        <font-awesome-icon icon="cloud-arrow-up" class="icon" />
        <p class="text">Drag and Drop Files</p>
        <label for="dropzoneFile" class="text-link">Browse Files</label>
      </div>
      <input class="dropzone-file" type="file" id="dropzoneFile" />
      <div>File:{{ dropzoneFile.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropzoneFile: "",
      active: false,
    };
  },
  methods: {
    toggleActive(e) {
      this.active = !this.active;
      console.log(e);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 100px;
  margin-left: 250px;
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
}
.text-link {
  margin-top: 10px;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
}
.icon {
  font-size: 30px;
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
</style>
