<template>
  <div class="product-detail">
    <div class="flex">
      <div>
        <div class="flex-box">
          <img
            class="product-img"
            :src="require(`/src/assets/img/${product.img}`)"
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
        <component :is="currentComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import ProductDescription from "@/views/ProductDescription.vue";
import ProductDelivery from "@/views/ProductDelivery.vue";

export default {
  //mixins changeRating()
  name: "ProductDetails",
  components: {
    ProductDescription,
    ProductDelivery,
  },
  data() {
    return {
      product: null,
      id: 3,
      currentTab: "Description",
      tabs: ["Description", "Delivery"],
    };
  },
  computed: {
    currentComponent() {
      return "product-" + this.currentTab.toLowerCase();
    },
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

<style lang="scss" scoped>
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
