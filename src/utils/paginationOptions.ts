import { PaginationOptions, PaginationItemOption } from '@/types/interfaces'

function range (start: number, stop: number, step = 1): Array<number> {
    return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
}

export default function getPaginationOptions({
    listLength = 10,
    currentPage = 0,
    totalPages
}: PaginationOptions): Array<PaginationItemOption> {
    const offest = Math.ceil(listLength / 2)
    let start = currentPage - offest
    let end = currentPage + offest

    if (totalPages <= listLength) {
        start = 0
        end = totalPages  

    } else if (currentPage <= offest) {
        start = 0
        end = listLength

    } else if ((currentPage + offest) >= totalPages) { 
        start = totalPages - listLength
        end = totalPages
    }
    
    return range(start, end)
        .map(value => ({
        label: String(value + 1),
        value: value + 1
    }))
}
