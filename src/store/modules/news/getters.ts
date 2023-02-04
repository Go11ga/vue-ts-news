import { GetterTree } from 'vuex';
import { IStateRoot, IStateNews } from '@/types/interfaces'

const getters: GetterTree<IStateNews, IStateRoot> = {
    getSources(state: IStateNews) {
        const arr = [...state.channels].splice(1, state.channels.length)

        let str = ''
        arr.forEach(el => str += `${el.code},`)
        str = str.slice(0, -1)

        return state.activeChannel === 'all' ? str : state.activeChannel
    },

    getSearch(state: IStateNews) {
        return state.searchValue.length > 0 ? `q="${state.searchValue}"` : `q`
    },

    getQuery(state: IStateNews, getters: GetterTree<IStateNews, IStateRoot>) {
        return `sources=${getters.getSources}&sortBy=publishedAt&pageSize=${state.newsPerPage}&page=${state.currentPage}&${getters.getSearch}`
    }
}

export default getters
