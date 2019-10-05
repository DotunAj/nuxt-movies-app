<template>
  <div class="category">
    <h3>Browse by category</h3>
    <div class="cat-sections">
      <ul>
        <li v-for="genre in genres" :key="genre.id" :class="selected(genre.id)">
          <a @click="changeCategory(genre.id)" v-html="genre.name"></a>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <CategoryItem v-if="!loading" :cat-movies="catMovies" />
    </transition>
    <nuxt-link class="cat__more-link" :to="'/genre/' + genreId"
      >View More</nuxt-link
    >
  </div>
</template>

<script>
import CategoryItem from '~/components/category/CategoryItem'
export default {
  components: {
    CategoryItem
  },
  props: {
    catMovies: {
      type: Array,
      default: () => {}
    },
    changeCategory: {
      type: Function,
      default: () => {}
    },
    loading: Boolean,
    genreId: {
      type: Number,
      default: 28
    }
  },
  data() {
    return {
      genres: [
        { name: '&#128293 Action', id: 28 },
        { name: '&#128081 Adventure', id: 12 },
        { name: '&#127775 Fantasy', id: 14 },
        { name: '&#128150 Romance', id: 10749 }
      ]
    }
  },
  methods: {
    selected(id) {
      let styleClass = ''
      if (this.genreId === id) {
        styleClass = 'selected'
      }
      return styleClass
    }
  }
}
</script>

<style scoped>
.cat-sections a {
  cursor: pointer;
}
</style>
