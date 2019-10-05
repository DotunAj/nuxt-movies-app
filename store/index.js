import axios from 'axios'

export const state = () => ({
  baseImageUrl: {},
  genreList: []
})

export const mutations = {
  SET_BASE_IMAGE_URL(state, url) {
    state.baseImageUrl = url
  },

  SET_GENRE_LIST(state, list) {
    state.genreList = list
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    if (!this.$cookie.get('config')) {
      axios
        .get(
          `https://api.themoviedb.org/3/configuration?api_key=${process.env.apiKey}`
        )
        .then((res) => {
          commit('SET_BASE_IMAGE_URL', res.data)
          this.$cookie.set('config', res.data, {
            maxAge: 60 * 60 * 24 * 7
          })
        })
    } else {
      commit('SET_BASE_IMAGE_URL', this.$cookie.get('config'))
    }

    if (!this.$cookie.get('genres')) {
      axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.apiKey}`
        )
        .then((res) => {
          commit('SET_GENRE_LIST', res.data.genres)
          this.$cookie.set('genres', res.data, {
            maxAge: 60 * 60 * 24 * 7
          })
        })
    } else {
      commit('SET_GENRE_LIST', this.$cookie.get('genres').genres)
    }
  }
}
