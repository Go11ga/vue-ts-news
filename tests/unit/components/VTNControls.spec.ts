import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import VTNControls from '@/components/VTNControls.vue'

describe('VTNControls', () => {
    let wrapper: any

    let setItem = jest.spyOn(Storage.prototype, 'setItem')
    let getItem = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => 'grid')

    const state = () => {
        return {
            news: {
                channels: [
                    { id: 1, code: 'all', title: 'Все' },
                    { id: 2, code: 'lenta', title: 'Lenta' },
                    { id: 3, code: 'bbc-news', title: 'BBC' }
                ],
                activeChannel: 'lenta'
            }
        }
    }

    const mutations = {
        SET_VIEW_MODE: jest.fn()
    }

    const store = createStore({
        state,
        mutations
    })

    beforeEach(() => {
        wrapper = shallowMount(VTNControls, {
            global: {
                stubs: ['router-link'],
                plugins: [store]
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('VTNControls')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('router links', () => {
        expect(wrapper.findAll('.vtn-controls__link')).toHaveLength(3)
    })

    it('клик по кнопкам переключения вида', () => {
        wrapper.vm.setView = jest.fn()

        wrapper.find('.vtn-controls__btn').trigger('click')

        expect(wrapper.vm.setView).toHaveBeenCalled()
    })

    it('метод setView', async () => {
        wrapper.vm.setView('grid')

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.modeBtns).toEqual(
            [
                { id: 1, mode: 'grid', isActive: true },
                { id: 2, mode: 'list', isActive: false }
            ]
        )
        expect(setItem).toHaveBeenCalled()
        expect(mutations.SET_VIEW_MODE).toHaveBeenCalled()
        expect(wrapper.findAll('.vtn-controls__btn')[0].classes()).toContain('vtn-controls__btn--active')

        wrapper.vm.setView('list')

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.modeBtns).toEqual(
            [
                { id: 1, mode: 'grid', isActive: false },
                { id: 2, mode: 'list', isActive: true }
            ]
        )
        expect(setItem).toHaveBeenCalled()
        expect(mutations.SET_VIEW_MODE).toHaveBeenCalled()
        expect(wrapper.findAll('.vtn-controls__btn')[1].classes()).toContain('vtn-controls__btn--active')
    })

    it('метод activeLink', () => {
        expect(wrapper.vm.activeLink('lenta')).toBe(true)

        expect(wrapper.vm.activeLink('all')).toBe(false)
        expect(wrapper.vm.activeLink('bbc-news')).toBe(false)
    })

    it('хук created', async () => {
        expect(typeof VTNControls.created).toBe('function')

        wrapper.vm.setView = jest.fn()

        wrapper.vm.$options.created.call(wrapper.vm)

        expect(getItem).toHaveBeenCalled()
        expect(wrapper.vm.setView).toHaveBeenCalledWith('grid')
    })
})