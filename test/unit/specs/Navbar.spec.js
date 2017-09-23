import Vue from 'vue'
import Navbar from '@/components/Navbar'

describe('Hello.vue', () => {
  it('should render correct title', () => {
    const Constructor = Vue.extend(Navbar)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.navbar-title').textContent)
      .to.equal('Demo project')
  })
})
