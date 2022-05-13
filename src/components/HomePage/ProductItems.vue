<template>
  <div class="product-item">
    <span
      ><img
        class="product-item__img"
        :src="require(`@/assets/img/${product.img}`)"
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
          <i class="fas fa-thumbs-up fa-xs"></i>
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
//mixins changeRating()  with ProductDetails component
export default {
  name: "ProductItems",
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
    changeRating(n) {
      for (let i = 0; i < n; i++) {
        this.$refs.star[i].classList.value = "fas fa-star fa-sm star";
      }
      if (n <= this.$refs.star.length) {
        for (let i = n; i < this.$refs.star.length; i++) {
          this.$refs.star[i].classList.value = "fas fa-star fa-sm";
        }
      }
    },
    addProductToCart(product) {
      this.$store
        .dispatch("postToCart", {
          img: product.img,
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
