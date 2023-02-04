import { INewsItem, IStateNews } from '@/types/interfaces'
import { AxiosError } from 'axios'

const newsItem_01: INewsItem = {
    author: 'Author_01',
    content: 'Content_01',
    description: 'Description_01',
    publishedAt: '2023-01-03T20:48:00Z',
    source: {
        id: null,
        name: "Sorce_01"
    },
    title: 'Title_01',
    url: 'https://domain_01.com/domain_01',
    urlToImage: 'https://domain_01_img.com'
}

const newsItem_02: INewsItem = {
    author: 'Author_02',
    content: 'Content_02',
    description: null,
    publishedAt: '2023-01-05T20:48:00Z',
    source: {
        id: null,
        name: "Sorce_02"
    },
    title: 'Title_02',
    url: 'https://domain_02.com/domain_02',
    urlToImage: null
}

const axiosError_426 = {
    config: {},
    request: {},
    response: {
        status: 426,
        data: {
            message: 'axiosError_426'
        }
    }
} as AxiosError<any>

const axiosError_500 = {
    config: {},
    request: {},
    response: {},
    message: 'Test error message'
} as AxiosError<any>

const makeState = (activeChannel: string, searchValue: string, news: Array<INewsItem> = []): IStateNews => {
    return {
        channels: [
            { id: 1, code: 'all', title: 'Все' },
            { id: 2, code: 'lenta', title: 'Lenta' },
            { id: 3, code: 'bbc-news', title: 'BBC' }
        ],
        activeChannel,
        viewMode: '',
        news,
        totalResults: 1,
        currentPage: 1,
        newsPerPage: 20,
        newsProcess: false,
        searchValue
    }
}

export { newsItem_01, newsItem_02, axiosError_426, axiosError_500, makeState }