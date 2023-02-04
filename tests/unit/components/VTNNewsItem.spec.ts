import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import VTNNewsItem from '@/components/VTNNewsItem.vue'
import { newsItem_01, newsItem_02 } from '@/mocks/news'

const makeWrapper = (viewMode: string = 'list') => {
    const state = () => {
        return {
            news: {
                viewMode
            }
        }
    }

    const store = createStore({
        state
    })

    const wrapper = shallowMount(VTNNewsItem, {
        props: {
            newsItem: newsItem_01
        },
        global: {
            plugins: [store]
        }
    })

    return wrapper
}

describe('VTNNewsItem', () => {
    let wrapper: any

    beforeEach(() => {
        wrapper = makeWrapper()
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('VTNNewsItem')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('отрисовка и пропсы', async () => {
        expect(wrapper.find('.vtn-newsitem__title').text()).toMatch('Title_01')
        expect(wrapper.find('.vtn-newsitem__title').attributes().href).toMatch('https://domain_01.com/domain_01')
        expect(wrapper.find('.vtn-newsitem__img').attributes().src).toMatch('https://domain_01_img.com')
        expect(wrapper.find('.vtn-newsitem__text').text()).toMatch('Description_01')
        expect(wrapper.html().includes('vtn-newsitem__btn')).toBe(true)
        expect(wrapper.find('.vtn-newsitem__channel-link').attributes().href).toMatch('https://domain_01.com')
        expect(wrapper.find('.vtn-newsitem__channel-link').text()).toMatch('https://domain_01.com')
        expect(wrapper.find('.vtn-newsitem__pubdate').text()).toMatch('03.01.2023 23:48:00')

        wrapper.setProps({
            newsItem: newsItem_02
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.find('.vtn-newsitem__title').text()).toMatch('Title_02')
        expect(wrapper.find('.vtn-newsitem__title').attributes().href).toMatch('https://domain_02.com/domain_02')
        expect(wrapper.find('.vtn-newsitem__img').attributes().src).toMatch('https://dummyimage.com/300x168/DCDCDC/fff')
        expect(wrapper.find('.vtn-newsitem__text').text()).toMatch('')
        expect(wrapper.html().includes('vtn-newsitem__btn')).toBe(false)
        expect(wrapper.find('.vtn-newsitem__channel-link').attributes().href).toMatch('https://domain_02.com')
        expect(wrapper.find('.vtn-newsitem__channel-link').text()).toMatch('https://domain_02.com')
        expect(wrapper.find('.vtn-newsitem__pubdate').text()).toMatch('05.01.2023 23:48:00')
    })

    it('изменение state viewMode', async () => {
        expect(wrapper.find('.vtn-newsitem').classes()).toContain('vtn-newsitem--list')

        wrapper = makeWrapper('grid')

        await wrapper.vm.$nextTick()

        expect(wrapper.find('.vtn-newsitem').classes()).not.toContain('vtn-newsitem--list')
    })

    it('метод getLink', () => {
        let res1 = wrapper.vm.getLink('https://domain_01.com/domain_01')
        expect(res1).toMatch('https://domain_01.com')

        let res2 = wrapper.vm.getLink('')
        expect(res2).toMatch('https://undefined') 
    })

    it('метод getDate', () => {
        let res1 = wrapper.vm.getDate('2023-01-03T20:48:00Z')
        expect(res1).toMatch('03.01.2023 23:48:00')

        let res2 = wrapper.vm.getDate('')
        expect(res2).toMatch('Invalid Date Invalid Date') 
    })

    it('клик по кнопке Подробнее вызывает метод toggleHeight', () => {
        wrapper.vm.toggleHeight = jest.fn()

        wrapper.find('.vtn-newsitem__btn').trigger('click')
        expect(wrapper.vm.toggleHeight).toHaveBeenCalled()
    })

    it('метод toggleHeight', async () => {
        wrapper.vm.toggleHeight()

        expect(wrapper.vm.heightAuto).toBe(true)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.vtn-newsitem__text').classes()).toContain('vtn-newsitem__text--height-auto')

        wrapper.vm.toggleHeight()

        expect(wrapper.vm.heightAuto).toBe(false)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.vtn-newsitem__text').classes()).not.toContain('vtn-newsitem__text--height-auto')
    })
})
