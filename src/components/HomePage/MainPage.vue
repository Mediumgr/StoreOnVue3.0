<template>
  <brand-promo></brand-promo>
  <div class="products center">
    <div class="noProducts center" v-if="countProd2 === 0">{{ error }}</div>
    <product-items
      v-for="item of filtered"
      :key="item.id"
      :product="item"
    ></product-items>
  </div>
  <form class="click">
    <button class="button__browse">
      <span class="browse__product">Browse All Product</span
      ><img src="@/assets/img/arrow__right.png" alt="go-ahead" />
    </button>
  </form>
  <offer-discount></offer-discount>
</template>

<script>
import BrandPromo from "@/components/HomePage/BrandPromo.vue";
import ProductItems from "@/components/HomePage/ProductItems.vue";
import OfferDiscount from "@/components/HomePage/OfferDiscount.vue";
import EventService from "@/services/EventService.js";

export default {
  name: "MainPage",
  components: {
    BrandPromo,
    ProductItems,
    OfferDiscount,
  },
  data() {
    return {
      filtered: null,
    };
  },
  created() {
    EventService.getProducts()
      .then((response) => {
        this.filtered = response.data;
      })
      .catch((error) => {
        console.log("axios.getError", error);
      });
  },
};
</script>
