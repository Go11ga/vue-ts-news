import mutations from '@/store/modules/news/mutations'
import { makeState, newsItem_01, newsItem_02 } from '@/mocks/news'

describe('news mutations', () => {
    it('SET_ACTIVE_CHANNEL устанавливает значение активного канала', () => {
        const localState = makeState('all', '')

        mutations.SET_ACTIVE_CHANNEL(localState, 'lenta')
        expect(localState.activeChannel).toMatch('lenta')
    })

    it('SET_VIEW_MODE устанавливает значение viewMode', () => {
        const localState = makeState('all', '')

        mutations.SET_VIEW_MODE(localState, 'grid')
        expect(localState.viewMode).toMatch('grid')

        mutations.SET_VIEW_MODE(localState, 'list')
        expect(localState.viewMode).toMatch('list')
    })

    it('SET_CURRENT_PAGE устанавливает значение текущей страницы', () => {
        const localState = makeState('all', '')

        mutations.SET_CURRENT_PAGE(localState, 3)
        expect(localState.currentPage).toBe(3)
    })

    it('CLEAR_NEWS очищает news state news', () => {
        const localState = makeState('all', '', [ newsItem_01, newsItem_02 ])

        mutations.CLEAR_NEWS(localState)
        expect(localState.news).toEqual([])
    })

    it('SET_SEARCH_VALUE устанавливает значение поиска', () => {
        const localState = makeState('all', '')

        mutations.SET_SEARCH_VALUE(localState, 'test_search')
        expect(localState.searchValue).toBe('test_search')
    })
})
