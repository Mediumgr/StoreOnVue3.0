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
        </div>
        <div class="mango__color__size">
          <h3 class="text__mango">{{ product.name }}</h3>
          <div class="color__size">
            <p class="size">Size: <span class="font">XII</span></p>
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
            v-model="quantity"
          />
        </div>
        <div class="free__word">FREE</div>
        <div class="total">{{ price }} &#36;</div>
        <div class="times__circle" @click="openModal">
          <i class="fas fa-times-circle"></i>
        </div>
        <Teleport to="body">
          <modal-window
            v-if="open"
            @close="open = false"
            @remove="$emit('remove', this.product)"
          ></modal-window>
        </Teleport>
      </div>
    </div>
  </section>
</template>

<script>
import ModalWindow from "@/views/ModalWindow/ModalWindow.vue";

export default {
  emits: ["remove"],
  components: {
    ModalWindow,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      quantity: this.product.quantity,
      open: false,
    };
  },
  methods: {
    openModal() {
      this.open = true;
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
</style>
