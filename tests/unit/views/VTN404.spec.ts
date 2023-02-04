import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import VTN404 from '@/views/VTN404.vue'

describe('VTN404', () => {
    let wrapper: any
    const mutations = {
        SET_ACTIVE_CHANNEL: jest.fn()
    }

    const store = createStore({
        mutations
    })

    wrapper = shallowMount(VTN404, {
        global: {
            stubs: ['router-link'],
            plugins: [store]
        }
    })

    it('dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('VTN404')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('хук mutation', () => {
        expect(typeof VTN404.mounted).toBe('function')

        wrapper.vm.SET_ACTIVE_CHANNEL = jest.fn()

        wrapper.vm.$options.mounted.call(wrapper.vm)
        
        expect(wrapper.vm.SET_ACTIVE_CHANNEL).toBeCalledWith('')
    })
})
