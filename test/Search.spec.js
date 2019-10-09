import { shallowMount } from '@vue/test-utils'
import Search from '~/components/Search'

describe('Search', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Search)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
