import { Module } from 'vuex'
import { errorsModule } from '@/store/modules/errors/index'
import state from '@/store/modules/errors/state'
import mutations from '@/store/modules/errors/mutations'

import { IStateRoot, IStateErrors } from '@/types/interfaces'

describe('errors index', () => {
    it('dummy errors index test', () => {
        const localModule: Module<IStateErrors, IStateRoot> = {
            state,
            mutations
        }
        
        expect(errorsModule).toEqual(localModule)
    })
})