import { shallowMount, mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import VTN404 from '@/views/VTN404.vue'
import VTNNews from '@/views/VTNNews.vue'
import { routes } from '@/router/index'
import * as toastify from 'vue3-toastify'

jest.mock('vue3-toastify', () => ({
    toast: jest.fn() 
}))

jest.useFakeTimers()

describe('компонент App', () => {
    let wrapper: any

    const state = () => {
        return {
            errors: {
                error: {}
            }
        }
    }

    const store = createStore({
        state
    })

    beforeEach(() => {
        wrapper = shallowMount(App, {
            global: {
                plugins: [store],
                stubs: ['router-view']
            }
        })

        wrapper.vm.CLEAR_ERROR = jest.fn()
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('VTN')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('computed getError', () => {
        const localThis = { 
            errors: { 
                error: { type: 'Error', msg: 'Some error' }
            }
        }

        const component: any = App

        expect(component.computed.getError.call(localThis)).toEqual({ type: 'Error', msg: 'Some error' })
    })

    it('watch getError', async () => {
        wrapper.vm.errors.error = { type: 'Error', msg: 'Some error' }

        await wrapper.vm.$nextTick()

        expect(toastify.toast).toHaveBeenCalledWith('Some error', {
            autoClose: 5000,
            type: 'Error'
        })

        jest.runAllTimers()
        expect(wrapper.vm.CLEAR_ERROR).toHaveBeenCalled()
    })
})

describe('router', () => {
    let wrapper: any

    const state = () => {
        return {
            news: {
                newsProcess: false,
                news: [{}, {}]
            },
            errors: {
                error: {}
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

    const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes
    })

    beforeEach(() => {
        wrapper = mount(App, {
            global: {
                plugins: [store, router],
                stubs: [
                    'VTNSprite',
                    'VTNHeader',
                    'VTNControls',
                    'VTNFooter',
                    'VTNPreloader',
                    'VTNNewsItem',
                    'VTNPagination',
                    'router-link'
                ]
            },
            props: {
                channel: 'all',
                page: 1
            }
        })

        wrapper.vm.CLEAR_ERROR = jest.fn()
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('VTNNews /', async () => {
        router.push('/')

        await router.isReady()

        expect(wrapper.findComponent(VTNNews).exists()).toBe(true)
    })

    it('VTNNews /all/1', async () => {
        router.push('/all/1')

        await router.isReady()

        expect(wrapper.findComponent(VTNNews).exists()).toBe(true)
    })

    it('VTN404', async () => {
        router.push('/qwerty')

        await router.isReady()

        expect(wrapper.findComponent(VTN404).exists()).toBe(true)
    })
})