<template>
  <div class="product-details">
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
          ></i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  //mixins changeRating
  data() {
    return {
      product: null,
      id: 3,
    };
  },
  created() {
    EventService.getProduct(this.id)
      .then((response) => {
        this.product = response.data;
      })
      .catch((error) => {
        console.log("axios.getError", error);
      });
  },
};
</script>

<style lang="scss" scoped></style>
