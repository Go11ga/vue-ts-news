import { MutationTree } from 'vuex'
import { IStateErrors, IError } from '@/types/interfaces'

const mutation: MutationTree<IStateErrors> = {
    SET_ERROR(state:IStateErrors, payload: IError) {
        state.error = payload
    },

    CLEAR_ERROR(state:IStateErrors) {
        state.error = {}
    }
}

export default mutation