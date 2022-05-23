<template>
  <div class="nav">
    <ul class="menu center">
      <li class="menu__list">
        <router-link :to="{ name: 'MainPage' }" class="menu__link"
          >Home</router-link
        >
      </li>
      <li class="menu__list">
        <p class="menu__link">Women</p>
        <div class="drop">
          <div class="drop__flex">
            <h3 class="drop__h3">Women</h3>
            <ul class="drop__ul">
              <li v-for="cloth in clothes" :key="cloth">
                <router-link :to="{ name: 'ProductPage' }" class="drop__a">{{
                  cloth
                }}</router-link>
              </li>
            </ul>
          </div>
          <div class="drop__flex">
            <h3 class="drop__h3">Women</h3>
            <ul class="drop__ul">
              <li v-for="good in goods" :key="good">
                <router-link :to="{ name: 'ProductPage' }" class="drop__a">{{
                  good
                }}</router-link>
              </li>
            </ul>
            <h3 class="drop__h3">Women</h3>
            <ul class="drop__ul">
              <li v-for="output in outputs" :key="output">
                <router-link :to="{ name: 'ProductPage' }" class="drop__a">{{
                  output
                }}</router-link>
              </li>
            </ul>
          </div>
          <div class="drop__flex">
            <h3 class="drop__h3">Best Sale</h3>
            <ul class="drop__ul">
              <li v-for="good in goods" :key="good">
                <router-link :to="{ name: 'ProductPage' }" class="drop__a">{{
                  good
                }}</router-link>
              </li>
            </ul>
            <div class="sale">
              <img src="@/assets/img/supersale.jpg" alt="SALE" title="SALE" />
            </div>
          </div>
        </div>
      </li>
      <li class="menu__list" v-for="sale in bestSale" :key="sale">
        <router-link :to="{ name: 'ProductPage' }" class="menu__link">{{
          sale
        }}</router-link>
      </li>
      <li class="menu__list">
        <p class="menu__link">Hot Deals</p>
        <div class="drop drop__last">
          <div class="drop__flex">
            <h3 class="drop__h3">Best Sale</h3>
            <ul class="drop__ul">
              <li v-for="cloth in clothes" :key="cloth">
                <router-link :to="{ name: 'ProductPage' }" class="drop__a">{{
                  cloth
                }}</router-link>
              </li>
            </ul>
          </div>
          <div class="drop__flex">
            <h3 class="drop__h3">Clearance</h3>
            <ul class="drop__ul">
              <li v-for="good in goods" :key="good">
                <router-link :to="{ name: 'ProductPage' }" class="drop__a">{{
                  good
                }}</router-link>
              </li>
            </ul>
            <h3 class="drop__h3">Sale</h3>
            <ul class="drop__ul">
              <li v-for="output in outputs" :key="output">
                <router-link :to="{ name: 'ProductPage' }" class="drop__a">{{
                  output
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    clothes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      bestSale: ["Man", "Kids", "Accessories", "Featured"],
    };
  },
  computed: {
    goods() {
      return this.clothes.slice(0, 4);
    },
    outputs() {
      return this.clothes.slice(0, 3);
    },
  },
};
</script>
