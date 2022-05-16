<template>
  <swiper
    :cssMode="true"
    navigation
    :pagination="{ clickable: true }"
    :keyboard="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="slide in slides" :key="slide"
      ><img :src="require(`@/assets/img/${slide}`)" alt="foto"
    /></swiper-slide>
  </swiper>
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
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard } from "swiper";

export default {
  name: "SinglePage",
  components: {
    AdditionalProducts,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation, Pagination, Keyboard],
      colors: ["White", "Red", "Black"],
      color: "White",
      select: "White",
      styleColor: "square-white",
      sizes: ["XXL", "M", "S"],
      yourSize: "S",
      quantity: 1,
      message: "Add to Cart",
      btnClass: "buy",
      slides: ["white.png", "red.png", "black3.png"],
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

<style>
.square-red {
  color: rgb(239, 91, 112);
}
.square-white {
  color: rgb(234, 234, 234);
}
.square-black {
  color: rgb(0, 0, 0);
}
.swiper {
  height: 777px;
  width: 100%;
  background-color: rgba(247, 247, 247, 1);
  display: flex;
  justify-content: space-between;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-wrapper {
  height: 90%;
}

.swiper-slide img {
  display: block;
  height: 688px;
  width: 597px;
  object-fit: cover;
}
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: 100px;
}

.swiper-slide {
  background: #f7f7f7;
}
</style>
