import { MutationTree } from 'vuex'
import { IStateNews } from '@/types/interfaces'

const mutation: MutationTree<IStateNews> = {
    SET_ACTIVE_CHANNEL(state: IStateNews, payload: string) {
        state.activeChannel = payload  
    },

    SET_VIEW_MODE(state: IStateNews, payload: string) {
        state.viewMode = payload 
    },

    SET_CURRENT_PAGE(state: IStateNews, payload: number) {
        state.currentPage = payload
    },

    CLEAR_NEWS(state: IStateNews) {
        state.news.length = 0
    },

    SET_SEARCH_VALUE(state: IStateNews, payload: string) {
        state.searchValue = payload
    }
}

export default mutation
