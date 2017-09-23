import Vue from 'vue'
import Carousel from '@/components/Carousel'
import { MovieEntry } from '@/models/MovieEntry'

describe('Carousel.vue', () => {
  it('activeIndex should shift right properly', () => {
    let propsData = {
      entries: [new MovieEntry({ images: [] }), new MovieEntry({ images: [] }), new MovieEntry({ images: [] })]
    }
    const Constructor = Vue.extend(Carousel)
    const vm = new Constructor({propsData: propsData}).$mount()
    // Init activeIndex to 0
    vm.shiftActiveItem(1)
    expect(vm.activeIndex).to.equal(0)
    // Then right to 1
    vm.shiftActiveItem(1)
    expect(vm.activeIndex).to.equal(1)
    // No more than the length of entries
    vm.shiftActiveItem(1)
    vm.shiftActiveItem(1)
    vm.shiftActiveItem(1)
    expect(vm.activeIndex).to.equal(2)
  })

  it('activeIndex should shift left properly', () => {
    let propsData = {
      entries: [new MovieEntry({ images: [] }), new MovieEntry({ images: [] }), new MovieEntry({ images: [] })]
    }
    const Constructor = Vue.extend(Carousel)
    const vm = new Constructor({propsData: propsData}).$mount()
    // Init activeIndex to 0
    vm.shiftActiveItem(1)
    expect(vm.activeIndex).to.equal(0)
    // Then shift left but still keep as 0
    vm.shiftActiveItem(-1)
    expect(vm.activeIndex).to.equal(0)
  })
})
