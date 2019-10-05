<template>
  <div class="now-showing">
    <h3>{{ title }}</h3>
    <div class="nw-movies">
      <div v-for="movie in movies" :key="movie.popularity" class="nw-movie">
        <movie-item :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/movies/MovieItem'
export default {
  components: {
    MovieItem
  },
  props: {
    movies: {
      type: Array,
      default: () => {}
    },
    title: {
      type: String,
      default: 'Action'
    }
  }
}
</script>
