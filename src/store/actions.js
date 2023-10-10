import * as types from './mutation-types'
import {Auth} from '../api'
//import {Auth, List, Task} from '../api'

export default {
    actions: {
        login: ({commit}, authInfo) => {
            return Auth.login(authInfo)
                .then(({token, userId}) => {
                    console.log(`user found -> token: ${token} userId: ${userId}`)
                    commit(types.AUTH_LOGIN, {token, userId})
                })
                .catch(err => {throw err})
        },
    
        fetchLists: ({commit}) => {
            throw new Error('fetchLists action should be implemented')
        }, 
    
        addTask: ({commit}) => {
            throw new Error('updateTask action should be implemnted')
        },
    
        removeTask: ({commit}) => {
            throw new Error('removeask action should be implemented')
        },
    
        logout: ({commit}) => {
            throw new Error('logout action should be implemented')
        }
    }
}