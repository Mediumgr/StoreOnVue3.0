<template>
  <section class="center">
    <div class="product__data__line">
      <div class="myProduct">
        <div class="img__product__for__guy">
          <img
            :src="require(`@/assets/img/${product.img}`)"
            alt="photo"
            class="image"
          />
          <router-link
            :to="{ name: 'ProductDetails', params: { id: product.id } }"
          >
            <div class="changeSize">change size here</div>
          </router-link>
        </div>
        <div class="mango__color__size">
          <h3 class="text__mango">{{ product.name }}</h3>
          <div class="color__size">
            <p class="size">
              Size: <span class="font">{{ product.size }}</span>
            </p>
            <p class="size">
              Color: <span class="font">{{ product.color }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="myProductDescription">
        <div class="cost">{{ product.price }} &#36;</div>
        <div class="how__many">
          <input
            type="number"
            min="1"
            max="50"
            class="digits"
            v-model.lazy="quantity"
          />
        </div>
        <div class="free__word">FREE</div>
        <div class="total">{{ price }} &#36;</div>
        <div class="times__circle" @click="$emit('remove', this.product)">
          <i class="fas fa-times-circle"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  emits: ["remove"],
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      quantity: this.product.quantity,
    };
  },
  methods: {},
  computed: {
    price() {
      return this.quantity * this.product.price;
    },
  },
  watch: {
    quantity(newValue) {
      let updatedProduct = { ...this.product, quantity: newValue };
      this.$store.dispatch("updateProduct", updatedProduct);
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 100px;
  height: 115px;
}

.myProduct {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.myProductDescription {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 524px;
}
.changeSize {
  font-size: 11px;
  text-align: center;
  color: rgb(132, 66, 52);
  cursor: pointer;
}
</style>
