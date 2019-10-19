<template>
  <section class="left-section">
    <Movies
      v-if="computedMovies.length"
      :movies="computedMovies"
      :title="'Search Result for: ' + search"
    />

    <div v-else>
      <h3>Oppppppsssss....No movie found with that name</h3>
      <nuxt-link to="/">>Go back Home</nuxt-link>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Movies from '@/components/movies/Movies'
export default {
  components: {
    Movies
  },
  data() {
    return {
      genres: {},
      baseImageUrl: ''
    }
  },
  computed: {
    computedMovies() {
      const movies = this.moviesArray
      movies.map((movie) => {
        if (movie.poster_path) {
          movie.posterUrl = `${this.baseImageUrl}/w500${movie.poster_path}`
        }
        movie.releaseYear = movie.release_date.slice(0, 4)
        movie.genre = ''
        movie.genre_ids.map((id, index) => {
          this.genres.map((genre) => {
            if (id === genre.id && index === 0) {
              movie.genre += genre.name
            } else if (id === genre.id && index !== 0) {
              movie.genre += ', ' + genre.name
            }
          })
        })
      })

      return movies
    }
  },
  async asyncData({ params }) {
    const movies = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.apiKey}&language=en-US&query=${params.query}&page=1&include_adult=false`
    )

    return { moviesArray: movies.data.results, search: params.query }
  },
  created() {
    this.getBaseImageUrl()
    this.getGenres()
  },
  methods: {
    getBaseImageUrl() {
      const baseImageUrl = this.$cookie.get('config')
      if (!baseImageUrl) {
        this.baseImageUrl = this.$store.state.baseImageUrl.images.secure_base_url
      } else {
        this.baseImageUrl = baseImageUrl.images.secure_base_url
      }
    },
    getGenres() {
      const genres = this.$cookie.get('genres')
      if (!genres) {
        this.genres = this.$store.state.genreList
      } else {
        this.genres = genres.genres
      }
    }
  }
}
</script>

<style scoped>
a {
  color: #fff;
  text-decoration: none;
}
</style>
