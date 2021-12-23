import {Dispatch} from 'redux'
import {AppActions} from '../models'
import {AppState} from '../reducers'
import Cookies from 'universal-cookie'
import {IUser, UserState} from '../models/IUser'
import login from '../services/Login'
import {AddNewPaymentMethod, addPaymentMethod, googleLogin, LoginPayload, signup, SignupPayload} from '../services'

const cookies = new Cookies()
export const loginAction = (user_info: IUser): AppActions => ({
	type: 'LOGIN',
	user_info,
})
export const logoutAction = (): AppActions => ({
	type: 'LOGOUT',
})
export const addPaymentMethodAction = (paymentMethod: AddNewPaymentMethod.PaymentMethod): AppActions => ({
	type: 'ADD_PAYMENT_METHOD',
	paymentMethod,
})
export const startLogin = (payload: LoginPayload) => {
	const {email, password} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		login(email, password)
			.then((res) => {
				const {
					token,
					fullName,
					email,
					_id,
					type,
					stripeId,
					activeSubscription,
					isTrialLegit,
					subscriptions,
					inTrial,
					paymentMethods,
				} = res?.data
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
							activeSubscription,
							subscriptions,
							inTrial,
							isTrialLegit,
							paymentMethods,
							status: UserState.TRIAL_END,
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
	priceId?: string
}

export const startAddPaymentMethod = (paymentResponse: string) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		addPaymentMethod(paymentResponse)
			.then((res) => {
				const {paymentMethod} = res.data
				dispatch(addPaymentMethodAction(paymentMethod))
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
export const startGoogleLogin = (payload: GoogleLoginPayload) => {
	const {fname, lname, email, priceId} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		googleLogin(fname, lname, email, priceId)
			.then((res) => {
				const {
					token,
					fullName,
					email,
					_id,
					type,
					stripeId,
					inTrial,
					isTrialLegit,
					activeSubscription,
					paymentMethods,
					subscriptions,
				} = res?.data
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
							inTrial,
							isTrialLegit,
							activeSubscription,
							paymentMethods,
							subscriptions,
							status: UserState.TRIAL,
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

export const startSignup = (payload: SignupPayload) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		signup(payload)
			.then((res) => {
				const {
					token,
					fullName,
					email,
					_id,
					type,
					stripeId,
					activeSubscription,
					isTrialLegit,
					subscriptions,
					inTrial,
					paymentMethods,
				} = res?.data
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
							activeSubscription,
							isTrialLegit,
							subscriptions,
							inTrial,
							paymentMethods,
							status: UserState.TRIAL,
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
