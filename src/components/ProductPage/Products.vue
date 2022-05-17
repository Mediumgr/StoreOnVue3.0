<template>
  <div
    class="content__product center"
    v-if="filtered.length && loading === false"
  >
    <left-aside></left-aside>
    <option-products></option-products>
    <router-link :to="{ name: 'SinglePage' }">
      <div class="our-offer" :style="styles" v-if="screenWidth < 1481">
        <i class="fa-solid fa-circle-chevron-left fa-xl"></i>
        <button class="raise">OFFER</button>
      </div>
    </router-link>
    <router-link :to="{ name: 'SinglePage' }">
      <div class="our-offer" :style="styles" v-if="screenWidth >= 1481">
        <button class="raise">Offer</button>
        <i class="fa-solid fa-circle-chevron-right fa-xl"></i>
      </div>
    </router-link>
    <div class="block__of__product">
      <product-items
        v-for="item of filtered"
        :key="item.id"
        :product="item"
      ></product-items>
    </div>
    <div class="viewAllBlock" v-show="filtered.length !== 18">
      <button
        :style="styleButton"
        class="view__all__button"
        @click.once="viewAllProducts"
      >
        View All
      </button>
    </div>
  </div>
  <div class="content__product center" v-if="loading === true">
    <left-aside></left-aside>
    <option-products></option-products>
    <div class="block__of__spinner">
      <i class="fa-solid fa-spinner fa-spin fa-2xl"></i>
    </div>
  </div>
  <div class="content__product center" v-if="!filtered.length">
    <left-aside></left-aside>
    <option-products></option-products>
    <div class="block__of__product">
      <div class="noConcatProducts center">
        {{ error }}
      </div>
    </div>
  </div>
  <div class="InformationCenter center">
    <div class="blockInformationDelivery">
      <div class="truckImg">
        <img :src="require('@/assets/img/truck.png')" alt="truck" />
      </div>
      <div class="firstInfo">
        <h3 class="free freeStyle">Free Delivery</h3>
        <h4 class="delivery deliveryInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
    <div class="blockInformationDiscount">
      <div class="circleImg">
        <img :src="require('@/assets/img/circle.png')" alt="discount" />
      </div>
      <div class="secondInfo">
        <h3 class="sales salesStyle">Sales &amp; discounts</h3>
        <h4 class="discounts salesInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
    <div class="blockInformationQuality">
      <div class="crownImg">
        <img :src="require('@/assets/img/korona.png')" alt="crown" />
      </div>
      <div class="thirdInfo">
        <h3 class="quality qualityStyle">Quality assurance</h3>
        <h4 class="assurance qualityInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItems from "@/components/HomePage/ProductItems.vue";
import LeftAside from "@/components/ProductPage/LeftAside.vue";
import OptionProducts from "@/components/ProductPage/OptionProducts.vue";
import NProgress from "nprogress";
import { mapGetters, mapState } from "vuex";

export default {
  name: "ProductPage",
  components: { ProductItems, LeftAside, OptionProducts },
  data() {
    return {
      counter: 0,
      currentPage: 1,
      displayedItems: 9,
      cart: "Add to Cart",
      disable: false,
      error:
        "The products you are looking for were not found. Enter the name of the product.",
      styleButton: {
        display: "block",
      },
      top: null,
      screenWidth: null,
    };
  },
  methods: {
    viewAllProducts() {
      this.$store
        .dispatch("getExtraProducts")
        .then(() => {
          this.styleButton.display = "none";
        })
        .catch((error) => {
          this.$router.push({ name: "ErrorDisplay", params: { error: error } });
        });
    },
  },
  created() {
    NProgress.start();
    this.$store.commit("setLoading", true);
    this.$store
      .dispatch("getProducts")
      .catch((error) => {
        this.$router.push({ name: "ErrorDisplay", params: { error: error } });
      })
      .finally(() => {
        this.$store.commit("setLoading", false);
        NProgress.done();
      });
  },
  computed: {
    ...mapState(["filtered"]),
    ...mapGetters(["loading"]),
    styles() {
      return {
        top: `${this.top - 5}px`,
      };
    },
  },
  mounted() {
    this.top = document.documentElement.clientHeight / 2;
    this.screenWidth = document.documentElement.clientWidth;
  },
};
</script>

<style lang="scss" scoped>
.active {
  background: rgb(230, 2, 199);
}

.block__of__spinner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 150px 0 50px 294px;
  align-items: center;
}

.fa-spinner {
  margin: 0 auto;
}

.raise {
  background: none;
  outline: none;
  overflow: hidden;
  border: none;
  color: #f16d7f;
  font: inherit;
  padding: 0.5em 0.5em;
  cursor: pointer;
}

.our-offer {
  position: fixed;
  cursor: pointer;
  color: #f16d7f;
  transition: 0.8s;
}

@media (max-width: 1480px) {
  .our-offer {
    left: 300px;
    &:hover,
    &:focus {
      transform: translateX(-0.3em);
      color: #83ee7d;
    }
  }
}

@media (min-width: 1481px) {
  .our-offer {
    right: 85px;
    &:hover,
    &:focus {
      transform: translateX(0.3em);
      color: #83ee7d;
    }
  }
}
</style>
