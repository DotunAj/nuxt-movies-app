<template>
  <section class="left-section">
    <Movies :movies="computedMovies" :title="title" />
  </section>
</template>

<script>
import axios from 'axios'
import Movies from '~/components/movies/Movies'
export default {
  components: {
    Movies
  },
  data() {
    return {
      baseImageUrl: ''
    }
  },
  computed: {
    title() {
      let name = ''
      this.$store.state.genreList.map((genre) => {
        if (genre.id === parseInt(this.$route.params.id)) {
          name = genre.name
        }
      })

      return name
    },
    computedMovies() {
      const movies = this.moviesArray
      movies.map((movie) => {
        movie.posterUrl = `${this.baseImageUrl}w500${movie.poster_path}`
        movie.posterUrl = `${this.baseImageUrl}/w500${movie.poster_path}`
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
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${params.id}`
    )

    return { moviesArray: movies.data.results }
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
