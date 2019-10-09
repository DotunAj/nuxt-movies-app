import { shallowMount } from '@vue/test-utils'
import Category from '~/components/category/Category'

const catMovies = [
  { id: 1, backdropUrl: 'mybackdrop.com/image1', original_title: 'A new Hope' },
  {
    id: 2,
    backdropUrl: 'mybackdrop.com/image2',
    original_title: 'The rise of the empire'
  },
  {
    id: 3,
    backdropUrl: 'mybackdrop.com/image3',
    original_title: 'I am your father'
  }
]

const genreId = 28

describe('Category', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Category, {
      stubs: ['nuxt-link']
    })
    wrapper.setProps({
      catMovies,
      changeCategory: (id) => {
        wrapper.setProps({ genreId: 12 })
      },
      genreId,
      loading: false
    })
  })
  test('it should render the correct content', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('changes style when button is clicked', () => {
    wrapper
      .findAll('a')
      .at(1)
      .trigger('click')
    expect(wrapper.html()).toContain(
      '<li class="selected"><a id="12">👑 Adventure</a></li>'
    )
    expect(wrapper.html()).not.toContain(
      '<li class="selected"><a id="28">🔥 Action</a></li>'
    )
  })
})
