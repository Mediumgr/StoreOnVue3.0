<template>
  <div class="product-item">
    <a
      ><img
        class="product-item__img"
        :src="require(`/src/assets/img/${product.img}`)"
        alt="photo"
    /></a>
    <div class="bottom">
      <a href="#" class="text__mango">{{ product.name }}</a>
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
    <div @click="productCounter($event)">
      <a href="#" class="add__cart" @click="cartAPI.addProduct(product)">
        <img src="@/assets/img/w_b.png" alt="buy" />Add to Cart
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItems",
  props: {
    product: {
      type: Object,
      default: () => {},
    },
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
  },
};
</script>

<style lang="scss" scoped>
.fa,
.fas {
  font-weight: 100;
  cursor: pointer;
}
.star {
  color: #f16d7f;
  font-weight: 800;
}
</style>
