import {FunnelActions} from '../models/redux/funnelTypes'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {IFunnel} from '../types'

interface FunnelsState {
	funnels: IFunnel[]
	loading: boolean
}
const initState: FunnelsState = {
	funnels: [],
	loading: true,
}
const funnelState = (
	state: FunnelsState = initState,
	action: FunnelActions
) => {
	switch (action.type) {
		case 'INITIALIZE_MY_FUNNELS':
			return {
				...state,
				funnels: action.funnels,
				loading: false,
			}
		case 'ADD_FUNNEL':
			return {
				...state,
				funnels: [...state.funnels, action.payload],
				loading: false,
			}
		case 'LOAD':
			return {
				...state,
				loading: true,
			}
		case 'UNLOAD':
			return {
				...state,
				loading: false,
			}
		default:
			return state
	}
}
const persistConfig = {
	keyPrefix: 'Funnelshero-',
	key: 'funnelReducer',
	storage,
}
export default persistReducer(persistConfig, funnelState)
