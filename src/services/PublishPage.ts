import axios, {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'
import ServerAxios from '../lib/axios/server'
import {IFunnel} from '../types'

export const publishPage = async (
	funnelId: string,
	pageId: string,
	html: string
): Promise<AxiosResponse<PublishPage.RootObject>> => {
	return ServerAxios({
		method: 'PUT',
		url: ApiConstants.SERVER.PUBLISH_PAGE,
		data: {
			pageId,
			funnelId,
			html,
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
