import mutations from '@/store/modules/errors/mutations'
import { makeState } from '@/mocks/errors'

describe('errors mutations', () => {
    it('SET_ERROR устанавливает объект ошибки', () => {
        const localState = makeState()
       
        mutations.SET_ERROR(localState, { type: "error", msg: 'test error' })
        expect(localState.error).toEqual({ type: "error", msg: 'test error' })
    })

    it('CLEAR_ERROR очищает объект ошибки', () => {
        const localState = makeState({ type: "error", msg: 'test error' })
       
        mutations.CLEAR_ERROR(localState)
        expect(localState.error).toEqual({})
    })
})

