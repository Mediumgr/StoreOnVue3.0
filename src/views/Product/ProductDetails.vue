<template>
  <div class="product-detail">
    <div class="flex">
      <div class="goodContainer">
        <img
          v-for="variant in product.variants"
          :key="variant"
          :src="require(`@/assets/img/${variant}`)"
          alt="photo"
          class="blueJacket"
          @mouseover="changeImage(variant)"
        />
      </div>
      <div>
        <div class="flex-box">
          <img
            class="product-img"
            :src="require(`@/assets/img/${product.variants[0]}`)"
            alt="photo"
          />
        </div>
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
      <div class="block">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['tabBtns', { active: currentTab === tab }]"
          @click="currentTab = tab"
        >
          {{ tab }}
        </button>
        <component :product="product" :is="currentComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDescription from "@/views/Product/ProductDescription.vue";
import ProductDelivery from "@/views/Product/ProductDelivery.vue";

export default {
  //mixins changeRating()
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
    };
  },
  methods: {
    changeImage(variant) {
      this.image = variant;
    },
  },
  computed: {
    currentComponent() {
      return "product-" + this.currentTab.toLowerCase();
    },
    product() {
      return this.$store.state.product;
    },
  },
  created() {
    this.$store.dispatch("getProduct", +this.id);
  },
};
</script>

<style lang="scss" scoped>
.goodContainer {
  display: flex;
  flex-direction: column;
  padding-right: 15px;
}

.blueJacket {
  width: 65px;
  height: 70px;
  margin-bottom: 15px;
  cursor: pointer;
}

.blueJacket:hover {
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

.price {
  .fa,
  .fas {
    font-weight: 100;
    cursor: pointer;
  }
}

.product-img {
  width: 100%;
  height: 432px;
}

.block {
  padding-left: 20px;
}
</style>
