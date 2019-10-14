<template>
  <section class="right-section">
    <div class="mv-description">
      <h3>{{ movie.original_title }}</h3>
      <p class="mv-genre">{{ movie.genre }}</p>
      <div class="foo">
        <p class="mv-rating">
          🔥
          {{ movie.vote_average }}<span>{{ movie.vote_count }}</span>
        </p>
        <p class="mv-year">
          <span>{{ movie.releaseYear }}</span
          >{{ movie.runtime }}min
        </p>
      </div>
    </div>
    <div class="mv-synopsis">
      <p>
        {{ movie.overview }}
      </p>
    </div>
    <div class="mv-images">
      <div class="mv-image image-1">
        <img :src="movie.posterUrl" alt="ps-1" />
      </div>
      <div class="mv-image image-2">
        <img :src="backdrops[1].backdropUrl" alt="ps-1" />
      </div>
      <div class="mv-image image-3">
        <img :src="backdrops[2].backdropUrl" alt="ps-1" />
      </div>
      <div class="mv-image image-4">
        <img :src="backdrops[3].backdropUrl" alt="ps-1" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => {}
    },
    backdrops: {
      type: Array,
      default: () => {}
    }
  }
}
</script>
