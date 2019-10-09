import { shallowMount } from '@vue/test-utils'
import Logo from '~/components/Logo'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Logo, {
      stubs: ['nuxt-link', 'nuxt-view']
    })
    expect(wrapper.html()).toContain(`<div class="logo">`)
  })
})
