import state from '@/store/modules/errors/state'

describe('errors state', () => {
    it('начальное состояние state', () => {
        expect(state()).toEqual({ error: {} })
    })  
})