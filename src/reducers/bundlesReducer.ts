import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {IBundle} from '../types'
import {BundleActions} from '../models/redux/bundleTypes'

interface BundlesState {
	bundles: IBundle[]
	loading: boolean
}

const initState: BundlesState = {
	bundles: [],
	loading: true,
}
const bundlesState = (
	state: BundlesState = initState,
	action: BundleActions,
) => {
	switch (action.type) {
		case 'INITIALIZE_BUNDLES':
			return {
				...state,
				bundles: action?.bundles,
				loading: false,
			}
		default:
			return state
	}
}
const persistConfig = {
	keyPrefix: 'Funnelshero-',
	key: 'bundlesReducer',
	storage,
}
export default persistReducer(persistConfig, bundlesState)
