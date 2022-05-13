<template>
  <div class="product-detail" v-if="product">
    <div class="flex">
      <div class="goodContainer">
        <img
          v-for="variant in product.variants"
          :key="variant"
          :src="require(`@/assets/img/${variant}`)"
          alt="photo"
          class="styleImageVariant"
          @mouseover="changeImage(variant)"
        />
      </div>
      <div>
        <div class="flex-box">
          <img
            class="product-img"
            :src="require(`@/assets/img/${product.img}`)"
            alt="photo"
          />
        </div>
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
              ></i>
            </span>
          </p>
        </div>
      </div>
      <div class="block">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['tabBtns', { active: currentTab === tab }]"
          @click="currentTab = tab"
        >
          {{ tab }}
        </button>
        <component
          :product="product"
          :is="currentComponent"
          @sizeEmit="sizeReceived"
        ></component>
      </div>
    </div>
    <button class="putToCart" @click="addProductToCart(product)">
      <img :src="require('@/assets/img/w_b.png')" alt="buy" />
    </button>
    <span class="cartAdded" v-if="cartProductsAmount !== 0">{{ message }}</span>
  </div>
</template>

<script>
import ProductDescription from "@/views/Product/ProductDescription.vue";
import ProductDelivery from "@/views/Product/ProductDelivery.vue";
import NProgress from "nprogress";
import { mapGetters, mapState } from "vuex";

export default {
  //mixins changeRating()  with ProductItems component
  name: "ProductDetails",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    ProductDescription,
    ProductDelivery,
  },
  data() {
    return {
      currentTab: "Description",
      tabs: ["Description", "Delivery"],
      message: "",
      size: "",
    };
  },
  methods: {
    changeImage(variant) {
      this.$store.state.product.img = variant; //Изменяю state - не очень...через created .then(() => не получается)
    },
    changeRating(n) {
      debugger;
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
          img: product.variants[0],
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          size: this.size,
          color: product.description[4],
        })
        .then(() => {
          this.message = "Added successfully";
          setTimeout(() => {
            this.message = "";
          }, 1500);
        })
        .catch((error) => {
          this.$router.push({ name: "ErrorDisplay", params: { error: error } });
        });
    },
    sizeReceived(sizeEmited) {
      this.size = sizeEmited;
    },
  },
  computed: {
    ...mapState(["product"]),
    ...mapGetters(["cartProductsAmount"]),
    currentComponent() {
      return "product-" + this.currentTab.toLowerCase();
    },
  },
  created() {
    NProgress.start();
    this.$store.dispatch("getProduct", +this.id).finally(() => {
      NProgress.done();
    });
  },
};
</script>

<style lang="scss" scoped>
.goodContainer {
  display: flex;
  flex-direction: column;
  padding-right: 15px;
}

.styleImageVariant {
  width: 65px;
  height: 70px;
  margin-bottom: 15px;
  cursor: pointer;
}

.styleImageVariant:hover {
  outline: 2px solid #f16d7f;
}
.info {
  float: left;
}
.flex {
  display: flex;
}
.flex-box {
  width: 400px;
}

.product-img {
  width: 100%;
  height: 432px;
}

.block {
  padding-left: 20px;
}
</style>
