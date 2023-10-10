import {createStore} from "vuex"
import actions from './actions'
// import getters from './getters'
import mutations from './mutations'

const state = {
    auth: {
        token: null,
        userId: null
    },
    board: {
        lists: []
    }
}

export default createStore({
    modules: {
        state,
        // getters,
        actions,
        mutations,
        strict: process.env.NODE_ENV !== 'production'
    }
})