<template>
  <div>
    <h1>Autocomplete</h1>
    <Autocomplete
      :cities="provinces"
      :citiSelected="proviSelected"
      :place="'Search province'"
      @selectedItem="selectedItem"
      @deletedItem="deletedItem"
    />
  </div>
</template>

<script>
import Autocomplete from "./Autocompleted/Autocomplete.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: { Autocomplete },
  created() {
    this.$store.dispatch("autocompleteModule/getProvinces");
  },
  methods: {
    ...mapActions("autocompleteModule", [
      "getProvinces",
      "selectedItem",
      "deletedItem",
    ]),
  },
  computed: {
    ...mapGetters("autocompleteModule", ["provinces", "proviSelected"]),
  },
};
</script>

<style lang="scss" scoped></style>
