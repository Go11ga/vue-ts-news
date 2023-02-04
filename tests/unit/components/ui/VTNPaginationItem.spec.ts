import { shallowMount } from '@vue/test-utils'
import VTNPaginationItem from '@/components/ui/VTNPaginationItem.vue'

describe('VTNPaginationItem', () => {
    let wrapper = shallowMount(VTNPaginationItem, {
        global: {
            stubs: ['router-link'],
            mocks: {
                $route: (route: any) => route
            }
        },
        props: {
            label: 'Label',
            value: 1,
            active: false
        }
    })

    it('dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('RSSPaginationItem')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('отрисовка и пропсы', async () => {
        expect(wrapper.findAll('.vtn-pagination__item')[0].classes()).not.toContain('vtn-pagination__item--active')

        wrapper.setProps({
            label: 'Label',
            value: 1,
            active: true
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.findAll('.vtn-pagination__item')[0].classes()).toContain('vtn-pagination__item--active')
    })

    it('computed path', () => {
        const localThis = {
            $route: {
                name: 'name',
                query: 'query',
                params: {
                    param_01: 'param_01',
                    param_02: 'param_02'
                }
            },
            value: 1
        }

        const component: any = VTNPaginationItem

        expect(component.computed.path.call(localThis)).toEqual({
            name: 'name',
            query: 'query',
            params: { param_01: 'param_01', param_02: 'param_02', page: 1 }
        })
    })

    it('клик по ссылке вызывает метод onPageChange', async () => {
        window.scrollTo = jest.fn()

        wrapper.find('.vtn-pagination__item').trigger('click')

        await wrapper.vm.$nextTick()

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    })
})