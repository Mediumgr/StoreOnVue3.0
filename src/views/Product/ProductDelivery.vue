<template>
  <div class="flexText">
    <p class="text">
      Your order will be delivered FREE of charge to the selected retail store.
    </p>
    <p class="text">
      DELIVERY is carried out FREE OF CHARGE across all Russia at the order from
      1000 rub. Delivery will be made to your nearest post office.
    </p>
    <p class="text">
      Delivery is carried out on orders in the amount of 299 rubles
    </p>
  </div>
</template>

<script>
export default {
  created() {
    this.$router.push({ name: "ProductDelivery" });
  },
};
</script>

<style lang="scss" scoped>
.flexText {
  display: flex;
  flex-direction: column;
}

.text {
  padding: 10px 0;
}
</style>
