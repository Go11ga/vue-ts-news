import { GetterTree, ActionTree, Commit } from 'vuex'
import { IStateRoot, IStateNews, INewsResponse } from '@/types/interfaces'
import axios from 'axios'

const actions: ActionTree<IStateNews, IStateRoot> = {
    async fetchNews({ state, getters, commit } : { state: IStateNews, getters: GetterTree<IStateNews, IStateRoot>, commit: Commit }) {
        try {
            state.newsProcess = true

            const { data } = await axios.get<INewsResponse>(`https://newsapi.org/v2/everything?${getters.getQuery}&apiKey=${process.env.VUE_APP_KEY}`)
            
            state.news = data.articles
            state.totalResults = data.totalResults

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 426 || error?.response?.status === 429) {
                    commit('SET_ERROR', { type: 'error', msg: error?.response?.data?.message })
                    return
                }

                commit('SET_ERROR', { type: 'error', msg: error.message })

            } else {
                commit('SET_ERROR', { type: 'error', msg: 'An unexpected error occurred' })
            }
        } finally {
            state.newsProcess = false
        }
    }
}

export default actions
