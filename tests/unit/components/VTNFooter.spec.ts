import { shallowMount } from '@vue/test-utils'
import VTNFooter from '@/components/VTNFooter.vue'

describe('VTNFooter', () => {
    let wrapper = shallowMount(VTNFooter)

    it('dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('VTNFooter')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })
})
