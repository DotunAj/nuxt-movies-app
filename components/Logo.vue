<template>
  <div class="logo">
    <nuxt-link to="/">
      <Film />Movie
      <span>App</span>
    </nuxt-link>
  </div>
</template>

<script>
import Film from '@/components/svg/Film'
export default {
  components: {
    Film
  }
}
</script>

<style scoped>
span {
  padding-left: 5px;
}
</style>
