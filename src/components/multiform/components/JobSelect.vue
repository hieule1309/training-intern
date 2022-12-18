<template>
  <div>
    <p class="title">{{ this.label }}</p>
    <p class="sub-title">{{ this.subTitle }}</p>
    <div class="box-select">
      <Autocomplete
        :items="this.position"
        :itemSelected="this.positionSelected"
        @selectedItem="selectedItem"
        @deletedItem="deletedItem"
        placeholder="Choose your position"
      />
    </div>
  </div>
</template>

<script>
import Autocomplete from "@/components/autocompleted/Autocomplete.vue";
export default {
  data() {
    return {
      position: [
        { name: "FE Developer" },
        { name: "BE Developer" },
        { name: "Software Engineer" },
        { name: "AI Engineer" },
        { name: "Embedded Software" },
      ],
      positionSelected: [],
    };
  },
  props: ["label", "subTitle"],
  components: { Autocomplete },
  methods: {
    selectedItem(data) {
      this.positionSelected.push(data);
      const idx = this.position.findIndex((p) => p.name == data.name);
      this.position.splice(idx, 1);
      this.$emit("updateJob", this.positionSelected);
    },
    deletedItem(data) {
      this.positionSelected.splice(data.idx, 1);
      this.position.push(data.item);
      this.$emit("updateJob", this.positionSelected);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  line-height: 20px;
}
.box-select {
  width: 528px;
}
.sub-title {
  font-size: 12px;
  line-height: 20px;
  color: #666666;
  margin-left: 4px;
}
</style>
