<template>
  <Movie :movie="computedMovie" :backdrops="computedBackdrops" />
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

      return movie
    },
    computedBackdrops() {
      const backdrops = this.backdropsArray

      backdrops.map((backdrop) => {
        backdrop.backdropUrl = `${this.baseImageUrl}/w500${backdrop.file_path}`
      })

      return backdrops
    }
  },
  async asyncData({ params }) {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.apiKey}&language=en-US`
    )

    const images = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}/images?api_key=${process.env.apiKey}`
    )

    return {
      movieObject: movie.data,
      backdropsArray: images.data.backdrops
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
