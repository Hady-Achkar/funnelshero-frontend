import {IUser} from '../IUser'

export interface authState {
	isAuthenticated: boolean
	user: IUser
}

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export interface LoginAction {
	type: typeof LOGIN
	user_info: IUser
}
export interface LogoutAction {
	type: typeof LOGOUT
}

export type AuthActions = LoginAction | LogoutAction
