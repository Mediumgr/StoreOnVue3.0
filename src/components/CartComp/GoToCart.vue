<template>
  <div class="header__options center">
    <div class="product__details">Product Details</div>
    <div class="all__details">
      <h3 class="details" v-for="detail in details" :key="detail">
        {{ detail }}
      </h3>
    </div>
  </div>
  <cart-products
    v-for="product in cart"
    :key="product"
    :product="product"
    @remove="remove"
  ></cart-products>
  <form>
    <div class="choose center">
      <div>
        <button class="push">CLEAR SHOPPING CART</button>
      </div>
      <div>
        <button class="push">CONTINUE SHOPPING</button>
      </div>
    </div>
  </form>
  <form>
    <div class="fill__your__information center">
      <div class="shipping">
        <h2 class="shipping__address">Shipping Address</h2>
        <select class="city">
          <option value="Russia">Russia</option>
          <option value="Spain">Spain</option>
          <option value="US">United States</option>
        </select>
        <input required type="text" placeholder="State" class="state" />
        <input
          required
          type="number"
          placeholder="Postcode / Zip"
          class="zip"
        />
        <button class="get__quote">get a quote</button>
      </div>
      <div class="coupon">
        <h2 class="coupon__discount">coupon discount</h2>
        <p class="enter__coupon">
          <label for="state">Enter your coupon code if you have one</label>
        </p>
        <input type="text" id="state" placeholder="State" class="state" />
        <button class="apply__coupon">Apply coupon</button>
      </div>
      <div class="amount">
        <p class="sub__total">
          Sub total <span class="sub__amount">TOTAL</span>
        </p>
        <p class="grand__total">
          GRAND TOTAL <span class="total__amount">$900</span>
        </p>
        <div class="line__amount"></div>
        <button class="proceed">proceed to checkout</button>
      </div>
    </div>
  </form>
</template>

<script>
import CartProducts from "@/components/CartComp/CartProducts.vue";
import { mapState } from "vuex";
/* import NProgress from "nprogress"; */
export default {
  components: {
    CartProducts,
  },
  data() {
    return {
      details: ["unite Price", "quantity", "shipping", "subtotal", "action"],
    };
  },
  methods: {
    remove(product) {
      this.$store.dispatch("remove", product).catch((error) => {
        this.$router.push({ name: "ErrorDisplay", params: { error: error } });
      });
    },
  },
  computed: {
    ...mapState(["cart"]),
  },
};
</script>

<style lang="scss" scoped></style>
