<template>
  <div class="product__menu">
    <div class="trending">
      <div class="trending__now">trending now</div>
      <div class="name__product__first__row">
        <div class="bohemian">Bohemian</div>
        <div class="divider"></div>
        <div class="floral">Floral</div>
        <div class="divider"></div>
        <div class="lace">Lace</div>
      </div>
      <div class="name__product__second__row">
        <div class="floral__second__row">Floral</div>
        <div class="divider"></div>
        <div class="lace__second__row">Lace</div>
        <div class="divider"></div>
        <div class="bohemian__second__row">Bohemian</div>
      </div>
    </div>
    <div class="checkbox__block">
      <div class="check__size">size</div>
      <div class="checkbox__style__one">
        <div class="checkbox__XXS">
          <input type="checkbox" class="checkbox" id="xxs" />
          <label for="xxs" class="your__size">XXS</label>
        </div>
        <div class="checkbox__XS">
          <input type="checkbox" class="checkbox" id="xs" />
          <label for="xs" class="your__size">XS</label>
        </div>
        <div class="checkbox__S">
          <input type="checkbox" class="checkbox" id="s" />
          <label for="s" class="your__size">S</label>
        </div>
        <div class="checkbx__M">
          <input type="checkbox" class="checkbox" id="m" />
          <label for="m" class="your__size">M</label>
        </div>
      </div>
      <div class="checkbox__style__two">
        <div class="checkbox__L">
          <input type="checkbox" class="checkbox" id="l" />
          <label for="l" class="your__size">L</label>
        </div>
        <div class="checkbox__XL">
          <input type="checkbox" class="checkbox" id="xl" />
          <label for="xl" class="your__size">XL</label>
        </div>
        <div class="checkbox__XXL">
          <input type="checkbox" class="checkbox" id="xxl" />
          <label for="xxl" class="your__size">XXL</label>
        </div>
      </div>
    </div>
    <div class="price__product">
      <div class="price__data">price</div>
      <div class="scroll__price">
        <img :src="require('@/assets/img/priceRange.svg')" alt="price" />
      </div>
      <div class="limited__price">
        <div class="common__limit">$52</div>
        <div class="common__limit">$400</div>
      </div>
    </div>
  </div>
  <div class="select__form">
    <form class="sorting__line">
      <div class="sort__by__name">
        <div class="Sort">Sort By</div>
        <select name="SortBy" id="SortBy" class="SortBy">
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div class="page__sorting">
        <div class="Sort">Show</div>
        <select name="page" id="page" class="SortByNumber">
          <option value="show__page" v-for="num in numbers" :key="num">
            {{ num }}
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: ["09", "08", "07", "06", "05"],
    };
  },
};
</script>

<style lang="scss" scoped></style>
