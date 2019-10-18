<template>
  <div class="cat-movies">
    <div
      v-for="movie in catMovies"
      :key="movie.id"
      class="cat-movie"
      :style="
        `background-image: linear-gradient(rgba(0,0,0, 0.04),rgba(0,0,0, 0.2),rgba(0,0,0, 0.2),rgba(0,0,0, 0.95)), url(${movie.backdropUrl ||
          '/noimage.png'});background-size: cover;`
      "
    >
      <h3>
        <nuxt-link :to="'/movie/' + movie.id">{{
          movie.original_title
        }}</nuxt-link>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    catMovies: {
      type: Array,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.cat-movie a {
  color: #fff;
  text-decoration: none;
}
.cat-sections a {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
