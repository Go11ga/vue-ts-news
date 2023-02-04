import { createStore } from 'vuex'
import { newsModule } from '@/store/modules/news/index'
import { errorsModule } from '@/store/modules/errors/index'

export default createStore({
    modules: {
        news: newsModule,
        errors: errorsModule
    }
})
