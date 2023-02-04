import getters from '@/store/modules/news/getters'
import { makeState } from '@/mocks/news'

const localGetters: any = getters

describe('news getters', () => {
    it('getSources возвращает список активных каналов', () => {
        const localState_01 = makeState('all', '')
        expect(localGetters.getSources(localState_01)).toMatch('lenta,bbc-news')

        const localState_02 = makeState('lenta', '')
        expect(localGetters.getSources(localState_02)).toMatch('lenta')
    })

    it('getSearch возвращает значение для поиска', () => {
        const localState_01 = makeState('lenta', 'testSearch')
        expect(localGetters.getSearch(localState_01)).toMatch(`q="testSearch"`)

        const localState_02 = makeState('lenta', '')
        expect(localGetters.getSearch(localState_02)).toMatch(`q`)
    })

    it('getQuery возвращает строку с query параметрами', () => {
        const state = makeState('lenta', 'testSearch')

        const getters = {
            getSources: 'lenta',
            getSearch: 'q'
        }

        const localThis = {
            state,
            getters
        }

        expect(localGetters.getQuery(state, getters)).toMatch('sources=lenta&sortBy=publishedAt&pageSize=20&page=1&q') 
    })
})
