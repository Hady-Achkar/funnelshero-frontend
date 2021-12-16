import {UserType} from '../services'

export interface IUser {
	token: string
	fullName: string
	email: string
	_id: string
	type: UserType
	stripeId:string
}
