<template>
  <div class="product-item">
    <span
      ><img
        class="product-item__img"
        :src="require(`@/assets/img/${product.variants[0]}`)"
        alt="photo"
    /></span>
    <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
      <span class="description"
        >Description <i class="fa-solid fa-circle-arrow-right fa-xs arrow"></i>
      </span>
    </router-link>
    <div class="bottom">
      <span class="text__mango">{{ product.name }}</span>
      <p class="price">
        <span> &#36;{{ product.price }}</span>
        <span>
          <i
            ref="star"
            @click="changeRating(n)"
            v-for="n in 5"
            :key="n"
            class="fas fa-star fa-sm"
          ></i
        ></span>
      </p>
    </div>
    <p class="add__cart" @click="addProductToCart(product)">
      <img :src="require('@/assets/img/w_b.png')" alt="buy" />{{ message }}
    </p>
  </div>
</template>

<script>
import mixin from "@/mixins/Stars.vue";

export default {
  name: "ProductItems",
  mixins: [mixin],
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      counter: 0,
      message: "Add to Cart",
    };
  },
  methods: {
    addProductToCart(product) {
      this.$store
        .dispatch("postToCart", {
          img: product.variants[0],
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          color: product.description[4],
          size: "S",
        })
        .then(() => {
          this.message = `Added ${++this.counter} pcs`;
        })
        .catch((error) => {
          this.$router.push({ name: "ErrorDisplay", params: { error: error } });
        });
    },
  },
};
</script>
