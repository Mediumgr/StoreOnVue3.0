<template>
  <div class="errorBlock">
    <h4>Oops! There was an error:</h4>
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: "Error",
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
</style>
