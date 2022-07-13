<template>
  <div class="select__form">
    <form class="sorting__line">
      <div class="sort__by__name">
        <label class="Sort">Price</label>
        <select
          name="SortBy"
          id="SortBy"
          class="SortBy"
          :value="price"
          @change="newPriceCategory($event)"
        >
          <option
            v-for="category in priceCategories"
            :key="category"
            :value="category"
            :selected="price === category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <div class="page__sorting">
        <label class="Sort">Sex</label>
        <select
          name="page"
          id="page"
          class="SortByNumber"
          :value="sex"
          @change="newSexCategory($event)"
        >
          <option
            v-for="category in sexCategories"
            :key="category"
            :value="category"
            :selected="sex === category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ["newSexCategory", "update:sex", "newPriceCategory", "update:price"],
  props: {
    sexCategories: {
      type: Array,
      default: () => [],
    },
    sex: {
      type: String,
      default: "",
    },
    priceCategories: {
      type: Array,
      default: () => [],
    },
    price: {
      type: String,
      default: "",
    },
  },
  methods: {
    newSexCategory(event) {
      this.$emit("update:sex", event.target.value);
      this.$emit("newSexCategory", event.target.value);
    },
    newPriceCategory(event) {
      this.$emit("update:price", event.target.value);
      this.$emit("newPriceCategory", event.target.value);
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
