import {IUser} from '../IUser'
import {AddNewPaymentMethod} from '../../services'
import {ADD_PAYMENT_METHOD} from './bundleTypes'

export interface authState {
	isAuthenticated: boolean
	user: IUser
}

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export interface addPaymentMethodType {
	type: typeof ADD_PAYMENT_METHOD
	paymentMethod: AddNewPaymentMethod.PaymentMethod
}

export interface LoginAction {
	type: typeof LOGIN
	user_info: IUser
}

export interface LogoutAction {
	type: typeof LOGOUT
}

export type AuthActions = LoginAction | LogoutAction | addPaymentMethodType
