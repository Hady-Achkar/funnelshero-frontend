import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ManagerAxios} from '../lib'
import {IFunnel} from '../types'

export interface RootObject {
	status: 'Success' | 'Failure'
	message: string
	funnel: IFunnel
	requestTime: Date
}

const savePage = (
	title: string,
	data: string,
	funnelId: string,
	pageId: string
): Promise<AxiosResponse<RootObject>> => {
	return ManagerAxios({
		method: 'PUT',
		url: ApiConstants.MANAGER.EDIT_PAGE,
		data: {
			title,
			data,
			funnelId,
			pageId,
		},
	})
}

export default savePage
