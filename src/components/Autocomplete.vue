<template>
  <div class="autocomplete">
    <div class="popover">
      <div class="search-bar">
        <button class="search-icon">
          <font-awesome-icon icon="search" />
        </button>
        <p
          v-for="(province, index) in proviSelected"
          :key="index"
          class="selected-item"
          @click="deleteItem(province, index)"
        >
          {{ province.name }}<font-awesome-icon class="close" icon="close" />
        </p>
        <input type="text" v-model="searchQuery" placeholder="Typing" />
      </div>
      <div class="option">
        <ul>
          <li
            @click="itemClicked(province, index)"
            v-for="(province, index) in matches"
            :key="index"
          >
            {{ province.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { v4 as idv4 } from "uuid";

export default {
  data() {
    return {
      searchQuery: "",

      provinces: [],
      selectedItem: null,
      selected: 0,
      proviSelected: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("https://provinces.open-api.vn/api/p/");
      this.provinces = response.data;
    } catch {
      console.log("error");
    }
  },
  methods: {
    itemClicked(province, index) {
      this.selected = index;
      this.selectItem(province);
    },
    selectItem(province) {
      this.selectedItem = province;

      this.proviSelected.push(province);
      const idx = this.provinces.findIndex((p) => p.name == province.name);
      this.provinces.splice(idx, 1);
      this.searchQuery = "";
    },
    deleteItem(province, index) {
      this.proviSelected.splice(index, 1);
      this.provinces.push(province);
    },
  },
  computed: {
    matches() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return [];
      }
      return this.provinces.filter((province) => {
        return Object.values(province).some((word) =>
          String(word).toLowerCase().includes(query)
        );
      });
    },
  },
};
</script>

<style scoped>
.autocomplete {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  height: 48px;
}
.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  gap: 4px;

  width: 100%;
  /* height: 48px; */

  background: rgba(230, 249, 255, 0.2);
  /* Black / 04 */

  border: 1px solid #dbdbdb;
  border-radius: 4px;
  flex-wrap: wrap;
}
.search-bar:focus-within {
  border: 1px solid #1991d2;
}
.close {
  font-size: 14px;
  cursor: pointer;
  margin-left: 8px;
}

.search-icon {
  width: 24px;
  height: 24px;
  color: #333;
  border: none;
  background-color: transparent;
  font-size: 20px;
  text-align: center;
}
.selected-item {
  margin: 2px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  justify-content: space-between;
  /* min-width: 150px; */
  height: 32px;

  background: #f0f4f8;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}

.popover {
  min-height: 50px;
  border-radius: 3px;
  position: absolute;
  top: 46px;
  left: 0;
  right: 0;
  background-color: #fff;
  text-align: center;
}
.popover input {
  font-size: 16px;
  border: none;
  padding: 8px;
}
.option {
  max-height: 150px;
  overflow-y: scroll;
  margin-top: 5px;
  background-color: #f1f5f8;
  filter: drop-shadow(0px 1px 8px rgba(102, 102, 102, 0.25));
  border-radius: 4px;
}
ul {
  list-style: none;
  text-align: left;
  padding-left: 0;
}
li {
  padding: 10px;
  background-color: #f1f1f1;
  cursor: pointer;
}
.option ul li.selected {
  background-color: rgb(130, 255, 113);
  color: #fff;
}
.option ul li:hover {
  background-color: #617d98;
}
</style>
