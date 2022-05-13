<template>
  <h3 class="product">{{ product.description[0] }}</h3>
  <div class="product" v-for="(item, index) in product.description" :key="item">
    <h5
      v-if="
        item !== product.description[0] &&
        item !== product.description[5] &&
        item !== product.description[4]
      "
    >
      {{ product.description[index] }}
    </h5>
    <h5 v-if="item === product.description[4]">
      Color: {{ product.description[4] }}
    </h5>
  </div>
  <p class="product">{{ product.description[5] }}</p>
  <h5 class="costProduct">
    Price:
    <p class="priceProduct">{{ "&#36;" + product.price }}</p>
  </h5>
  <div class="posts">
    <ul>
      <li
        v-for="post in posts"
        :key="post"
        :class="{
          selected: currentPost === post || currentPost.id === post.id,
        }"
        @click="currentPost = post"
      >
        {{ post.title }}
      </li>
    </ul>
    <div class="selectedPost">
      <div v-if="currentPost.content" v-html="currentPost.content"></div>
      <div v-if="!currentPost.content">
        <p>Choose your size:</p>
      </div>
      <div class="choose__input" v-if="!currentPost.content">
        <select class="choose__your_size" v-model="yourSize">
          <option v-for="size in sizes" :key="size">{{ size }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["sizeEmit"],
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      currentPost: {},
      posts: [],
      sizes: ["S", "XS", "M", "L", "XXL"],
      yourSize: "S",
    };
  },
  watch: {
    yourSize(newValue) {
      this.$emit("sizeEmit", newValue);
    },
  },
  created() {
    this.$router.push({ name: "ProductDetails" });
  },
  mounted() {
    this.$emit("sizeEmit", this.yourSize);
    this.currentPost = this.product.posts[1];
    this.posts = this.product.posts;
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
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
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

.choose__your_size {
  outline: none;
  height: 35px;
  width: 144px;
  padding-left: 15px;
  border: 1px solid black;
  font-size: 13px;
  text-align: center;
  line-height: 24px;
}
</style>
