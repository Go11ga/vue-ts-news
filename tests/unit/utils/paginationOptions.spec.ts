import getPaginationOptions from '@/utils/paginationOptions'

describe('количество кнопок меньше количества страниц', () => {
    it('кнопок: 4, страниц: 10, номер страницы: 1', () => {
        let options = {
            listLength: 4,
            currentPage: 1,
            totalPages: 10
        }

        expect(getPaginationOptions(options)).toEqual([
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 }
        ])
    })

    it('кнопок: 4, страниц: 10, номер страницы: 5', () => {
        let options = {
            listLength: 4,
            currentPage: 5,
            totalPages: 10
        }

        expect(getPaginationOptions(options)).toEqual([
            { label: '4', value: 4 },
            { label: '5', value: 5 },
            { label: '6', value: 6 },
            { label: '7', value: 7 }
        ])
    })

    it('кнопок: 4, страниц: 10, номер страницы: 10', () => {
        let options = {
            listLength: 4,
            currentPage: 10,
            totalPages: 10
        }

        expect(getPaginationOptions(options)).toEqual([
            { label: '7', value: 7 },
            { label: '8', value: 8 },
            { label: '9', value: 9 },
            { label: '10', value: 10 }
        ])
    })
})

describe('количество кнопок больше количества страниц', () => {
    it('кнопок: 10, страниц: 5, номер страницы: 1', () => {
        let options = {
            listLength: 10,
            currentPage: 1,
            totalPages: 5
        }

        expect(getPaginationOptions(options)).toEqual([
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 }
        ])
    })

    it('кнопок: 10, страниц: 5, номер страницы: 5', () => {
        let options = {
            listLength: 10,
            currentPage: 5,
            totalPages: 5
        }

        expect(getPaginationOptions(options)).toEqual([
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 }
        ])
    })
})

describe('количество кнопок больше количества страниц', () => {
    it('значения по умолчанию', () => {
        let options = {
            totalPages: 5
        }

        expect(getPaginationOptions(options)).toEqual([
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 }
        ])
    })
})