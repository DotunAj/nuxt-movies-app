<template>
  <section class="left-section">
    <Movies :movies="nwMoviesComputed" :title="title" />
    <Category
      :loading="loading"
      :genre-id="genreId"
      :cat-movies="catMoviesComputed"
      :change-category="changeCategory"
    />
  </section>
</template>

<script>
import axios from 'axios'
import Movies from '~/components/movies/Movies'
import Category from '~/components/category/Category'
export default {
  components: { Movies, Category },
  data() {
    return {
      baseImageUrl: '',
      genres: [],
      loading: true,
      genreId: 0,
      title: 'Now Showing'
    }
  },

  computed: {
    nwMoviesComputed() {
      const computed = this.nwMovies
      computed.map((movie) => {
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
      return computed
    },
    catMoviesComputed() {
      let computed = []
      if (this.loading === false) {
        computed = this.catMovies.slice(0, 5)
        computed.map((movie) => {
          if (movie.backdrop_path) {
            movie.backdropUrl = `${this.baseImageUrl}/w500${movie.backdrop_path}`
          }
        })
        return computed
      }
      return computed
    }
  },
  async asyncData() {
    const nwMovies = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.apiKey}&language=en-US&page=1`
    )

    const catMovies = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28`
    )

    return {
      nwMovies: nwMovies.data.results,
      catMovies: catMovies.data.results
    }
  },
  created() {
    this.getBaseImageUrl()
    this.getGenres()
    this.genreId = 28
    this.loading = false
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
    },

    async changeCategory(genreId) {
      this.loading = true
      this.genreId = genreId
      const catMovies = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
      )

      if (catMovies) {
        this.catMovies = catMovies.data.results
        this.loading = false
      }
    }
  }
}
</script>
