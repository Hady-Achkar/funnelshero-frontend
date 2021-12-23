import {AddNewPaymentMethod, UserType} from '../services'

export enum UserState {
	TRIAL = 'TRIAL',
	TRIAL_END = 'TRIAL_END',
	BLOCKED = 'BLOCKED',
	SUB_ACTIVE = 'SUB_ACTIVE'
}

export interface IUser {
	token: string
	fullName: string
	email: string
	_id: string
	type: UserType
	stripeId: string
	paymentMethods: AddNewPaymentMethod.PaymentMethod[]
	subscriptions: any
	inTrial: boolean
	isTrialLegit: boolean
	activeSubscription: string
	status: UserState
}
