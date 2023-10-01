import {createStore} from "vuex"
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default createStore({
    modules: {
        getters,
        actions,
        mutations,
        strict: process.env.NODE_ENV !== 'production'
    }
})