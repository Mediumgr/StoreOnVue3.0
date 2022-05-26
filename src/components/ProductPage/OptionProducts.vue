<template>
  <div class="product__menu">
    <div class="trending">
      <div class="trending__now">trending now</div>
      <div class="name__product__first__row">
        <div class="bohemian">Bohemian</div>
        <div class="divider"></div>
        <div class="floral">Floral</div>
        <div class="divider"></div>
        <div class="lace">Lace</div>
      </div>
      <div class="name__product__second__row">
        <div class="floral__second__row">Floral</div>
        <div class="divider"></div>
        <div class="lace__second__row">Lace</div>
        <div class="divider"></div>
        <div class="bohemian__second__row">Bohemian</div>
      </div>
    </div>
    <div class="checkbox__block">
      <div class="check__size">size</div>
      <div class="checkbox__style__one">
        <div class="checkbox__XXS">
          <input type="checkbox" class="checkbox" id="xxs" />
          <label for="xxs" class="your__size">XXS</label>
        </div>
        <div class="checkbox__XS">
          <input type="checkbox" class="checkbox" id="xs" />
          <label for="xs" class="your__size">XS</label>
        </div>
        <div class="checkbox__S">
          <input type="checkbox" class="checkbox" id="s" />
          <label for="s" class="your__size">S</label>
        </div>
        <div class="checkbx__M">
          <input type="checkbox" class="checkbox" id="m" />
          <label for="m" class="your__size">M</label>
        </div>
      </div>
      <div class="checkbox__style__two">
        <div class="checkbox__L">
          <input type="checkbox" class="checkbox" id="l" />
          <label for="l" class="your__size">L</label>
        </div>
        <div class="checkbox__XL">
          <input type="checkbox" class="checkbox" id="xl" />
          <label for="xl" class="your__size">XL</label>
        </div>
        <div class="checkbox__XXL">
          <input type="checkbox" class="checkbox" id="xxl" />
          <label for="xxl" class="your__size">XXL</label>
        </div>
      </div>
    </div>
    <div class="price__product">
      <div class="price__data">price</div>
      <div class="scroll__price">
        <Slider
          v-model="value"
          :min="0"
          :max="450"
          :step="5"
          :tooltipPosition="'bottom'"
          :format="(v) => `$${Math.round(v)}`"
        />
      </div>
      <div class="limited__price">
        <div class="common__limit">$0</div>
        <div class="common__limit">$450</div>
      </div>
    </div>
  </div>
  <div class="select__form">
    <form class="sorting__line">
      <div class="sort__by__name">
        <sort-by
          label="Sort By"
          :options="categories"
          v-model="categories[0]"
          name="SortBy"
          id="SortBy"
          class="SortBy"
        ></sort-by>
      </div>
      <div class="page__sorting">
        <show-sex
          name="page"
          id="page"
          class="SortByNumber"
          :options="sex"
          label="Show"
          v-model="sex[0]"
        ></show-sex>
      </div>
    </form>
  </div>
</template>

<script>
import Slider from "@vueform/slider";
import SortBy from "@/components/ProductPage/SortBy.vue";
import ShowSex from "@/components/ProductPage/ShowSex.vue";

export default {
  components: {
    Slider,
    SortBy,
    ShowSex,
  },
  data() {
    return {
      numbers: ["09", "08", "07", "06", "05"],
      value: [0, 80],
      categories: ["Name", "Price"],
      sex: ["Men", "Women"],
    };
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
