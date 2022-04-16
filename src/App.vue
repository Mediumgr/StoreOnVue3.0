<template>
  <header>
    <nav-bar></nav-bar>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer-block></footer-block>
</template>

<script>
import NavBar from "@/components/Header/NavBar.vue";
import FooterBlock from "@/components/Footer/FooterBlock.vue";

export default {
  components: { NavBar, FooterBlock },
};
</script>
