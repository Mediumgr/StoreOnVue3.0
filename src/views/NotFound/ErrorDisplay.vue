<template>
  <div class="errorBlock">
    <h4>Oops!</h4>
    <p>{{ error }}</p>
    <router-link :to="{ name: 'MainPage' }" class="back"
      >Back to the home page</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      required: true,
      default: "The page you are looking for not exist",
    },
  },
  created() {
    window.scroll(0, 0);
  },
};
</script>

<style lang="scss" scoped>
.errorBlock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
}
.back {
  padding-top: 40px;
}
</style>
