<template>
  <div class="search">
    <div class="search-svg">
      <Search />
    </div>
    <input type="text" placeholder="Search for movie" />
  </div>
</template>

<script>
import Search from '~/components/svg/Search'

export default {
  components: {
    Search
  }
}
</script>
