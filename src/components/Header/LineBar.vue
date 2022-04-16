<template>
  <div class="nav">
    <ul class="menu center">
      <li class="menu__list">
        <a href="#" class="menu__link">Home</a>
      </li>
      <li class="menu__list">
        <a href="#" class="menu__link">Women</a>
        <div class="drop">
          <div class="drop__flex">
            <h3 class="drop__h3">Women</h3>
            <ul class="drop__ul">
              <li v-for="cloth in clothes" :key="cloth">
                <a href="#" class="drop__a">{{ cloth }}</a>
              </li>
            </ul>
          </div>
          <div class="drop__flex">
            <h3 class="drop__h3">Women</h3>
            <ul class="drop__ul">
              <li v-for="good in goods" :key="good">
                <a href="#" class="drop__a">
                  {{ good }}
                </a>
              </li>
            </ul>
            <h3 class="drop__h3">Women</h3>
            <ul class="drop__ul">
              <li v-for="output in outputs" :key="output">
                <a href="#" class="drop__a">
                  {{ output }}
                </a>
              </li>
            </ul>
          </div>
          <div class="drop__flex">
            <h3 class="drop__h3">Best Sale</h3>
            <ul class="drop__ul">
              <li v-for="good in goods" :key="good">
                <a href="#" class="drop__a">{{ good }}</a>
              </li>
            </ul>
            <div class="sale">
              <img src="@/assets/img/supersale.jpg" alt="SALE" title="SALE" />
            </div>
          </div>
        </div>
      </li>
      <li class="menu__list" v-for="sale in bestSale" :key="sale">
        <a href="#" class="menu__link">
          {{ sale }}
        </a>
      </li>
      <li class="menu__list">
        <a href="#" class="menu__link">Hot Deals</a>
        <div class="drop drop__last">
          <div class="drop__flex">
            <h3 class="drop__h3">Best Sale</h3>
            <ul class="drop__ul">
              <li v-for="cloth in clothes" :key="cloth">
                <a href="#" class="drop__a">{{ cloth }}</a>
              </li>
            </ul>
          </div>
          <div class="drop__flex">
            <h3 class="drop__h3">Clearance</h3>
            <ul class="drop__ul">
              <li v-for="good in goods" :key="good">
                <a href="#" class="drop__a">
                  {{ good }}
                </a>
              </li>
            </ul>
            <h3 class="drop__h3">Sale</h3>
            <ul class="drop__ul">
              <li v-for="output in outputs" :key="output">
                <a href="#" class="drop__a">
                  {{ output }}
                </a>
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
