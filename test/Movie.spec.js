import { shallowMount } from '@vue/test-utils'
import Movie from '~/components/movie/Movie'

const movie = {
  popularity: 1,
  posterUrl: 'mybackdrop.com/image1',
  original_title: 'A new Hope',
  releaseYear: 2019,
  runtime: 170,
  genre: 'Action',
  vote_average: 7.0,
  vote_count: 500,
  overview: 'lorem ipsum yada yada yada'
}

const backdrops = [
  {
    backdropUrl: 'img.jpg'
  },
  {
    backdropUrl: 'img.jpg'
  },
  {
    backdropUrl: 'img.jpg'
  },
  {
    backdropUrl: 'img.jpg'
  }
]

describe('Movie', () => {
  test('it should render the correct content', () => {
    const wrapper = shallowMount(Movie)
    wrapper.setProps({ movie, backdrops })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
