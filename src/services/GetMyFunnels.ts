import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'

export const getMyFunnels = (): Promise<
	AxiosResponse<GetMyFunnels.RootObject>
> => {
	return ManagerAxios({
		method: 'GET',
		url: ApiConstants.MANAGER.MY_FUNNELS,
	})
}
export declare namespace GetMyFunnels {
	export interface Page {
		_id: string
		title: string
		data: string
		createdAt: Date
		updatedAt: Date
	}

	export interface Funnel {
		favIcon: string
		pages: Page[]
		_id: string
		mainDomain: string
		category: string
		title: string
		contactEmail: string
		createdAt: Date
		updatedAt: Date
		subDomain: string
	}

	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		funnels: Funnel[]
		requestTime: Date
	}
}
