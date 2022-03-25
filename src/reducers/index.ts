import authReducer from './authReducer'
import funnelsReducer from './funnelReducer'
import {combineReducers} from 'redux'
import bundlesReducer from './bundlesReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	funnels: funnelsReducer,
	bundles: bundlesReducer,
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
