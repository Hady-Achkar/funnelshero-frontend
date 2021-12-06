import {AuthAxios} from '../lib'
import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'

const login = async (
	email: string,
	password: string
): Promise<AxiosResponse<Login.RootObject>> => {
	return await AuthAxios({
		method: 'POST',
		url: ApiConstants.AUTH.LOGIN,
		data: {
			email,
			password,
		},
	})
}

export default login
export interface LoginPayload {
	readonly email: string
	readonly password: string
}

export declare module Login {
	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		token: string
		fullName: string
		email: string
		_id: string
		type: UserType
		requestTime: Date
	}
}

export enum UserType {
	GOOGLE = 'GOOGLE',
	FACEBOOK = 'FACEBOOK',
	STANDARD = 'STANDARD',
}
