import { Module } from 'vuex';
import { IStateRoot, IStateErrors } from '@/types/interfaces'

import state from '@/store/modules/errors/state';
import mutations from '@/store/modules/errors/mutations';

const errorsModule: Module<IStateErrors, IStateRoot> = {
    state,
    mutations
}

export { errorsModule }
