import { Module } from 'vuex';
import { IStateRoot, IStateNews } from '@/types/interfaces'

import state from '@/store/modules/news/state'
import getters from '@/store/modules/news/getters'
import mutations from '@/store/modules/news/mutations'
import actions from '@/store/modules/news/actions'

const newsModule: Module<IStateNews, IStateRoot> = {
    state,
    getters,
    mutations,
    actions
}

export { newsModule }
