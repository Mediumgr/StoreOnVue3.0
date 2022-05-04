<template>
  <section class="center">
    <div class="product__data__line" v-if="product">
      <div class="img__product__for__guy">
        <img
          :src="require(`@/assets/img/${product.img}`)"
          alt="photo"
          class="image"
        />
      </div>
      <div class="mango__color__size">
        <h3 class="text__mango">{{ product.name }}</h3>
        <div class="color__size">
          <p class="color">Color: <span class="font">Red</span></p>
          <p class="size">Size: <span class="font">XII</span></p>
        </div>
      </div>
      <div class="cost">{{ product.price }}</div>
      <div class="how__many">
        <input
          type="number"
          min="1"
          max="50"
          class="digits"
          v-model="quantity"
        />
      </div>
      <div class="free__word">FREE</div>
      <div class="total">{{ price }}</div>
      <div class="times__circle" @click="remove(product)">
        <i class="fas fa-times-circle"></i>
      </div>
    </div>
    <div v-if="!product" class="emptyProducts">
      There is no products in your cart, you can add it
      <router-link :to="{ name: 'ProductPage' }" class="here">
        here</router-link
      >
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
  methods: {
    remove(product) {
      let answer = window.confirm("Вы желаете удалить товар?");
      if (answer) {
        this.$emit("remove", product);
      }
    },
  },
  computed: {
    price() {
      return this.quantity * this.product.price;
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 100px;
  height: 115px;
}

.emptyProducts {
  display: flex;
  justify-content: center;
  height: 110px;
  align-items: center;
  color: red;
}

.here {
  color: blue;
  padding-left: 3px;
}
</style>
