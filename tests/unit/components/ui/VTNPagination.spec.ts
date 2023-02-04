import { shallowMount } from '@vue/test-utils'
import VTNPagination from '@/components/ui/VTNPagination.vue'

describe('VTNPagination', () => {
    let wrapper = shallowMount(VTNPagination, {
        props: {
            currentPage: 1,
            totalCount: 10
        }
    })

    it('dummy name test', () => {
        expect(wrapper.vm.$options.name).toMatch('VTNPagination')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('отрисовка и пропсы', async () => {
        expect(wrapper.html().includes('vtn-pagination')).toBe(true)
        expect(wrapper.findAll('v-t-n-pagination-item-stub').length).toBe(12)
        expect(wrapper.findAll('v-t-n-pagination-item-stub')[0].classes()).toContain('vtn-pagination__prev')
        expect(wrapper.findAll('v-t-n-pagination-item-stub')[1].attributes().active).toBe("true")
        expect(wrapper.findAll('v-t-n-pagination-item-stub')[11].classes()).toContain('vtn-pagination__next')

        wrapper.setProps({
            currentPage: 3,
            totalCount: 5
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.html().includes('vtn-pagination')).toBe(true)
        expect(wrapper.findAll('v-t-n-pagination-item-stub').length).toBe(7)
        expect(wrapper.findAll('v-t-n-pagination-item-stub')[0].classes()).toContain('vtn-pagination__prev')
        expect(wrapper.findAll('v-t-n-pagination-item-stub')[3].attributes().active).toBe("true")
        expect(wrapper.findAll('v-t-n-pagination-item-stub')[6].classes()).toContain('vtn-pagination__next')

        wrapper.setProps({
            currentPage: 3,
            totalCount: 1
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.html().includes('vtn-pagination')).toBe(true)
        expect(wrapper.findAll('v-t-n-pagination-item-stub').length).toBe(3)
        expect(wrapper.findAll('v-t-n-pagination-item-stub')[0].classes()).toContain('vtn-pagination__prev')
        expect(wrapper.findAll('v-t-n-pagination-item-stub')[1].attributes().active).toBe("false")
        expect(wrapper.findAll('v-t-n-pagination-item-stub')[2].classes()).toContain('vtn-pagination__next')

        wrapper.setProps({
            currentPage: 3,
            totalCount: 0
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.html().includes('vtn-pagination')).toBe(false)
    })

    it('computed pages', () => {
        let localThis = {
            paginationLength: 3,
            currentPage: 1,
            totalCount: 3
        }

        const component: any = VTNPagination

        expect(component.computed.pages.call(localThis)).toStrictEqual([
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 }
        ])
    })
})