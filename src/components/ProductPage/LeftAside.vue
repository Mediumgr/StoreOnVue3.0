<template>
  <nav class="category__menu">
    <details>
      <summary class="category" @click="currentSummaryOne">
        Category<i
          class="fas fa-caret-down category__arrow"
          v-if="showList"
        ></i>
        <i class="fas fa-caret-up category__arrow" v-else></i>
      </summary>
      <template v-if="showList">
        <transition-group
          appear
          tag="ul"
          @before-enter="beforeEnter"
          @enter="enter"
          :css="false"
        >
          <li
            class="category__link"
            v-for="(category, index) in categoryList"
            :data-index="index"
            :key="category"
            @click="filterCategory(category, index)"
            :class="{ active: categoryActive === index }"
          >
            {{ category }}
          </li>
        </transition-group>
      </template>
    </details>
    <details>
      <summary class="brand__details" @click="currentSummaryTwo">
        brand<i class="fas fa-caret-down brand__arrow" v-if="showBrand"></i>
        <i class="fas fa-caret-up brand__arrow" v-else></i>
      </summary>
      <template v-if="showBrand">
        <transition-group
          appear
          tag="ul"
          @before-enter="beforeEnter"
          @enter="enter"
          :css="false"
        >
          <li
            class="category__link"
            :data-index="index"
            v-for="(name, index) in categoryBrand"
            :key="name"
            @click="filterCategoryBrand(name, index)"
            :class="{ active: categoryBrandActive === index }"
          >
            {{ name }}
          </li>
        </transition-group>
      </template>
    </details>
    <details>
      <summary class="designer__details" @click="currentSummaryThree">
        designer<i
          class="fas fa-caret-down designer__arrow"
          v-if="showMoschino"
        ></i>
        <i class="fas fa-caret-up designer__arrow" v-else></i>
      </summary>
      <template v-if="showMoschino">
        <transition-group
          appear
          tag="ul"
          @before-enter="beforeEnter"
          @enter="enter"
          :css="false"
        >
          <li
            class="category__link"
            :data-index="index"
            v-for="(designer, index) in MoschinoArray"
            :key="designer"
            @click="filterCategoryMochino(designer, index)"
            :class="{ active: categoryMochino === index }"
          >
            {{ designer }}
          </li>
        </transition-group>
      </template>
    </details>
  </nav>
</template>

<script>
import Velocity from "velocity-animate";

export default {
  emits: ["categoryFilter", "categoryBrand", "categoryMochino"],
  data() {
    return {
      categoryList: [
        "T-shirt",
        "Blouse",
        "Jacket",
        "Blazer",
        "Pants",
        "Shorts",
        "Jumper",
        "Poloneck",
        "Coat",
        "Dress",
        "Jeans",
        "Pajamas",
      ],
      categoryBrand: ["Leggins", "Dress", "Pants"],
      numbers: ["09", "08", "07", "06", "05"],
      MoschinoArray: ["Moschino", "All Products"],
      categoryActive: null,
      categoryBrandActive: null,
      categoryMochino: null,
      showList: false,
      showBrand: false,
      showMoschino: false,
    };
  },
  methods: {
    currentSummaryOne() {
      this.showList === true ? (this.showList = false) : (this.showList = true);
    },
    currentSummaryTwo() {
      this.showBrand === true
        ? (this.showBrand = false)
        : (this.showBrand = true);
    },
    currentSummaryThree() {
      this.showMoschino === true
        ? (this.showMoschino = false)
        : (this.showMoschino = true);
    },
    filterCategory(category, index) {
      this.categoryBrandActive = this.categoryMochino = null;
      let categoryName = this.products.filter((item) => item.name === category);
      this.$emit("categoryFilter", categoryName);
      this.categoryActive = index;
    },
    filterCategoryBrand(name, index) {
      this.categoryMochino = this.categoryActive = null;
      let categoryBrand = this.products.filter((item) => item.name === name);
      this.$emit("categoryBrand", categoryBrand);
      this.categoryBrandActive = index;
    },
    filterCategoryMochino(designer, index) {
      this.categoryActive = this.categoryBrandActive = null;
      this.categoryMochino = index;
      let mochino = this.slidersProducts.filter(
        (item) => item.name === designer
      );
      this.$emit("categoryMochino", mochino);
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter(el, done) {
      const index = el.dataset.index || 1;
      let delay = index * 70;
      setTimeout(() => {
        Velocity(
          el,
          { opacity: 1, height: "100%" },
          { duration: 500, complete: done }
        );
      }, delay);
    },
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
    slidersProducts() {
      return this.$store.getters.slidersProducts;
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  color: #f16d7f;
  background: #f3f3f3;
}
</style>
