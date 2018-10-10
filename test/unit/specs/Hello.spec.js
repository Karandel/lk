import Vue from 'vue'
import Hello from '@/components/HelloWorld'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('First, solve the problem. Then, write the code')
  })
})
