<template>
  <div class="search">
    <div class="search-svg">
      <Search />
    </div>
    <input
      v-model="search"
      type="text"
      placeholder="Search for movie"
      @keyup.enter="searchMovie()"
    />
  </div>
</template>

<script>
import Search from '~/components/svg/Search'

export default {
  components: {
    Search
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    searchMovie() {
      if (this.search.length > 0) {
        this.$router.push(`/search/${this.search}`)
      }
    }
  }
}
</script>
