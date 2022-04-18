<template>
  <h3 class="product">Long jacket with hood</h3>
  <h5 class="product">Model: 1L121005M/50313N/7901N</h5>
  <h5 class="product">Compound: PE 100%</h5>
  <h5 class="product">Line: Lab</h5>
  <h5 class="product">Color: blue</h5>
  <p class="product">
    Warm quilted jacket with stand-up collar. The model is fastened with a
    zipper. Pair the jacket with your favorite everyday pieces - jeans,
    sweatshirts, hoodies, sneakers - and you'll always have a laid-back casual
    look. And the discreet design allows you to wear the jacket with formal suit
    combinations for the office and important meetings. Versatility, comfort and
    warmth in one product!
  </p>
  <h5 class="costProduct">
    Price:
    <p class="priceProduct">45$</p>
  </h5>
  <div class="posts">
    <ul>
      <li
        v-for="post in posts"
        :key="post"
        :class="{
          selected: selectedPost === post || selectedPost.id === post.id,
        }"
        @click="selectedPost = post"
      >
        {{ post.title }}
      </li>
    </ul>
    <div class="selectedPost">
      <div v-html="selectedPost.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Payment",
          content:
            "<div><p>Payment for the order in cash to the courier upon delivery of the goods.You can pay the order to the courier in cash in rubles directly at the time of delivery or by credit card</p></div>",
        },
        {
          id: 2,
          title: "Sizes",
          content: "<p>Available sizes: S, M, L</p>",
        },
      ],
      selectedPost: {
        id: 1,
        title: "Payment",
        content:
          "<div><p>Payment for the order in cash to the courier upon delivery of the goods.You can pay the order to the courier in cash in rubles directly at the time of delivery or by credit card</p></div>",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.product {
  padding-top: 10px;
}

.costProduct {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px 0;
}

.priceProduct {
  font-size: 16px;
  font-weight: bold;
  color: #f16d7f;
  padding: 0 0 0 10px;
}

.posts {
  display: flex;
  min-height: 100px;
  border: 1px solid black;
}

.selectedPost {
  padding: 10px;
}

ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

li {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 10px;
  cursor: pointer;
}

.selected {
  background: #f16d7f;
  color: white;
}
</style>
