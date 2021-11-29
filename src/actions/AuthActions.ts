import {Dispatch} from 'redux'
import {AppActions} from '../models/redux'
import {AppState} from '../reducers'
import Cookies from 'universal-cookie'
import {IUser} from '../models/IUser'
import login from '../services/Login'
import {LoginPayload} from '../services'

const cookies = new Cookies()
export const loginAction = (user_info: IUser): AppActions => ({
	type: 'LOGIN',
	user_info,
})
export const logoutAction = (): AppActions => ({
	type: 'LOGOUT',
})
export const startLogin = (payload: LoginPayload) => {
	const {email, password} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		login(email, password)
			.then((res) => {
				const {token, fullName, email, _id, type} = res?.data
				if (token) {
					cookies.set('token', token, {path: '/'})
					cookies.set('fullName', fullName, {path: '/'})
					cookies.set('email', email, {path: '/'})
					cookies.set('_id', _id, {path: '/'})
					cookies.set('type', type, {path: '/'})
					console.log('logged in')

					dispatch(
						loginAction({
							token,
							fullName,
							email,
							_id,
							type,
						})
					)
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			})
	}
}
