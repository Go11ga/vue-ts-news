import { Module } from 'vuex'
import { newsModule } from '@/store/modules/news/index'
import state from '@/store/modules/news/state'
import getters from '@/store/modules/news/getters'
import mutations from '@/store/modules/news/mutations'
import actions from '@/store/modules/news/actions'

import { IStateRoot, IStateNews } from '@/types/interfaces'

describe('news index', () => {
    it('dummy news index test', () => {
        const localModule: Module<IStateNews, IStateRoot> = {
            state,
            getters,
            mutations,
            actions
        }
        
        expect(newsModule).toEqual(localModule)
    })
})