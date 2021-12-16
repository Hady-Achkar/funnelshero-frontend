import {Dispatch} from 'redux'
import {AppActions} from '../models/redux'
import {AppState} from '../reducers'
import Cookies from 'universal-cookie'
import {IUser} from '../models/IUser'
import login from '../services/Login'
import {googleLogin} from '../services'
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
				const {token, fullName, email, _id, type, stripeId} = res?.data
				if (token) {
					cookies.set('token', token, {path: '/'})
					cookies.set('fullName', fullName, {path: '/'})
					cookies.set('email', email, {path: '/'})
					cookies.set('_id', _id, {path: '/'})
					cookies.set('type', type, {path: '/'})
					cookies.set('stripeId', stripeId, {path: '/'})
					dispatch(
						loginAction({
							token,
							fullName,
							email,
							_id,
							type,
							stripeId,
						}),
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

interface GoogleLoginPayload {
	fname: string
	lname: string
	email: string
}

export const startGoogleLogin = (payload: GoogleLoginPayload) => {
	const {fname, lname, email} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		googleLogin(fname, lname, email)
			.then((res) => {
				const {token, fullName, email, _id, type, stripeId} = res?.data
				if (token) {
					cookies.set('token', token, {path: '/'})
					cookies.set('fullName', fullName, {path: '/'})
					cookies.set('email', email, {path: '/'})
					cookies.set('_id', _id, {path: '/'})
					cookies.set('type', type, {path: '/'})
					cookies.set('stripeId', stripeId, {path: '/'})

					dispatch(
						loginAction({
							token,
							fullName,
							email,
							_id,
							type,
							stripeId,
						}),
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
