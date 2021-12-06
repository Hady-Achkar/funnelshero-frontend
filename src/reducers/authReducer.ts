import {authState, AuthActions} from '../models/redux/authTypes'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {
	AuthAxios,
	FileAxios,
	IconAxios,
	ImagesAxios,
	ManagerAxios,
} from '../lib'
import {UserType} from '../services/Login'

const initState: authState = {
	isAuthenticated: false,
	user: {
		token: '',
		fullName: '',
		email: '',
		_id: '',
		type: UserType.STANDARD,
	},
}
const authReducer = (state: authState = initState, action: AuthActions) => {
	switch (action.type) {
		case 'LOGIN':
			AuthAxios.defaults.headers.common['Authorization'] =
				'Bearer ' + action?.user_info.token
			AuthAxios.defaults.headers.common['Accept'] = 'application/json'

			FileAxios.defaults.headers.common['Authorization'] =
				'Bearer ' + action?.user_info.token
			FileAxios.defaults.headers.common['Accept'] = 'application/json'

			IconAxios.defaults.headers.common['Authorization'] =
				'Bearer ' + action?.user_info.token
			IconAxios.defaults.headers.common['Accept'] = 'application/json'

			ImagesAxios.defaults.headers.common['Authorization'] =
				'Bearer ' + action?.user_info.token
			ImagesAxios.defaults.headers.common['Accept'] = 'application/json'

			ManagerAxios.defaults.headers.common['Authorization'] =
				'Bearer ' + action?.user_info.token
			ManagerAxios.defaults.headers.common['Accept'] = 'application/json'

			return {
				...state,
				isAuthenticated: true,
				user: action.user_info,
			}
		case 'LOGOUT':
			return initState
		default:
			return state
	}
}
const persistConfig = {
	keyPrefix: 'Funnelshero-',
	key: 'AuthReducer',
	storage,
}
export default persistReducer(persistConfig, authReducer)
