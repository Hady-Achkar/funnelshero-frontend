import {ManagerAxios} from '../lib'
import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'

export const getSingleFunnel = async (
	title: string
): Promise<AxiosResponse<GetSingleFunnel.RootObject>> => {
	return await ManagerAxios({
		method: 'GET',
		url: `${ApiConstants.MANAGER.GET_SINGAL_FUNNEL}?title=${title}`,
	})
}
export declare module GetSingleFunnel {
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
		category: string
		title: string
		owner: string
		contactEmail: string
		createdAt: Date
		updatedAt: Date
		baseDomain: string
	}

	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		funnel: Funnel
		requestTime: Date
	}
}
