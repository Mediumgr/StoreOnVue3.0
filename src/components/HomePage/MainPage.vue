<template>
  <brand-promo></brand-promo>
  <div class="products center">
    <!-- <div class="noProducts center" v-if="filter === 0">{{ error }}</div> -->
    <product-items
      v-for="item of filtered"
      :key="item.id"
      :product="item"
    ></product-items>
  </div>
  <form class="click">
    <button class="button__browse">
      <span class="browse__product">Browse All Product</span
      ><i class="fa-solid fa-arrow-right-long" style="margin-left: 8px"></i>
    </button>
  </form>
  <offer-discount></offer-discount>
</template>

<script>
import BrandPromo from "@/components/HomePage/BrandPromo.vue";
import ProductItems from "@/components/HomePage/ProductItems.vue";
import OfferDiscount from "@/components/HomePage/OfferDiscount.vue";

export default {
  name: "MainPage",
  components: {
    BrandPromo,
    ProductItems,
    OfferDiscount,
  },
  data() {
    return {
      error: "Товары не найдены, впишите название товара согласно каталогу",
    };
  },
  created() {
    this.$store.dispatch("getProducts");
  },
  computed: {
    filtered() {
      return this.$store.state.filtered;
    },
  },
};
</script>
