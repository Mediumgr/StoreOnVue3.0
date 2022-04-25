<template>
  <div class="product-item">
    <span
      ><img
        class="product__img"
        :src="require('@/assets/img/1.png')"
        alt="photo"
    /></span>
    <span class="description"
      >Description <i class="fa-solid fa-circle-arrow-right fa-xs"></i
    ></span>
    <div class="bottom">
      <span class="text__mango">Mango People T-shirt</span>
      <p class="price">
        <span class="text__mango">Product.Name</span>
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
      <img :src="require('@/assets/img/w_b.png')" alt="buy" />{{ cart }}
    </p>
  </div>
  <!-- 
  <span
    ><img
      class="product__img"
      :src="require(`@/assets/img/${product.img}`)"
      alt="photo"
  /></span>
  <span class="description"
    >Description <i class="fa-solid fa-circle-arrow-right fa-xs"></i
  ></span>
  <div class="bottom">
    <span class="text__mango">{{ product.name }}</span>
    <p class="price">
      &#36;5{{ product.price }}
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
    <img :src="require('@/assets/img/w_b.png')" alt="buy" />{{ cart }}
  </p> -->
  <!-- 
  <a href="#"
    ><img class="product__img" :src="require('@/assets/img/2.png')" alt="photo"
  /></a>
  <div class="bottom">
    <a href="#" class="text__mango">Mango People T-shirt</a>
    <p class="price">&#36;52.00</p>
  </div>
  <a href="#" class="add__cart"
    ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
    Cart</a
  >

  <a href="#"
    ><img
      class="product__img"
      :src="require('@/assets/img/barberman.png')"
      alt="photo"
  /></a>
  <div class="bottom">
    <a href="#" class="text__mango">Mango People T-shirt</a>
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

  <a href="#"
    ><img class="product__img" :src="require('@/assets/img/4.png')" alt="photo"
  /></a>
  <div class="bottom">
    <a href="#" class="text__mango">Mango People T-shirt</a>
    <p class="price">&#36;52.00</p>
  </div>
  <a href="#" class="add__cart"
    ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
    Cart</a
  >

  <a href="#"
    ><img class="product__img" :src="require('@/assets/img/5.png')" alt="photo"
  /></a>
  <div class="bottom">
    <a href="#" class="text__mango">Mango People T-shirt</a>
    <p class="price">&#36;52.00</p>
  </div>
  <a href="#" class="add__cart"
    ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
    Cart</a
  >

  <a href="#"
    ><img class="product__img" :src="require('@/assets/img/6.png')" alt="photo"
  /></a>
  <div class="bottom">
    <a href="#" class="text__mango">Mango People T-shirt</a>
    <p class="price">&#36;52.00</p>
  </div>
  <a href="#" class="add__cart"
    ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
    Cart</a
  >

  <a href="#"
    ><img
      class="product__img"
      :src="require('@/assets/img/guyjacket.png')"
      alt="photo"
  /></a>
  <div class="bottom">
    <a href="#" class="text__mango">Mango People T-shirt</a>
    <p class="price">&#36;52.00</p>
  </div>
  <a href="#" class="add__cart"
    ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
    Cart</a
  >

  <a href="#"
    ><img class="product__img" :src="require('@/assets/img/7.png')" alt="photo"
  /></a>
  <div class="bottom">
    <a href="#" class="text__mango">Mango People T-shirt</a>
    <p class="price">&#36;52.00</p>
  </div>
  <a href="#" class="add__cart"
    ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
    Cart</a
  >

  <a href="#"
    ><img class="product__img" :src="require('@/assets/img/8.png')" alt="photo"
  /></a>
  <div class="bottom">
    <a href="#" class="text__mango">Mango People T-shirt</a>
    <p class="price">&#36;52.00</p>
  </div>
  <a href="#" class="add__cart"
    ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
    Cart</a
  > -->
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
