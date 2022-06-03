<template>
  <nav class="category__menu">
    <details>
      <summary class="category" @click="currentSummaryOne">
        Category<i
          class="fas fa-caret-down category__arrow"
          v-if="currentOne === 1"
        ></i>
        <i class="fas fa-caret-up category__arrow" v-else></i>
      </summary>
      <ul>
        <li
          class="category__link"
          v-for="category in categoryList"
          :key="category"
        >
          {{ category }}
        </li>
      </ul>
    </details>
    <details>
      <summary class="brand__details" @click="currentSummaryTwo">
        brand<i
          class="fas fa-caret-down brand__arrow"
          v-if="currentTwo === 1"
        ></i>
        <i class="fas fa-caret-up brand__arrow" v-else></i>
      </summary>
      <ul>
        <li class="category__link" v-for="name in categoryLink" :key="name">
          {{ name }}
        </li>
      </ul>
    </details>
    <details>
      <summary class="designer__details" @click="currentSummaryThree">
        designer<i
          class="fas fa-caret-down designer__arrow"
          v-if="currentThree === 1"
        ></i>
        <i class="fas fa-caret-up designer__arrow" v-else></i>
      </summary>
      <ul>
        <li class="category__link" v-for="digit in digits" :key="digit">
          {{ digit }}
        </li>
      </ul>
    </details>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [
        "Accessories",
        "Bags",
        "Denim",
        "Hoodies & Sweatshirts",
        "Jackets & Coats",
        "Pants",
        "Polos",
        "Shirts",
        "Shoes",
        "Shorts",
        "Sweaters & Knits",
        "T-Shirts Tanks",
      ],
      categoryLink: ["Adidas", "Reebok", "Nike"],
      numbers: ["09", "08", "07", "06", "05"],
      digits: ["First", "Second", "Third"],
      currentOne: 1,
      currentTwo: 1,
      currentThree: 1,
    };
  },
  methods: {
    currentSummaryOne() {
      this.currentOne === 1 ? (this.currentOne = 2) : (this.currentOne = 1);
    },
    currentSummaryTwo() {
      this.currentTwo === 1 ? (this.currentTwo = 2) : (this.currentTwo = 1);
    },
    currentSummaryThree() {
      this.currentThree === 1
        ? (this.currentThree = 2)
        : (this.currentThree = 1);
    },
  },
};
</script>
