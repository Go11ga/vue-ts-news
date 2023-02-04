import { shallowMount } from '@vue/test-utils'
import VTNPreloader from '@/components/VTNPreloader.vue'

describe('VTNPreloader', () => {
    let wrapper = shallowMount(VTNPreloader)

    it('dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('VTNPreloader')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })
})
