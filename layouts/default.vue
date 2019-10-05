<template>
  <div>
    <header>
      <Logo />
      <Search />
    </header>
    <nuxt />
  </div>
</template>

<script>
import Logo from '~/components/Logo'
import Search from '~/components/Search'

export default {
  components: {
    Logo,
    Search
  }
}
</script>
