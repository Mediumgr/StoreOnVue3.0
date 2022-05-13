<template>
  <div class="outside__chairgirl">
    <div class="left__arrow__single">
      <a href="#" class="color__arrow">
        <i class="fas fa-chevron-left"></i>
      </a>
    </div>
    <div class="chair__girl">
      <img :src="require('@/assets/img/nice__girl.png')" alt="foto" />
    </div>
    <div class="right__arrow__single">
      <a href="#" class="color__arrow">
        <i class="fas fa-chevron-right"></i>
      </a>
    </div>
  </div>
  <div class="women__content center">
    <div class="women__block">
      <div class="women__collection">women collection</div>
      <div class="slider"></div>
      <div class="mochino">Moschino Cheap And Chic</div>
      <div class="star">
        <img :src="require('@/assets/img/star.png')" alt="stars" />
      </div>
      <div class="text__product">
        Fashion designers tried to make this summer bright and filled it with
        art. Also this season, among the new fashion trends, there are also
        well-forgotten old ones, even such as crinolines and bustles. They could
        be found on models in many fashion collections.
        <div class="material__designer">
          <div class="material">
            MATERIAL:<span class="common__style"> COTTON</span>
          </div>
          <div class="designer">
            DESIGNER:<span class="common__style"> BINBURHAN</span>
          </div>
        </div>
      </div>
      <div class="amount__total">150&#36;</div>
      <div class="line__after__amount"></div>
      <div class="form__block">
        <div class="common__form">
          <div class="float__form">
            <div class="choose__it">CHOOSE COLOR</div>
            <div class="choose__input">
              <select
                required="required"
                class="choose__color"
                v-model="select"
              >
                <option v-for="color in colors" :key="color">
                  {{ color }}
                </option>
              </select>
              <div class="box">
                <i class="fa-solid fa-square-full" :class="styleColor"></i>
              </div>
            </div>
          </div>
          <div class="float__form">
            <div class="choose__it">CHOOSE SIZE</div>
            <div class="choose__input">
              <select
                required="required"
                class="choose__size"
                v-model="yourSize"
              >
                <option v-for="size in sizes" :key="size">{{ size }}</option>
              </select>
            </div>
          </div>
          <div class="float__form">
            <div class="choose__it">QUANTITY</div>
            <div class="choose__input">
              <input
                required="required"
                type="text"
                placeholder="1"
                class="choose__quantity"
                v-model.number="quantity"
              />
            </div>
          </div>
        </div>
        <div class="button__form" @click="addToCart">
          <button :class="btnClass">
            <img
              :src="require('@/assets/img/cart__pink.png')"
              alt="cart"
              class="pink__bin"
            />{{ message }}
          </button>
        </div>
      </div>
    </div>
    <div class="you__may">you may like also</div>
  </div>
  <div class="foto__block__3 center">
    <additional-products
      v-for="product in products"
      :key="product.id"
      :product="product"
    ></additional-products>
  </div>
</template>

<script>
import AdditionalProducts from "@/components/Single/AdditionalProducts.vue";
import NProgress from "nprogress";
import { mapGetters } from "vuex";

export default {
  name: "SinglePage",
  components: {
    AdditionalProducts,
  },
  data() {
    return {
      colors: ["White", "Red", "Black"],
      color: "White",
      select: "White",
      styleColor: "square-white",
      sizes: ["XXL", "M", "S"],
      yourSize: "S",
      quantity: 1,
      message: "Add to Cart",
      btnClass: "buy",
    };
  },
  methods: {
    addToCart() {
      this.$store
        .dispatch("postMochinoToCart", {
          img: "nice__girl.png",
          id: 23,
          name: "MOSCHINO",
          price: 150,
          quantity: this.quantity,
          size: this.yourSize,
          color: this.color,
        })
        .then(() => {
          this.message = "Successfully added";
          this.btnClass = "buyAdded";
          setTimeout(() => {
            this.message = "Add to Cart";
            this.btnClass = "buy";
          }, 1500);
        });
    },
  },
  computed: {
    ...mapGetters(["products"]),
  },
  watch: {
    select(newValue) {
      switch (newValue) {
        case "White":
          this.styleColor = "square-white";
          break;
        case "Red":
          this.styleColor = "square-red";
          break;
        case "Black":
          this.styleColor = "square-black";
      }
    },
  },
  created() {
    NProgress.start();
    this.$store.dispatch("fetchAdditionalProducts").finally(() => {
      NProgress.done();
    });
  },
};
</script>

<style lang="scss" scoped>
.square-red {
  color: rgb(239, 91, 112);
}
.square-white {
  color: rgb(234, 234, 234);
}
.square-black {
  color: rgb(0, 0, 0);
}
</style>
