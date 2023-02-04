import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import VTNNews from '@/views/VTNNews.vue'

const makeWrapper = (stateData: any, propsData: any) => {
    const state = () => {
        return {
            news: {
                ...stateData
            }
        }
    }

    const mutations = {
        SET_ACTIVE_CHANNEL: jest.fn()
    }

    const actions = {
        fetchNews: jest.fn()
    }

    const store = createStore({
        state,
        mutations,
        actions
    })

    const wrapper = shallowMount(VTNNews, {
        props: {
            ...propsData
        },
        global: {
            plugins: [store]
        }
    })

    return wrapper
}

describe('VTNNews', () => {
    let wrapper: any
    const component: any = VTNNews

    beforeEach(() => {
        wrapper = makeWrapper(
            {
                news: [ {}, {} ],
                newsProcess: false,
                newsPerPage: 10,
                totalResults: 100
            }, 
            {
                channel: 'all',
                page: '1'
            }
        )
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('VTNNews')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('computed totalNewsPages', () => {
        const localThis_01 = { 
            news: { 
                totalResults: 0,
                newsPerPage: 10
            }
        }
        expect(component.computed.totalNewsPages.call(localThis_01)).toBe(0)

        const localThis_02 = { 
            news: { 
                totalResults: 3,
                newsPerPage: 10
            }
        }
        expect(component.computed.totalNewsPages.call(localThis_02)).toBe(1)

        const localThis_03 = { 
            news: { 
                totalResults: 25,
                newsPerPage: 10
            }
        }
        expect(component.computed.totalNewsPages.call(localThis_03)).toBe(3)
    })

    it('computed pageRoute', () => {
        const localThis = { 
            channel: 'all',
            page: 1
        }

        expect(component.computed.pageRoute.call(localThis)).toEqual({ channel: 'all', page: 1 })
    })

    it('хук mounted', () => {
        expect(typeof VTNNews.mounted).toBe('function')

        wrapper.vm.SET_ACTIVE_CHANNEL = jest.fn()
        wrapper.vm.fetchNews = jest.fn()

        wrapper.vm.$options.mounted.call(wrapper.vm)

        expect(wrapper.vm.SET_ACTIVE_CHANNEL).toHaveBeenCalledWith('all')
        expect(wrapper.vm.fetchNews).toHaveBeenCalled()
    })

    it('watch pageRoute', async () => {
        wrapper.vm.SET_ACTIVE_CHANNEL = jest.fn()
        wrapper.vm.SET_CURRENT_PAGE = jest.fn()
        wrapper.vm.fetchNews = jest.fn()

        wrapper.setProps({
            channel: 'someChannel',
            page: '2'
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.SET_ACTIVE_CHANNEL).toHaveBeenCalledWith('someChannel')
        expect(wrapper.vm.SET_CURRENT_PAGE).toHaveBeenCalledWith(2)
        expect(wrapper.vm.fetchNews).toHaveBeenCalled()
    })
})

describe('VTNNews отрисовка', () => {
    it('массив новостей пустой, новости загружаются', () => {
        const wrapper = makeWrapper(
            {
                news: [],
                newsProcess: true
            }, 
            {
                channel: 'all',
                page: '1',
                newsPerPage: 10,
                totalResults: 100
            }
        )

        expect(wrapper.html()).toContain('v-t-n-preloader-stub')
        expect(wrapper.html()).not.toContain('v-t-n-pagination-stub')
        expect(wrapper.html()).not.toContain('vtn-news__empty')
    })

    it('новости загружены, массив новостей не пустой', () => {
        const wrapper = makeWrapper(
            {
                news: [{}, {}, {}],
                newsProcess: false,
                newsPerPage: 10,
                totalResults: 100
            }, 
            {
                channel: 'all',
                page: '1'
            }
        )

        expect(wrapper.html()).not.toContain('v-t-n-preloader-stub')
        expect(wrapper.findAll('v-t-n-news-item-stub').length).toBe(3)
        expect(wrapper.html()).toContain('v-t-n-pagination-stub')
    })

    it('новости загружены, массив новостей пустой', () => {
        const wrapper = makeWrapper(
            {
                news: [],
                newsProcess: false,
                newsPerPage: 10,
                totalResults: 0
            }, 
            {
                channel: 'all',
                page: '1'
            }
        )

        expect(wrapper.html()).not.toContain('v-t-n-preloader-stub')
        expect(wrapper.html()).not.toContain('v-t-n-news-item-stub')
        expect(wrapper.html()).toContain('vtn-news__empty')
    })
})