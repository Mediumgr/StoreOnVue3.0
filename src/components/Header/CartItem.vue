<template>
  <div class="order__first">
    <div class="rebox__img">
      <img :src="img" alt="your product" class="rebox__img_photo" />
    </div>
    <div class="flex__name__product">
      <a href="#" class="rebox__text">{{ cartItem.product_name }}</a>
      <div class="star"><img src="img/4star.jpg" alt="stars" /></div>
      <div class="price__for__order">
        {{ cartItem.quantity }} X {{ cartItem.quantity * cartItem.price }}$
      </div>
    </div>
    <div class="cross" @click="$emit('remove', cartItem)">
      <i class="fas fa-times-circle cross-circle"></i>
    </div>
  </div>
</template>

<script>
export default {};
</script>
