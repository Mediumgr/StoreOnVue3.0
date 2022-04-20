<template>
  <div class="product-item">
    <a
      ><img
        class="product-item__img"
        :src="require(`@/assets/img/${product.img}`)"
        alt="photo"
    /></a>
    <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
      <span class="description"
        >Description <i class="fa-solid fa-circle-arrow-right fa-xs arrow"></i
      ></span>
    </router-link>
    <div class="bottom">
      <a href="#" class="text__mango">{{ product.name }}</a>
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
    <div @click="productCounter($event)">
      <a href="#" class="add__cart" @click="addProductToCart(product)">
        <img src="@/assets/img/w_b.png" alt="buy" />Add to Cart
      </a>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

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
    productCounter(event) {
      console.log("каунт", event);
    },
    addProductToCart(product) {
      // this.$commit('addProductToCart', product) -> добавить в state для корзины cart: [] и вывести через геттер в картордер компонент
      let prod = [
        {
          img: product.img,
          id: product.id,
          name: product.name,
          price: product.price,
        },
      ];
      EventService.postProductToCart(prod)
        .then(() => {
          /* this.$commit('addProductToCart', prod) и в методе сделать проверку на наличие такого же товара - см. смотри в компоненте cartOrder: addProduct(product) */
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
