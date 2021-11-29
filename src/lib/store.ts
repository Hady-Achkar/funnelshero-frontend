import {applyMiddleware, compose, createStore} from 'redux'
import thunk, {ThunkMiddleware} from 'redux-thunk'
import {AppActions} from '../models/redux'
import rootReducer, {AppState} from '../reducers'
import {persistStore} from 'redux-persist'

const middlewares = [thunk]
const middlewareEnhancer = applyMiddleware(...middlewares)
const enhancers = [middlewareEnhancer]
const composedEnhancers: any = compose(...enhancers)
export const store = createStore(rootReducer, composedEnhancers)

export const persistor = persistStore(store)
