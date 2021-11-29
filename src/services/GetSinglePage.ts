import {ManagerAxios} from '../lib'
import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'

export const getSinglePage = async (
	title: string,
	funnelId: string
): Promise<AxiosResponse<GetSinglePage.RootObject>> => {
	return await ManagerAxios({
		method: 'GET',
		url: ApiConstants.MANAGER.GET_SINGLE_PAGE,
		data: {
			title,
			funnelId,
		},
	})
}
export declare module GetSinglePage {
	export interface Page {
		_id: string
		title: string
		data: string
		createdAt: Date
		updatedAt: Date
	}

	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		page: Page
		requestTime: Date
	}
}
