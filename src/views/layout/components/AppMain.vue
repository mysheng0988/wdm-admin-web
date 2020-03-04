<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <div>
        <tabs></tabs>
        <router-view></router-view>
      </div>
    </transition>
  </section>
</template>

<script>
import Tabs from "./tabs";
export default {
  name: 'AppMain',
  components: {Tabs},
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
