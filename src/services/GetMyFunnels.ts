import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'
import {IFunnel} from '../types'

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
		link: string
	}

	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		funnels: IFunnel[]
		requestTime: Date
	}
}
