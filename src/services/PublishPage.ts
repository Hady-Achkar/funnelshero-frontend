import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'
import {IFunnel} from '../types'

export const publishPage = async (
	funnelId: string,
	pageId: string,
): Promise<AxiosResponse<PublishPage.RootObject>> => {
	return ManagerAxios({
		method: 'PUT',
		url: ApiConstants.MANAGER.PUBLISH_PAGE,
		data: {
			pageId,
			funnelId,
		},
	})
}

export declare namespace PublishPage {


	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		funnel: IFunnel
		requestTime: Date
	}
}
