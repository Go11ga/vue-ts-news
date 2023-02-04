import { IStateNews } from '@/types/interfaces'

function state(): IStateNews {
    return {
        channels: [
            { id: 1, code: 'all', title: 'Все' },
            { id: 2, code: 'lenta', title: 'Lenta' },
            { id: 3, code: 'bbc-news', title: 'BBC' }
        ],
        activeChannel: 'all',
        viewMode: '',
        news: [],
        totalResults: 1,
        currentPage: 1,
        newsPerPage: 20,
        newsProcess: false,
        searchValue: ''
    }
}

export default state
