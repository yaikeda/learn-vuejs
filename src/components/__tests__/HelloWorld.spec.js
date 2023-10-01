import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {props: {msg: 'HelloVite!'}})
    expect(wrapper.find('.green').exists()).toBe(true)
    expect(wrapper.get('.green').text()).toEqual('HelloVite!')
  })
})
