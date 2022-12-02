<template>
  <div>
    <h1>Autocomplete</h1>
    <Autocomplete
      :cities="loadProvinces"
      :citiSelected="loadProviSelected"
      :place="'Search province'"
      @selectedItem="selectedItem"
      @deletedItem="deletedItem"
    />
  </div>
</template>

<script>
import Autocomplete from "./autocompleted/Autocomplete.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: { Autocomplete },
  async created() {
    await this.$store.dispatch("autocompleteModule/getProvinces");
  },
  methods: {
    ...mapActions("autocompleteModule", [
      "getProvinces",
      "selectedItem",
      "deletedItem",
    ]),
  },
  computed: {
    ...mapGetters("autocompleteModule", ["loadProvinces", "loadProviSelected"]),
  },
};
</script>

<style lang="scss" scoped></style>
