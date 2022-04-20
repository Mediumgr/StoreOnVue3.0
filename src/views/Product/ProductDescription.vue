<template>
  <h3 class="product">{{ product.description[0] }}</h3>
  <div class="product" v-for="(item, index) in product.description" :key="item">
    <h5
      v-if="item !== product.description[0] && item !== product.description[5]"
    >
      {{ product.description[index] }}
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
      <div v-html="currentPost.content"></div>
    </div>
  </div>
</template>

<script>
export default {
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
    };
  },
  mounted() {
    this.currentPost = this.product.selectedPost;
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
