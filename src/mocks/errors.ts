import { IError, IStateErrors } from '@/types/interfaces'

const makeState = (error: IError = {}): IStateErrors => {
    return {
        error
    }
}

export { makeState }
