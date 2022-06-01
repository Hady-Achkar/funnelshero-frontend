import {IUser, UserState} from '../IUser'
import {AddNewPaymentMethod} from '../../services'
import {ADD_PAYMENT_METHOD} from './bundleTypes'

export interface authState {
	isAuthenticated: boolean
	user: IUser
}

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const CHANGE_ACCOUNT_STATUS = 'CHANGE_ACCOUNT_STATUS'

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

export interface ChangeAccountStatusAction {
	type: typeof CHANGE_ACCOUNT_STATUS
	status: UserState
}

export type AuthActions =
	| LoginAction
	| LogoutAction
	| addPaymentMethodType
	| ChangeAccountStatusAction
