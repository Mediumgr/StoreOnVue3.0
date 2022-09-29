<template>
  <div
    class="content__product center"
    v-if="products.length && loading === false"
  >
    <left-aside
      @categoryFilter="categoryFilter"
      @categoryBrand="categoryBrand"
      @categoryMochino="categoryMochino"
    ></left-aside>
    <div class="product__menu">
      <trending-component></trending-component>
      <div class="checkbox__block">
        <div class="check__size">size</div>
        <div class="checkbox__style__one">
          <base-checkbox
            v-model="check[index]"
            v-for="(label, index) in labels"
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
      @newPriceCategory="filterPrice"
    ></option-products>
    <router-link :to="{ name: 'SinglePage' }">
      <div class="our-offer" :style="styles" v-if="screenWidth < 1481">
        <i class="fa-solid fa-circle-chevron-left fa-xl"></i>
        <button class="raise">OFFER</button>
      </div>
    </router-link>
    <router-link :to="{ name: 'SinglePage' }">
      <div class="our-offer" :style="styles" v-if="screenWidth >= 1481">
        <button class="raise">OFFER</button>
        <i class="fa-solid fa-circle-chevron-right fa-xl"></i>
      </div>
    </router-link>
    <transition-group
      appear
      tag="div"
      @before-enter="beforeEnter"
      @enter="enter"
      :css="false"
      class="block__of__product"
      v-if="message === '' && userInput === ''"
    >
      <product-items
        :data-index="index"
        v-for="(item, index) of felteredProducts"
        :key="item.id"
        :product="item"
      ></product-items>
    </transition-group>
    <div v-if="message !== ''" class="block__of__product">
      <div class="noSuchSizes">{{ message }}</div>
    </div>
    <transition-group
      appear
      tag="div"
      @before-enter="beforeEnter"
      @enter="enter"
      :css="false"
      class="block__of__product"
      v-if="userInput !== ''"
    >
      <product-items
        v-for="(item, index) of filtered"
        :data-index="index"
        :key="item.id"
        :product="item"
      ></product-items>
    </transition-group>
    <div
      class="block__of__product"
      v-if="filteredLength === 0 && message === '' && userInput !== ''"
    >
      <div class="noSuchSizes">
        No any products were found based on your request
      </div>
    </div>
    <div
      class="viewAllBlock"
      v-show="felteredProducts.length !== productsLength && userInput === ''"
    >
      <button
        :style="styleButton"
        class="view__all__button"
        @click="viewAllProducts"
      >
        View All Products
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
import Velocity from "velocity-animate";
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
      styleButton: {
        display: "block",
      },
      top: null,
      screenWidth: null,
      productsLength: 25, // length of all products in db.json (products + extraProducts + additional + sliderProducts)
      categoriesForSex: ["All", "men", "women"],
      categorySex: "All",
      categoriesForPrice: ["choose", "on increase", "on decrease"],
      categoryPrice: "choose",
      filteredCategory: [],
      value: [0, 200],
      lowPrice: 0,
      highPrice: 250,
      check: [],
      labels: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
      productsIdArray: [],
      message: "",
    };
  },
  methods: {
    viewAllProducts() {
      this.message = "";
      this.filteredCategory = this.products;
      this.categoryPrice = "choose";
      this.categorySex = "All";
      this.value = [0, 200];
      if (this.productsIdArray.length) {
        for (let i = 0; i < this.check.length; i++) {
          this.check[i] = false;
        }
        this.productsIdArray.length = 0;
      }
    },
    newSexCategory(category) {
      this.message = "";
      this.filteredCategory = [];
      if (category !== "All" && this.productsIdArray.length === 0) {
        this.products.map((product) => {
          if (
            product.sex === category &&
            product.price >= this.value[0] &&
            product.price <= this.value[1]
          ) {
            this.filteredCategory.push(product);
          }
        });
        if (this.filteredCategory.length === 0) {
          let categoryName =
            this.categorySex.charAt().toUpperCase() + this.categorySex.slice(1);
          this.message = ` No any products in ${categoryName} category with such price were found`;
        }
      }
      if (category === "All" && this.productsIdArray.length === 0) {
        this.products.map((product) => {
          if (
            product.price >= this.value[0] &&
            product.price <= this.value[1]
          ) {
            this.filteredCategory.push(product);
          }
        });
        if (this.filteredCategory.length === 0) {
          let categoryName =
            this.categorySex.charAt().toUpperCase() + this.categorySex.slice(1);
          this.message = ` No any products in ${categoryName} category with such price were found`;
        }
      }
      if (category !== "All" && this.productsIdArray.length !== 0) {
        this.productsIdArray.forEach((itemName) => {
          this.products.map((product) => {
            if (
              product.size.indexOf(itemName) !== -1 &&
              product.sex === category &&
              product.price >= this.value[0] &&
              product.price <= this.value[1]
            ) {
              this.filteredCategory.push(product);
            }
          });
        });
        if (this.filteredCategory.length === 0) {
          let categoryName =
            this.categorySex.charAt().toUpperCase() + this.categorySex.slice(1);
          this.message = ` No any products in ${categoryName} category with such size and price were found`;
        }
      }
      if (category === "All" && this.productsIdArray.length !== 0) {
        this.productsIdArray.forEach((itemName) => {
          this.products.map((product) => {
            if (
              product.size.indexOf(itemName) !== -1 &&
              product.price >= this.value[0] &&
              product.price <= this.value[1]
            ) {
              this.filteredCategory.push(product);
            }
          });
        });
        if (this.filteredCategory.length === 0) {
          let categoryName =
            this.categorySex.charAt().toUpperCase() + this.categorySex.slice(1);
          this.message = ` No any products in ${categoryName} category with such size and price were found`;
        }
      }
      this.filteredCategory = Array.from(new Set(this.filteredCategory));
      this.categoryPrice = "choose";
    },
    filterPrice(emittedValue) {
      if (emittedValue === "on increase") {
        if (this.filteredCategory.length && this.userInput === "") {
          this.filteredCategory.sort(
            (productA, productB) => productA.price - productB.price
          );
        }
        if (this.filtered.length && this.userInput !== "") {
          this.filtered.sort(
            (productA, productB) => productA.price - productB.price
          );
        }
      }
      if (emittedValue === "on decrease") {
        if (this.filteredCategory.length && this.userInput === "") {
          this.filteredCategory.sort(
            (productA, productB) => productB.price - productA.price
          );
        }
        if (this.filtered.length && this.userInput !== "") {
          this.filtered.sort(
            (productA, productB) => productB.price - productA.price
          );
        }
      }
    },
    filterOnSizes(productId) {
      this.message = "";
      this.categoryPrice = "choose";
      this.productsIdArray.push(productId);
      this.productsIdArray = Array.from(new Set(this.productsIdArray));
      this.check.forEach((booleanItem, index) => {
        if (
          booleanItem === false &&
          this.productsIdArray.includes(this.labels[index])
        ) {
          this.productsIdArray.splice(
            this.productsIdArray.indexOf(this.labels[index]),
            1
          );
        }
      });
      this.filteredCategory = [];
      if (this.categorySex === "All" && this.productsIdArray.length !== 0) {
        {
          this.productsIdArray.forEach((itemName) => {
            this.products.map((product) => {
              if (
                product.size.indexOf(itemName) !== -1 &&
                product.price >= this.value[0] &&
                product.price <= this.value[1]
              ) {
                this.filteredCategory.push(product);
              }
            });
          });
          if (this.filteredCategory.length === 0) {
            this.message = "No any products with such sizes were found";
          }
        }
      }
      if (this.categorySex === "All" && this.productsIdArray.length === 0) {
        {
          this.products.map((product) => {
            if (
              product.price >= this.value[0] &&
              product.price <= this.value[1]
            ) {
              this.filteredCategory.push(product);
            }
            this.message = "";
          });
          if (this.filteredCategory.length === 0) {
            this.message = "No any products with such sizes were found";
          }
        }
      }
      if (this.categorySex !== "All" && this.productsIdArray.length !== 0) {
        this.productsIdArray.forEach((itemName) => {
          this.products.map((product) => {
            if (
              product.size.indexOf(itemName) !== -1 &&
              product.sex === this.categorySex &&
              product.price >= this.value[0] &&
              product.price <= this.value[1]
            ) {
              this.filteredCategory.push(product);
            }
          });
        });
        if (this.filteredCategory.length === 0) {
          let categoryName =
            this.categorySex.charAt().toUpperCase() + this.categorySex.slice(1);
          this.message = ` No any products in ${categoryName} category with such size and price were found`;
        }
      }
      if (this.categorySex !== "All" && this.productsIdArray.length === 0) {
        this.products.map((product) => {
          if (
            product.sex === this.categorySex &&
            product.price >= this.value[0] &&
            product.price <= this.value[1]
          ) {
            this.filteredCategory.push(product);
          }
        });
        if (this.filteredCategory.length === 0) {
          let categoryName =
            this.categorySex.charAt().toUpperCase() + this.categorySex.slice(1);
          this.message = ` No any products in ${categoryName} category with such size and price were found`;
        }
      }
      this.filteredCategory = Array.from(new Set(this.filteredCategory));
    },
    sliderChanged() {
      this.$store.state.userSearch = "";
      this.filtered = [];
      setTimeout(() => {
        this.filteredCategory = [];
        this.message = "";

        if (this.categorySex !== "All" && this.productsIdArray.length !== 0) {
          this.productsIdArray.forEach((itemName) => {
            this.products.map((product) => {
              if (
                product.size.indexOf(itemName) !== -1 &&
                product.sex === this.categorySex &&
                product.price >= this.value[0] &&
                product.price <= this.value[1]
              ) {
                this.filteredCategory.push(product);
              }
            });
          });
          if (this.filteredCategory.length === 0) {
            let categoryName =
              this.categorySex.charAt().toUpperCase() +
              this.categorySex.slice(1);
            this.message = `No any products in ${categoryName} category with such size and price were found`;
          }
        }
        if (this.categorySex === "All" && this.productsIdArray.length !== 0) {
          this.productsIdArray.forEach((itemName) => {
            this.products.map((product) => {
              if (
                product.size.indexOf(itemName) !== -1 &&
                product.price >= this.value[0] &&
                product.price <= this.value[1]
              ) {
                this.filteredCategory.push(product);
              }
            });
          });
          if (this.filteredCategory.length === 0) {
            let categoryName =
              this.categorySex.charAt().toUpperCase() +
              this.categorySex.slice(1);
            this.message = `No any products in ${categoryName} category with such size and price were found`;
          }
        }
        if (this.categorySex !== "All" && this.productsIdArray.length === 0) {
          this.products.filter((product) => {
            if (
              product.price >= this.value[0] &&
              product.price <= this.value[1] &&
              product.sex === this.categorySex
            ) {
              this.filteredCategory.push(product);
            }
          });
          if (this.filteredCategory.length === 0) {
            let categoryName =
              this.categorySex.charAt().toUpperCase() +
              this.categorySex.slice(1);
            this.message = `No any products in ${categoryName} category were found`;
          }
        }
        if (this.categorySex === "All" && this.productsIdArray.length === 0) {
          this.products.filter((product) => {
            if (
              product.price >= this.value[0] &&
              product.price <= this.value[1]
            ) {
              this.filteredCategory.push(product);
            }
          });
          if (this.filteredCategory.length === 0) {
            this.message = `No any products with such price were found`;
          }
        }
      }, 0);
    },
    categoryFilter(category) {
      this.filteredCategory = category;
    },
    categoryBrand(category) {
      this.filteredCategory = category;
    },
    categoryMochino(category) {
      this.filteredCategory = category;
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      const index = el.dataset.index || 1;
      let delay = index * 100;
      setTimeout(() => {
        Velocity(
          el,
          { opacity: 1 },
          { duration: 1000, easing: "transition.slideLeftIn", complete: done }
        );
      }, delay);
    },
  },
  created() {
    this.message = "";
    NProgress.start();
    this.$store.commit("setLoading", true);
    this.$store.commit("CART_STATUS", false);
    this.$store
      .dispatch("getProducts")
      .then(() => {
        this.$store.dispatch("getExtraProducts");
      })
      .then(() => {
        return this.$store.dispatch("fetchAdditionalProducts");
      })
      .then(() => {
        return this.$store.dispatch("getSlidersProducts");
      })
      .then(() => {
        this.$store.commit("CONCAT_ADDITIONAL_PRODUCTS");
      })
      .then(() => {
        this.$store.commit("CONCAT_SLIDERS_PRODUCTS");
      })
      .then(() => {
        this.filteredCategory = this.products.slice(0, 9);
      })
      .catch((error) => {
        this.$router.push({ name: "ErrorDisplay", params: { error: error } });
      })
      .finally(() => {
        this.$store.commit("setLoading", false);
        NProgress.done();
      });
  },
  computed: {
    ...mapGetters([
      "loading",
      "products",
      "filtered",
      "userInput",
      "filteredLength",
    ]),
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
