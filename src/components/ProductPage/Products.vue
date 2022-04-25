<template>
  <div class="content__product center">
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
          <li class="category__link">Adidas</li>
          <li class="category__link">Reebok</li>
          <li class="category__link">Nike</li>
        </ul>
      </details>
      <details>
        <summary class="designer__details">
          designer<i class="fas fa-caret-down designer__arrow"></i>
        </summary>
        <ul>
          <li class="category__link">First</li>
          <li class="category__link">Second</li>
          <li class="category__link">Third</li>
        </ul>
      </details>
    </nav>
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
        <v-container>
          <div class="price__data">price</div>
          <v-row>
            <v-range-slider v-model="value" label="Range"></v-range-slider>
          </v-row>
        </v-container>
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
            <option value="price">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div class="page__sorting">
          <div class="Sort">Show</div>
          <select name="page" id="page" class="SortByNumber">
            <option value="show__page">09</option>
            <option value="show__page">08</option>
            <option value="show__page">07</option>
            <option value="show__page">06</option>
            <option value="show__page">05</option>
          </select>
        </div>
      </form>
    </div>
    <div class="block__of__product">
      <div class="myProduct">
        <a href="#"
          ><img
            class="product__img"
            :src="require('@/assets/img/1.png')"
            alt="photo"
        /></a>
        <div class="bottom">
          <a href="#" class="text__mango">Mango People T-shirt</a>
          <p class="price">&#36;52.00</p>
        </div>
        <a href="#" class="add__cart"
          ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
          Cart</a
        >
      </div>
      <div class="myProduct">
        <a href="#"
          ><img
            class="product__img"
            :src="require('@/assets/img/2.png')"
            alt="photo"
        /></a>
        <div class="bottom">
          <a href="#" class="text__mango">Mango People T-shirt</a>
          <p class="price">&#36;52.00</p>
        </div>
        <a href="#" class="add__cart"
          ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
          Cart</a
        >
      </div>
      <div class="myProduct">
        <a href="#"
          ><img
            class="product__img"
            :src="require('@/assets/img/barberman.png')"
            alt="photo"
        /></a>
        <div class="bottom">
          <a href="#" class="text__mango">Mango People T-shirt</a>
          <p class="price">
            &#36;52.00<img
              class="product__star"
              :src="require('@/assets/img/star.png')"
              alt="star"
            />
          </p>
        </div>
        <a href="#" class="add__cart"
          ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
          Cart</a
        >
      </div>
      <div class="myProduct">
        <a href="#"
          ><img
            class="product__img"
            :src="require('@/assets/img/4.png')"
            alt="photo"
        /></a>
        <div class="bottom">
          <a href="#" class="text__mango">Mango People T-shirt</a>
          <p class="price">&#36;52.00</p>
        </div>
        <a href="#" class="add__cart"
          ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
          Cart</a
        >
      </div>
      <div class="myProduct">
        <a href="#"
          ><img
            class="product__img"
            :src="require('@/assets/img/5.png')"
            alt="photo"
        /></a>
        <div class="bottom">
          <a href="#" class="text__mango">Mango People T-shirt</a>
          <p class="price">&#36;52.00</p>
        </div>
        <a href="#" class="add__cart"
          ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
          Cart</a
        >
      </div>
      <div class="myProduct">
        <a href="#"
          ><img
            class="product__img"
            :src="require('@/assets/img/6.png')"
            alt="photo"
        /></a>
        <div class="bottom">
          <a href="#" class="text__mango">Mango People T-shirt</a>
          <p class="price">&#36;52.00</p>
        </div>
        <a href="#" class="add__cart"
          ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
          Cart</a
        >
      </div>
      <div class="myProduct">
        <a href="#"
          ><img
            class="product__img"
            :src="require('@/assets/img/guyjacket.png')"
            alt="photo"
        /></a>
        <div class="bottom">
          <a href="#" class="text__mango">Mango People T-shirt</a>
          <p class="price">&#36;52.00</p>
        </div>
        <a href="#" class="add__cart"
          ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
          Cart</a
        >
      </div>
      <div class="myProduct">
        <a href="#"
          ><img
            class="product__img"
            :src="require('@/assets/img/7.png')"
            alt="photo"
        /></a>
        <div class="bottom">
          <a href="#" class="text__mango">Mango People T-shirt</a>
          <p class="price">&#36;52.00</p>
        </div>
        <a href="#" class="add__cart"
          ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
          Cart</a
        >
      </div>
      <div class="myProduct">
        <a href="#"
          ><img
            class="product__img"
            :src="require('@/assets/img/8.png')"
            alt="photo"
        /></a>
        <div class="bottom">
          <a href="#" class="text__mango">Mango People T-shirt</a>
          <p class="price">&#36;52.00</p>
        </div>
        <a href="#" class="add__cart"
          ><img :src="require('@/assets/img/white_bin.png')" alt="buy" />Add to
          Cart</a
        >
      </div>
    </div>
    <div class="viewAllBlock">
      <nav class="listed__pages">
        <a href="#"><i class="fas fa-angle-left left__pink__arrow"></i></a>
        <a href="#" class="numberOfPages">1</a>
        <a href="#" class="numberOfPages">2</a>
        <a href="#" class="numberOfPages">3</a>
        <a href="#" class="numberOfPages">4</a>
        <a href="#" class="numberOfPages">5</a>
        <span>
          <a href="#" class="numberOfPages">6</a>
          <a href="#" class="numberOfPages">.....</a>
          <a href="#" class="numberOfPages">20</a>
        </span>
        <a href="#"><i class="fas fa-angle-right right__pink__arrow"></i></a>
      </nav>
      <button class="view__all__button">View All</button>
    </div>
  </div>
  <div class="InformationCenter center">
    <div class="blockInformationDelivery">
      <div class="truckImg">
        <img :src="require('@/assets/img/truck.png')" alt="truck" />
      </div>
      <div class="firstInfo">
        <h3 class="free freeStyle">Free Delivery</h3>
        <h4 class="delivery deliveryInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
    <div class="blockInformationDiscount">
      <div class="circleImg">
        <img :src="require('@/assets/img/circle.png')" alt="discount" />
      </div>
      <div class="secondInfo">
        <h3 class="sales salesStyle">Sales &amp; discounts</h3>
        <h4 class="discounts salesInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
    <div class="blockInformationQuality">
      <div class="crownImg">
        <img :src="require('@/assets/img/korona.png')" alt="crown" />
      </div>
      <div class="thirdInfo">
        <h3 class="quality qualityStyle">Quality assurance</h3>
        <h4 class="assurance qualityInformation">
          Worldwide delivery on all. Authorit tively morph next-generation
          innovtion with extensive models.
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductPage",
  data() {
    return {
      categoryList: [
        "Accessories",
        "Bags",
        "Denim",
        "Hoodies &#38; Sweatshirts",
        "Jackets &#38; Coats",
        "Pants",
        "Polos",
        "Shirts",
        "Shoes",
        "Shorts",
        "Sweaters &#38; Knits",
        "T-Shirts Tanks",
      ],
      value: [20, 40],
    };
  },
};
</script>

<style scoped></style>
