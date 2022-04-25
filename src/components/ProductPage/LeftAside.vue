<template>
  <nav class="category__menu">
    <details>
      <summary class="category">
        Category<i class="fas fa-caret-down category__arrow"></i>
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
      <summary class="brand__details">
        brand<i class="fas fa-caret-down brand__arrow"></i>
      </summary>
      <ul>
        <li class="category__link" v-for="name in categoryLink" :key="name">
          {{ name }}
        </li>
      </ul>
    </details>
    <details>
      <summary class="designer__details">
        designer<i class="fas fa-caret-down designer__arrow"></i>
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
    };
  },
};
</script>

<style lang="scss" scoped></style>
