import { shallowMount } from '@vue/test-utils'
import VTNSprite from '@/components/VTNSprite.vue'

describe('VTNSprite', () => {
    let wrapper = shallowMount(VTNSprite)

    it('dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('VTNSprite')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })
})
