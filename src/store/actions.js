import * as types from './mutation-types'
import {Auth, List, Task} from '../api'

export default {
    login: ({commit}) => {
        throw new Error('login action should be implemented')
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