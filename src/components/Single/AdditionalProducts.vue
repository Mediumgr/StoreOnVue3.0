<template>
  <div class="product__next">
    <div class="leggins__girl">
      <span
        ><img
          class="product__img__2"
          :src="require('@/assets/img/black-girl.png')"
          alt="photo"
      /></span>
    </div>
    <div class="bottom">
      <a href="#" class="text__mango">BLAZE LEGGINGS</a>
      <p class="price">
        &#36;52.00<img
          class="product__star"
          :src="require('@/assets/img/star.png')"
          alt="star"
        />
      </p>
    </div>
    <a href="#" class="add__cart"
      ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
      Cart</a
    >
  </div>
  <div class="product__next">
    <div class="skirt__girl">
      <a href="#"
        ><img
          class="product__img__2"
          :src="require('@/assets/img/secondgirl.png')"
          alt="photo"
      /></a>
    </div>
    <div class="bottom">
      <a href="#" class="text__mango">ALEXA SWEATER</a>
      <p class="price">&#36;52.00</p>
    </div>
    <button class="add__cart" @click="addToCart">
      <img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to Cart
    </button>
  </div>
  <div class="product__next">
    <div class="blouse__girl">
      <a href="#"
        ><img
          class="product__img__2"
          :src="require('@/assets/img/third.png')"
          alt="photo"
      /></a>
    </div>
    <div class="bottom">
      <a href="#" class="text__mango">AGNES TOP</a>
      <p class="price">
        &#36;52.00<img
          class="product__star"
          :src="require('@/assets/img/star.png')"
          alt="star"
        />
      </p>
    </div>
    <a href="#" class="add__cart"
      ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
      Cart</a
    >
  </div>
  <div class="product__next">
    <div class="sweater__girl">
      <a href="#"
        ><img
          class="product__img__2"
          :src="require('@/assets/img/forthgirl.png')"
          alt="photo"
      /></a>
    </div>
    <div class="bottom">
      <a href="#" class="text__mango">SYLVA SWEATER</a>
      <p class="price">&#36;52.00</p>
    </div>
    <a href="#" class="add__cart"
      ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
      Cart</a
    >
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
