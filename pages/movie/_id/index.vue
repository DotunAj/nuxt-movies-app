<template>
  <Movie
    v-if="computedMovie"
    :movie="computedMovie"
    :backdrops="computedBackdrops"
  />

  <div v-else>
    <h3>Oppppppsssss....Movie not found</h3>
    <nuxt-link to="/">>Go back Home</nuxt-link>
  </div>
</template>

<script>
import axios from 'axios'
import Movie from '@/components/movie/Movie'
export default {
  components: {
    Movie
  },
  computed: {
    computedMovie() {
      const movie = this.movieObject
      if (movie) {
        movie.posterUrl = `${this.baseImageUrl}/w500${movie.poster_path}`
        movie.releaseYear = movie.release_date.slice(0, 4)
        movie.genre = ''
        movie.genres.map((genre, index) => {
          if (index === 0) {
            movie.genre += genre.name
          } else if (index !== 0) {
            movie.genre += ', ' + genre.name
          }
        })
      }

      return movie
    },
    computedBackdrops() {
      const backdrops = this.backdropsArray
      if (backdrops) {
        backdrops.map((backdrop) => {
          backdrop.backdropUrl = `${this.baseImageUrl}/w780${backdrop.file_path}`
        })
      }

      return backdrops
    }
  },
  async asyncData({ params }) {
    let movie
    try {
      movie = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.apiKey}&append_to_response=images`
      )
    } catch {
      return {
        movieObject: undefined,
        backdropsArray: undefined
      }
    }

    return {
      movieObject: movie.data,
      backdropsArray: movie.data.images.backdrops
    }
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
