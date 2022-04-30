<template>
  <brand-promo></brand-promo>
  <div class="products center">
    <div class="noProducts center" v-if="!filtered.length">
      {{ error }}
    </div>
    <product-items
      v-for="item of filtered"
      :key="item.id"
      :product="item"
    ></product-items>
  </div>
  <router-link :to="{ name: 'ProductPage' }">
    <div class="click">
      <button class="button__browse">
        <span class="browse__product">Browse All Product</span
        ><i class="fa-solid fa-arrow-right-long" style="margin-left: 8px"></i>
      </button>
    </div>
  </router-link>
  <offer-discount></offer-discount>
</template>

<script>
import BrandPromo from "@/components/HomePage/BrandPromo.vue";
import ProductItems from "@/components/HomePage/ProductItems.vue";
import OfferDiscount from "@/components/HomePage/OfferDiscount.vue";
import NProgress from "nprogress";
import { mapState } from "vuex";

export default {
  name: "MainPage",
  components: {
    BrandPromo,
    ProductItems,
    OfferDiscount,
  },
  data() {
    return {
      error:
        "The products you are looking for were not found. Enter the name of the product.",
    };
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
