import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import VTNHeader from '@/components/VTNHeader.vue'

const makeWrapper = (newsProcess: boolean = false) => {
    const state = () => {
        return {
            news: {
                newsProcess
            }
        }
    }

    const store = createStore({
        state
    })

    const wrapper = shallowMount(VTNHeader, {
        global: {
            plugins: [store]
        }
    })

    return wrapper
}

describe('VTNHeader', () => {
    let wrapper: any

    beforeEach(() => {
        wrapper = makeWrapper()

        wrapper.vm.CLEAR_NEWS = jest.fn()
        wrapper.vm.SET_SEARCH_VALUE = jest.fn()
        wrapper.vm.fetchNews = jest.fn()
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('VTNHeader dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('VTNHeader')
    })

    it('заголовок h1', () => {
        expect(wrapper.find('h1').text()).toMatch('Список новостей')
    })

    it('иконки в поле поиска', async () => {
        expect(wrapper.html()).toContain('header__search-img')
        expect(wrapper.html()).not.toContain('header__preloader-img')

        wrapper = makeWrapper(true)

        await wrapper.vm.$nextTick()

        expect(wrapper.html()).not.toContain('header__search-img')
        expect(wrapper.html()).toContain('header__preloader-img')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('getters', () => {
        expect(wrapper.vm.news).toEqual({ newsProcess: false })

        expect(wrapper.vm.searchValue).toBe('')
        
    })

    it('клик по кнопке refresh', () => {
        let spy = jest.spyOn(wrapper.vm, 'updateNews')

        wrapper.find('button.header__refresh-btn').trigger('click')
        
        expect(spy).toHaveBeenCalled()
        expect(spy).toHaveBeenCalledTimes(1)
    })

    it('метод updateNews', () => {
        wrapper.vm.updateNews()

        expect(wrapper.vm.CLEAR_NEWS).toHaveBeenCalled()
        expect(wrapper.vm.fetchNews).toHaveBeenCalled()
    })

    it('v-model .header__input', () => {
        wrapper.find('.header__input').setValue('test')

        expect(wrapper.vm.searchValue).toBe('test')
    })

    it('enter в input', () => {
        wrapper.vm.searchNews = jest.fn()

        wrapper.find('.header__input').trigger('keyup.enter')

        expect(wrapper.vm.searchNews).toHaveBeenCalled()
    })

    it('клик по кнопке search', () => {
        wrapper.vm.searchNews = jest.fn()

        wrapper.find('.header__search-btn').trigger('click')
        
        expect(wrapper.vm.searchNews).toHaveBeenCalled()
    })

    it('метод searchNews', async () => {
        wrapper.setData({ searchValue: 'test' })

        wrapper.vm.searchNews()

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.SET_SEARCH_VALUE).toHaveBeenCalledWith('test')
        expect(wrapper.vm.fetchNews).toHaveBeenCalled()
    })
})
