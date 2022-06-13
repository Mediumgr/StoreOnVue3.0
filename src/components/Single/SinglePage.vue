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
      <div class="women__bar slider">
        <div
          class="women__bar_thin"
          v-for="n in womens.length"
          :key="n"
          @click="changeAdvertising(n)"
          :class="{ active: activeClass === n }"
        ></div>
      </div>
      <transition :key="renderComponent" appear name="fadeShow">
        <div>
          <collection-offer :women="women"></collection-offer>
        </div>
      </transition>
      <div class="line__after__amount"></div>
      <div class="form__block">
        <div class="common__form">
          <div class="float__form">
            <div class="choose__it">CHOOSE COLOR</div>
            <div class="choose__input">
              <select
                required="required"
                class="choose__color"
                v-model="selectColor"
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
    <additional-items
      v-for="product in additionalProducts"
      :key="product.id"
      :product="product"
    ></additional-items>
  </div>
</template>

<script>
import AdditionalItems from "@/components/Single/AdditionalItems.vue";
import CollectionOffer from "@/components/Single/CollectionOffer.vue";
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
    AdditionalItems,
    Swiper,
    SwiperSlide,
    CollectionOffer,
  },
  data() {
    return {
      modules: [Navigation, Pagination, Keyboard],
      colors: ["White", "Red", "Black"],
      selectColor: "White",
      styleColor: "square-white",
      sizes: ["XXL", "M", "S"],
      yourSize: "S",
      quantity: 1,
      message: "Add to Cart",
      btnClass: "buy",
      slides: ["white.png", "red.png", "black3.png"],
      image: "white.png",
      id: 23,
      price: 150,
      activeClass: 2,
      renderComponent: 0,
      womens: [
        {
          id: 1,
          description:
            "Fashion designers tried to make this summer bright and filled it with art. Also this season, among the new fashion trends, there are also well-forgotten old ones, even such as crinolines and bustles.",
          designer: "BINBURHAN",
          price: 150,
        },
        {
          id: 2,
          description:
            "Stunning and amazing red leggings in addition to the leather black jacket made of eco-leather 'Stendhal'",
          designer: "BROWN",
          price: 200,
        },
        {
          id: 3,
          description:
            "Women's leggings are made of insulated material that perfectly wicks away moisture and are designed for comfort during long outdoor workouts. The model stretches well and feels good on the body.",
          designer: "SIMONS",
          price: 225,
        },
      ],
      women: {
        id: 1,
        description:
          "Fashion designers tried to make this summer bright and filled it with art. Also this season, among the new fashion trends, there are also well-forgotten old ones, even such as crinolines and bustles. They could",
        designer: "BINBURHAN",
        price: "150",
      },
    };
  },
  methods: {
    addToCart() {
      this.$store
        .dispatch("postMochinoToCart", {
          img: this.image,
          id: this.id,
          name: "MOSCHINO",
          price: this.price,
          quantity: this.quantity,
          color: this.selectColor,
          size: this.yourSize,
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
    changeAdvertising(index) {
      this.activeClass = index;
      this.women = this.womens[index - 1];
      this.renderComponent += 1;
    },
  },
  computed: {
    ...mapGetters(["additionalProducts"]),
  },
  watch: {
    selectColor(newValue) {
      switch (newValue) {
        case "White":
          this.styleColor = "square-white";
          this.image = this.slides[0];
          this.price = 150;
          this.id = 23;
          break;
        case "Red":
          this.styleColor = "square-red";
          this.image = this.slides[1];
          this.price = 200;
          this.id = 24;
          break;
        case "Black":
          this.styleColor = "square-black";
          this.image = this.slides[2];
          this.price = 225;
          this.id = 25;
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
.swiper {
  height: 777px;
  width: 100%;
  background-color: rgba(247, 247, 247, 1);
  display: flex;
  justify-content: space-between;
  z-index: 0;
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
  z-index: 0;
}

.swiper-slide img {
  display: block;
  height: 707px;
  width: 597px;
  top: -40px;
  position: relative;
}

.swiper-slide {
  background: #f7f7f7;
}

.slider {
  position: relative;
  top: -30px;
  right: 64px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -2px;
  cursor: pointer;
}

.women__bar {
  width: 147px;
  padding-left: 130px;
  justify-content: center;
  display: flex;
  padding-top: 40px;
  &_thin {
    width: 42px;
    height: 4px;
    background-color: rgba(214, 214, 214, 1);
  }
}

.active {
  background-color: #f16d7f;
}
</style>
