import {combineReducers, configureStore} from '@reduxjs/toolkit'
import studentReducer from './studentReducer'

const rootReducer = combineReducers({
    studentReducer:studentReducer
})

const store = configureStore({
    reducer:rootReducer
})

export default store