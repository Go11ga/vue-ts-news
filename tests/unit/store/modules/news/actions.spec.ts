import actions from '@/store/modules/news/actions'
import { INewsResponse, INewsResponseMock } from '@/types/interfaces'
import { 
    newsItem_01 as mockItem1, 
    newsItem_02 as mockItem2, 
    axiosError_426 as mockError426, 
    axiosError_500 as mockError500
} from '@/mocks/news'

import axios, { AxiosError } from 'axios'
jest.mock('axios')

let url = ''

describe('news actions', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    const state = {
        newsProcess: false,
        news: [],
        totalResults: 0
    }

    const getters = {
        getQuery: 'testQuery'
    }

    const commit = jest.fn()

    const localActions: any = actions

    it('fetchNews успешный запрос', async () => {
        const spy = jest.spyOn(axios, 'get').mockImplementation((_url: string): Promise<INewsResponseMock> => { 
            return new Promise((resolve) => {
                url = _url
    
                const response: INewsResponseMock = {
                    data: {
                        articles: [
                            mockItem1,
                            mockItem2
                        ],
                        totalResults: 2
                    } as INewsResponse
                }
            
                resolve(response)
            })
        })
        
        expect(state.newsProcess).toBe(false)

        const fetchNewsPromise = localActions.fetchNews({ state, getters, commit })

        expect(state.newsProcess).toBe(true)

        await fetchNewsPromise

        expect(url).toBe('https://newsapi.org/v2/everything?testQuery&apiKey=f25175fea27546b5b0ebed4741b9a2cc')

        expect(state.news).toEqual([
            mockItem1,
            mockItem2
        ])

        expect(state.totalResults).toBe(2)

        expect(state.newsProcess).toBe(false)
    })

    it('ошибки axios isAxiosError 426 || 429', async () => {
        const spy = jest.spyOn(axios, 'get').mockImplementation(() => { 
            return new Promise(() => {
                throw mockError426
            })
        })

        jest.spyOn(axios, 'isAxiosError').mockImplementation((error: AxiosError): any => error)

        await localActions.fetchNews({ state, getters, commit })

        expect(commit).toHaveBeenCalledWith("SET_ERROR", { type: "error", msg: 'axiosError_426' })
    })

    it('прочие ошибки axios isAxiosError', async () => {
        const spy = jest.spyOn(axios, 'get').mockImplementation(() => { 
            return new Promise(() => {
                throw mockError500
            })
        })

        await localActions.fetchNews({ state, getters, commit })

        expect(commit).toHaveBeenCalledWith("SET_ERROR", { type: "error", msg: 'Test error message' })  
    })

    it('неизвестная ошибка', async () => {
        const spy = jest.spyOn(axios, 'get').mockImplementation(() => { 
            return new Promise(() => {
                throw new Error()
            })
        })

        jest.spyOn(axios, 'isAxiosError').mockImplementation((error: any): any => false)

        await localActions.fetchNews({ state, getters, commit })

        expect(commit).toHaveBeenCalledWith("SET_ERROR", { type: "error", msg: 'An unexpected error occurred' }) 
    })
})
