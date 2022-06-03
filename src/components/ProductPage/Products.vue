<template>
  <div
    class="content__product center"
    v-if="filtered.length && loading === false"
  >
    <left-aside></left-aside>
    <div class="product__menu">
      <trending-component></trending-component>
      <div class="checkbox__block">
        <div class="check__size">size</div>
        <div class="checkbox__style__one">
          <base-checkbox
            v-model="checkOne[index]"
            v-for="(label, index) in labelsOne"
            :key="label"
            :label="label"
            class="checkbox"
            @filterOnSizes="filterOnSizes"
          ></base-checkbox>
        </div>
        <div class="checkbox__style__two">
          <base-checkbox
            v-model="checkTwo[index]"
            v-for="(label, index) in labelsTwo"
            :key="label"
            :label="label"
            :class="['checkbox', 'checkbox_' + label]"
            @filterOnSizes="filterOnSizes"
          ></base-checkbox>
        </div>
      </div>
      <div class="price__product">
        <div class="price__data">price</div>
        <div class="scroll__price">
          <slider
            v-model.lazy="value"
            :min="lowPrice"
            :max="highPrice"
            :step="5"
            :tooltipPosition="'bottom'"
            :format="(v) => `$${Math.round(v)}`"
            @change="sliderChanged()"
          />
        </div>
        <div class="limited__price">
          <div class="common__limit">${{ lowPrice }}</div>
          <div class="common__limit">${{ highPrice }}</div>
        </div>
      </div>
    </div>
    <option-products
      v-model:sex="categorySex"
      :sexCategories="categoriesForSex"
      @newSexCategory="newSexCategory"
      v-model:price="categoryPrice"
      :priceCategories="categoriesForPrice"
      @newPriceCategory="newPriceCategory"
    ></option-products>
    <router-link :to="{ name: 'SinglePage' }">
      <div class="our-offer" :style="styles" v-if="screenWidth < 1481">
        <i class="fa-solid fa-circle-chevron-left fa-xl"></i>
        <button class="raise">OFFER</button>
      </div>
    </router-link>
    <router-link :to="{ name: 'SinglePage' }">
      <div class="our-offer" :style="styles" v-if="screenWidth >= 1481">
        <button class="raise">Offer</button>
        <i class="fa-solid fa-circle-chevron-right fa-xl"></i>
      </div>
    </router-link>
    <div class="block__of__product" v-if="!sliderProducts.length">
      <product-items
        v-for="item of felteredProducts"
        :key="item.id"
        :product="item"
      ></product-items>
    </div>
    <div class="block__of__product" v-if="sliderProducts.length">
      <product-items
        v-for="item of sliderProducts"
        :key="item.id"
        :product="item"
      ></product-items>
    </div>
    <div class="viewAllBlock" v-show="filtered.length !== productsLength">
      <button
        :style="styleButton"
        class="view__all__button"
        @click.once="viewAllProducts"
      >
        View All
      </button>
    </div>
  </div>
  <div class="content__product center" v-if="loading === true">
    <left-aside></left-aside>
    <option-products></option-products>
    <div class="block__of__spinner">
      <i class="fa-solid fa-spinner fa-spin fa-2xl"></i>
    </div>
  </div>
  <div class="content__product center" v-if="!filtered.length">
    <left-aside></left-aside>
    <option-products></option-products>
    <div class="block__of__product">
      <div class="noConcatProducts center">
        {{ error }}
      </div>
    </div>
  </div>
  <information-center></information-center>
</template>

<script>
import ProductItems from "@/components/HomePage/ProductItems.vue";
import LeftAside from "@/components/ProductPage/LeftAside.vue";
import OptionProducts from "@/components/ProductPage/OptionProducts.vue";
import BaseCheckbox from "@/components/ProductPage/BaseCheckbox.vue";
import TrendingComponent from "@/components/ProductPage/TrendingComponent.vue";
import InformationCenter from "@/components/ProductPage/InformationCenter.vue";
import Slider from "@vueform/slider";
import NProgress from "nprogress";
import { mapGetters } from "vuex";

export default {
  name: "ProductPage",
  components: {
    ProductItems,
    LeftAside,
    TrendingComponent,
    OptionProducts,
    InformationCenter,
    BaseCheckbox,
    Slider,
  },
  data() {
    return {
      error:
        "The products you are looking for were not found. Enter the name of the product.",
      styleButton: {
        display: "block",
      },
      top: null,
      screenWidth: null,
      productsLength: 18, // length of all existed products in db.json (products + extraProducts)
      categoriesForSex: ["All", "men", "women"],
      categorySex: "All",
      categoriesForPrice: ["choose", "on increase", "on decrease"],
      categoryPrice: "choose",
      filteredCategory: [],
      value: [0, 200],
      lowPrice: 0,
      highPrice: 250,
      checkOne: [],
      labelsOne: ["XXS", "XS", "S", "M"],
      checkTwo: [],
      labelsTwo: ["L", "XL", "XXL"],
      productsIdArray: [],
      sliderProducts: [],
    };
  },
  methods: {
    viewAllProducts() {
      NProgress.start();
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("getProducts")
        .then(() => {
          return this.$store.dispatch("getExtraProducts");
        })
        .then(() => {
          window.scrollTo({
            top: 1200,
            behavior: "smooth",
          });
        })
        .catch((error) => {
          this.$router.push({
            name: "ErrorDisplay",
            params: { error: error },
          });
        })
        .finally(() => {
          NProgress.done();
          this.$store.commit("setLoading", false);
        });
    },
    newSexCategory(category) {
      NProgress.start();
      this.$store.commit("setLoading", true);
      this.filteredCategory = [];
      this.$store
        .dispatch("getProducts")
        .then(() => {
          return this.$store.dispatch("getExtraProducts");
        })
        .then(() => {
          if (
            (category !== "All" || category === "All") &&
            this.productsIdArray.length === 0
          ) {
            this.filtered.map((product) => {
              if (product.sex === category) {
                this.filteredCategory.push(product);
              }
            });
          }
          if (category !== "All" && this.productsIdArray.length !== 0) {
            this.productsIdArray.forEach((itemName) => {
              this.filtered.map((product) => {
                if (
                  product.size.indexOf(itemName) !== -1 &&
                  product.sex === category
                ) {
                  this.filteredCategory.push(product);
                }
              });
            });
          }
          if (category === "All" && this.productsIdArray.length !== 0) {
            this.productsIdArray.forEach((itemName) => {
              this.filtered.map((product) => {
                if (product.size.indexOf(itemName) !== -1) {
                  this.filteredCategory.push(product);
                }
              });
            });
          }
          this.filteredCategory = Array.from(new Set(this.filteredCategory));
          this.categoryPrice = "choose";
        })
        .finally(() => {
          NProgress.done();
          this.$store.commit("setLoading", false);
        });
    },
    newPriceCategory(emittedValue) {
      NProgress.start();
      this.$store.commit("setLoading", true);
      this.$store
        .dispatch("getProducts")
        .then(() => {
          return this.$store.dispatch("getExtraProducts");
        })
        .then(() => {
          if (emittedValue === "on increase") {
            if (this.filteredCategory.length) {
              this.filteredCategory.sort((productA, productB) => {
                return productA.price > productB.price ? 1 : -1;
              });
            } else {
              this.filtered.sort((productA, productB) => {
                return productA.price > productB.price ? 1 : -1;
              });
            }
          }
          if (emittedValue === "on decrease") {
            if (this.filteredCategory.length) {
              this.filteredCategory.sort((productA, productB) => {
                return productA.price < productB.price ? 1 : -1;
              });
            } else {
              this.filtered.sort((productA, productB) => {
                return productA.price < productB.price ? 1 : -1;
              });
            }
          }
        })
        .finally(() => {
          NProgress.done();
          this.$store.commit("setLoading", false);
        });
    },
    filterOnSizes(productId) {
      NProgress.start();
      this.$store.commit("setLoading", true);
      this.productsIdArray.push(productId);
      this.productsIdArray = Array.from(new Set(this.productsIdArray));
      this.checkOne.forEach((booleanItem, index) => {
        if (
          booleanItem === false &&
          this.productsIdArray.includes(this.labelsOne[index])
        ) {
          this.productsIdArray.splice(
            this.productsIdArray.indexOf(this.labelsOne[index]),
            1
          );
        }
      });
      this.checkTwo.forEach((booleanItem, index) => {
        if (
          booleanItem === false &&
          this.productsIdArray.includes(this.labelsTwo[index])
        ) {
          this.productsIdArray.splice(
            this.productsIdArray.indexOf(this.labelsTwo[index]),
            1
          );
        }
      });
      this.filteredCategory = [];
      this.$store
        .dispatch("getProducts")
        .then(() => {
          return this.$store.dispatch("getExtraProducts");
        })
        .then(() => {
          if (this.categorySex === "All") {
            this.productsIdArray.forEach((itemName) => {
              this.filtered.map((product) => {
                if (product.size.indexOf(itemName) !== -1) {
                  this.filteredCategory.push(product);
                }
              });
            });
          }
          if (this.categorySex !== "All" && this.productsIdArray.length !== 0) {
            this.productsIdArray.forEach((itemName) => {
              this.filtered.map((product) => {
                if (
                  product.size.indexOf(itemName) !== -1 &&
                  product.sex === this.categorySex
                ) {
                  this.filteredCategory.push(product);
                }
              });
            });
          }
          if (this.categorySex !== "All" && this.productsIdArray.length === 0) {
            this.filtered.map((product) => {
              if (product.sex === this.categorySex) {
                this.filteredCategory.push(product);
              }
            });
          }
          this.filteredCategory = Array.from(new Set(this.filteredCategory));
        })
        .finally(() => {
          NProgress.done();
          this.$store.commit("setLoading", false);
        });
    },
    sliderChanged() {
      setTimeout(() => {
        this.sliderProducts = [];
        this.felteredProducts.filter((product) => {
          if (
            product.price >= this.value[0] &&
            product.price <= this.value[1]
          ) {
            this.sliderProducts.push(product);
          }
        });
      }, 0);
    },
  },
  created() {
    NProgress.start();
    this.$store.commit("setLoading", true);
    this.$store
      .dispatch("getProducts")
      .catch((error) => {
        this.$router.push({ name: "ErrorDisplay", params: { error: error } });
      })
      .finally(() => {
        this.$store.commit("setLoading", false);
        NProgress.done();
      });
  },
  computed: {
    ...mapGetters(["loading", "filtered"]),
    styles() {
      return {
        top: `${this.top - 5}px`,
      };
    },
    felteredProducts() {
      if (this.filteredCategory.length) {
        return this.filteredCategory;
      } else {
        return this.filtered;
      }
    },
  },
  mounted() {
    this.top = document.documentElement.clientHeight / 2;
    this.screenWidth = document.documentElement.clientWidth;
  },
};
</script>

<style lang="scss" scoped>
.active {
  background: rgb(230, 2, 199);
}

.block__of__spinner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 150px 0 50px 294px;
  align-items: center;
}

.fa-spinner {
  margin: 0 auto;
}

.raise {
  background: none;
  outline: none;
  overflow: hidden;
  border: none;
  color: #f16d7f;
  font: inherit;
  padding: 0.5em 0.5em;
  cursor: pointer;
}

.our-offer {
  position: fixed;
  cursor: pointer;
  color: #f16d7f;
  transition: 0.8s;
}

@media (max-width: 1480px) {
  .our-offer {
    left: 300px;
    &:hover,
    &:focus {
      transform: translateX(-0.3em);
      color: #83ee7d;
    }
  }
}

@media (min-width: 1481px) {
  .our-offer {
    right: 85px;
    &:hover,
    &:focus {
      transform: translateX(0.3em);
      color: #83ee7d;
    }
  }
}
</style>
