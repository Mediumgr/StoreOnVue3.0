<template>
  <div class="content__product center" v-if="filtered.length">
    <left-aside></left-aside>
    <option-products></option-products>
    <div class="block__of__product">
      <div class="noConcatProducts center" v-if="!filtered.length">
        {{ error }}
      </div>
      <product-items
        v-for="item of filtered"
        :key="item.id"
        :product="item"
      ></product-items>
    </div>
    <div class="viewAllBlock">
      <button
        :style="styleButton"
        class="view__all__button"
        @click.once="viewAllProducts"
      >
        View All
      </button>
    </div>
  </div>
  <div class="InformationCenter center">
    <div class="blockInformationDelivery">
      <div class="truckImg">
        <img :src="require('@/assets/img/truck.png')" alt="truck" />
      </div>
      <div class="firstInfo">
        <h3 class="free freeStyle">Free Delivery</h3>
        <h4 class="delivery deliveryInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
    <div class="blockInformationDiscount">
      <div class="circleImg">
        <img :src="require('@/assets/img/circle.png')" alt="discount" />
      </div>
      <div class="secondInfo">
        <h3 class="sales salesStyle">Sales &amp; discounts</h3>
        <h4 class="discounts salesInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
    <div class="blockInformationQuality">
      <div class="crownImg">
        <img :src="require('@/assets/img/korona.png')" alt="crown" />
      </div>
      <div class="thirdInfo">
        <h3 class="quality qualityStyle">Quality assurance</h3>
        <h4 class="assurance qualityInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItems from "@/components/HomePage/ProductItems.vue";
import LeftAside from "@/components/ProductPage/LeftAside.vue";
import OptionProducts from "@/components/ProductPage/OptionProducts.vue";
import NProgress from "nprogress";
import { mapState } from "vuex";

export default {
  name: "ProductPage",
  components: { ProductItems, LeftAside, OptionProducts },
  data() {
    return {
      counter: 0,
      currentPage: 1,
      displayedItems: 9,
      cart: "Add to Cart",
      disable: false,
      error:
        "The products you are looking for were not found. Enter the name of the product.",
      styleButton: {
        display: "block",
      },
    };
  },
  methods: {
    viewAllProducts() {
      this.$store
        .dispatch("getExtraProducts")
        .then(() => {
          this.styleButton.display = "none";
        })
        .catch((error) => {
          this.$router.push({ name: "ErrorDisplay", params: { error: error } });
        });
    },
  },
  created() {
    NProgress.start();
    this.$store
      .dispatch("getProducts")
      .catch((error) => {
        this.$router.push({ name: "ErrorDisplay", params: { error: error } });
      })
      .finally(() => {
        NProgress.done();
      });
  },
  computed: {
    ...mapState(["filtered"]),
  },
};
</script>

<style scoped>
.active {
  background: rgb(230, 2, 199);
}
</style>
