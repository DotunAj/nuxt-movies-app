<template>
  <div>
    <div class="image">
      <img :src="movie.posterUrl" :alt="movie.original_title" />
    </div>

    <div class="nw-description">
      <p class="title">
        {{ movie.original_title }}
      </p>
      <p class="genre">
        {{ movie.releaseYear }}
        <span>{{ movie.genre }}</span>
      </p>
      <div class="nw-ratings">
        <Star />

        <p>
          <span>{{ movie.vote_average }}</span>
          ({{ movie.vote_count }})
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '~/components/svg/Star'
export default {
  name: 'MovieItem',
  components: {
    Star
  },
  props: {
    movie: {
      default: () => {},
      type: Object
    }
  }
}
</script>

<style scoped>
span {
  display: inline-block;
}
</style>
