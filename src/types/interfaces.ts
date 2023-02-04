/**
 * * Канал новостей
 */
export interface IChannel {
    id: number,
    code: string,
    title: string
}

/**
 * * Источник новостей
 */
interface ISource {
    id: string | null,
    name: string
}

/**
 * * Новость
 */
export interface INewsItem {
    author: string
    content: string
    description: string | null | undefined
    publishedAt: string
    source: ISource
    title: string
    url: string
    urlToImage: string | null | undefined
}

/**
 * * Vuex news state
 */
export interface IStateNews {
    channels: Array<IChannel>
    activeChannel: string,
    viewMode: string,
    news: Array<INewsItem>,
    totalResults: number,
    currentPage: number,
    newsPerPage: number,
    newsProcess: boolean,
    searchValue: string
}

/**
 * * Vuex root state
 */
export interface IStateRoot {
    news: IStateNews
}

/**
 * * Ответ сервера: новости
 */
export interface INewsResponse {
    articles: Array<INewsItem>
    totalResults: number
}

/**
 * * Мок ответа сервера для тестирования
 */
export interface INewsResponseMock {
    data: INewsResponse
}

/**
 * * Vuex error state
 */
 export interface IStateErrors {
    error: IError
}

/**
 * * Ошибка
 */
export interface IError {
    type?: string,
    msg?: string
}

/**
 * * Настройки пагинации
 */
export interface PaginationOptions {
    listLength?: number,
    currentPage?: number
    totalPages: number
}

/**
 * * Параметры страницы
 */
export interface PaginationItemOption {
    label: string
    value: number
}

/**
 * * Кнопки переключения вида отображения новостей: список | сетка
 */
export interface IViewBtns {
    id: number,
    mode: string,
    isActive: boolean
}
