import {UserType} from '../services'

export interface IUser {
	token: string
	fullName: string
	email: string
	_id: string
	type: UserType
	stripeId: string
	paymentMethods: any
	subscriptions: any
	inTrial: boolean
	isTrialLegit: boolean
	activeSubscription: string
}
