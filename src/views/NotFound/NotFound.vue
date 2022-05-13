<template>
  <div class="errorBlock">
    <h4>Oops! No such {{ resource }}</h4>
    <router-link :to="{ name: 'MainPage' }" class="back"
      >Back to the home page</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
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
