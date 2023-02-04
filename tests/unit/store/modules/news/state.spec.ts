import state from '@/store/modules/news/state'
import { makeState } from '@/mocks/news'

describe('news state', () => {
    it('начальное состояние state', () => {
        const localState = makeState('all', '')

        expect(state()).toEqual(localState)
    })  
})