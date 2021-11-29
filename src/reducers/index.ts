import authReducer from './authReducer'
import funnelsReducer from './funnelReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
	auth: authReducer,
	funnels: funnelsReducer,
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
