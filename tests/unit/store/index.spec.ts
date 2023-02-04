import store from '@/store/index'

describe('root Vuex', () => {
    it('проверка модулей', () => {
        expect(store.state).toHaveProperty('news')
        expect(store.state).toHaveProperty('errors') 
    })
})