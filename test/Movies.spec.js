import { shallowMount } from '@vue/test-utils'
import Movies from '~/components/movies/Movies'

const props = {
  movies: [
    {
      popularity: 1,
      posterUrl: 'mybackdrop.com/image1',
      original_title: 'A new Hope',
      releaseYear: 2019,
      genre: 'Action',
      vote_average: 7.0,
      vote_count: 500
    },
    {
      popularity: 2,
      posterUrl: 'mybackdrop.com/image2',
      original_title: 'The rise of the empire',
      releaseYear: 2019,
      genre: 'Adventure',
      vote_average: 8.0,
      vote_count: 1000
    },
    {
      popularity: 3,
      posterUrl: 'mybackdrop.com/image3',
      original_title: 'I am your father',
      releaseYear: 2019,
      genre: 'Romance',
      vote_average: 6.0,
      vote_count: 1500
    }
  ],
  title: 'Action'
}

describe('CategoryItem', () => {
  test('it should render the correct content', () => {
    const wrapper = shallowMount(Movies)
    wrapper.setProps(props)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
